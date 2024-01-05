import express from 'express';
import path from 'path';
import Konfiguracija from "./konfiguracija.js";
import FetchUpravitelj from './aplikacija/fetchUpravitelj.js';
import portovi from "/var/www/RWA/2023/portovi.js";
import restKorisnik from "./aplikacija/servisi/restKorisnik.js";
import restDnevnik from "./aplikacija/servisi/restDnevnik.js";
import restFavoriti from "./aplikacija/servisi/restFavoriti.js";
import restSezone from "./aplikacija/servisi/restSezone.js"
import RestTMDB from "./aplikacija/servisi/restTMDB.js";
const port = portovi.mmarkovin21;
import kolacici from 'cookie-parser';
import sesija from 'express-session';
import cors from 'cors';

const server = express();

let konf = new Konfiguracija();
konf
	.ucitajKonfiguraciju()
	.then(pokreniServer)
	.catch((greska) => {
		console.log(greska);
		if (process.argv.length == 2) {
			console.error("Molimo unesite naziv datoteke!");
		} else {
			console.error("Nije moguće otvoriti datoteku: " + greska.path);
		}
	});

function pokreniServer(){
    server.use(express.urlencoded({ extended: true }));
	server.use(express.json());
	server.use(kolacici());
	server.use(
		sesija({
			secret: konf.dajKonf().tajniKljucSesija,
			saveUninitialized: true,
			cookie: { maxAge: 1000 * 60 * 60 * 3 },
			resave: false,
		})
	);
	server.use(cors({
		origin: ["http://localhost:4200"]
	}));
	server.use("/js", express.static("../aplikacija/js"));
	server.use(express.static("angular/"));
	
	pripremiPutanjeAutentifikacija();
	
	// server.all("*", (zahtjev, odgovor, nastavi) => {
	// 	if(zahtjev.session.korime == null){
		// 		odgovor.redirect("/prijava");
	// 	}else{
	// 		nastavi();
	// 	}
	// });

	pripremiPutanjeTMDB();
	pripremiPutanjeFavoriti();
	pripremiPutanjeKorisnik();
	pripremiPutanjeSezone();
	server.get("*", (zahtjev, odgovor)=>{
		odgovor.sendFile(path.resolve() + "/angular/");
	});

    server.use((zahtjev, odgovor) => {
		odgovor.status(404);
		odgovor.json({ opis: "nema resursa" });
	});
    server.listen(port, () => {
        console.log(`Server pokrenut na: http://localhost:${port}`);
    });
}

function pripremiPutanjeKorisnik() {

	server.delete("/baza/korisnici/:korime/prijava", restKorisnik.deleteKorisnikPrijava);
	server.put("/baza/korisnici/:korime/prijava", restKorisnik.putKorisnikPrijava);

	server.get("/baza/korisnici/:korime", restKorisnik.getKorisnik);
	server.post("/baza/korisnici/:korime", restKorisnik.postKorisnik);
	server.delete("/baza/korisnici/:korime", restKorisnik.deleteKorisnik);
	server.put("/baza/korisnici/:korime", restKorisnik.putKorisnik);

	server.get("/baza/korisnici", restKorisnik.getKorisnici);
	server.post("/baza/korisnici", restKorisnik.postKorisnici);
	server.delete("/baza/korisnici", restKorisnik.deleteKorisnici);
	server.put("/baza/korisnici", restKorisnik.putKorisnici);

}
function pripremiPutanjeFavoriti(){
	server.get("/baza/favoriti/:id", restFavoriti.getFavorit);
	server.post("/baza/favoriti/:id", restFavoriti.postFavorit);
	server.delete("/baza/favoriti/:id", restFavoriti.deleteFavorit);
	server.put("/baza/favoriti/:id", restFavoriti.putFavorit);

	server.get("/baza/favoriti", restFavoriti.getFavoriti);
	server.post("/baza/favoriti", restFavoriti.postFavoriti);
	server.delete("/baza/favoriti", restFavoriti.deleteFavoriti);
	server.put("/baza/favoriti", restFavoriti.putFavoriti);

}
function pripremiPutanjeSezone(){
	server.get("/baza/sezone/:id", restFavoriti.getFavoritSezone);
}
function pripremiPutanjeDnevnik(){

	server.post("/baza/dnevnik", restDnevnik.postDnevnik);
	server.delete("/baza/dnevnik", restDnevnik.deleteDnevnik);
	server.put("/baza/dnevnik", restDnevnik.putDnevnik);

}
function pripremiPutanjeTMDB() {
	let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
	server.get("/api/tmdb/serije/:id", restTMDB.getSerija.bind(restTMDB));
	server.get("/api/tmdb/serije", restTMDB.getSerije.bind(restTMDB));
}

function pripremiPutanjeAutentifikacija() {
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/odjava",(zahtjev, odgovor)=>{
		zahtjev.session.korisnik = null;
		zahtjev.session.korime = null;
		zahtjev.session.idKorisnika = null;
		odgovor.status(201);
		odgovor.send(JSON.stringify({ opis: "izvrseno" }));
	});
	server.get("/getJWT", fetchUpravitelj.getJWT.bind(fetchUpravitelj));

	server.get(
		"/baza/korisnici/:korime/prijava",
		restKorisnik.getKorisnikPrijava
	);
	server.post(
		"/baza/korisnici/:korime/prijava",
		restKorisnik.postKorisnikPrijava
	);
	server.post("/recaptcha", restKorisnik.provjeriReCaptchu);
}