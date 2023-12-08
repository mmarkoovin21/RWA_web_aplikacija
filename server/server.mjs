import express from 'express';
import Konfiguracija from "./konfiguracija.js";
import HtmlUpravitelj from '../aplikacija/htmlUpravitelj.js';
import FetchUpravitelj from '../aplikacija/fetchUpravitelj.js';
import portovi from "/var/www/RWA/2023/portovi.js";
import restKorisnik from "./aplikacija/servisi/restKorisnik.js";
import restDnevnik from "./aplikacija/servisi/restDnevnik.js";
import restFavoriti from "./aplikacija/servisi/restFavoriti.js";
import RestTMDB from "./aplikacija/servisi/restTMDB.js";
const port = portovi.mmarkovin21;
import kolacici from 'cookie-parser';
import sesija from 'express-session';

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
	server.use("/js", express.static("aplikacija/js"));
	server.use("/css", express.static("aplikacija/css/mmarkovin21.css"));
	server.use("/slike", express.static("dokumenti/slike"));
	server.use("/dokumentacijaDir", express.static("dokumentacija"));

	pripremiPutanjePocetna();
	pripremiPutanjeAutentifikacija();
	pripremiPutanjePretrazivanjeSerija();
	pripremiPutanjuDokumentacija();
	pripremiPutanjeTMDB();

	// server.all("*", (zahtjev, odgovor, nastavi) => {
	// 	if(zahtjev.session.korime == null){
	// 		odgovor.redirect("/prijava");
	// 	}else{
	// 		nastavi();
	// 	}
	// });

	pripremiPutanjeRegistracija();
	pripremiPutanjeStranica();

	pripremiPutanjeKorisnik();
	pripremiPutanjeFavoriti();
	pripremiPutanjeDnevnik();

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

function pripremiPutanjePocetna() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/", htmlUpravitelj.pocetna.bind(htmlUpravitelj));
}

function pripremiPutanjePretrazivanjeSerija() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/serijaDetalji/:id",htmlUpravitelj.serijaDetalji.bind(htmlUpravitelj));
}
function pripremiPutanjeRegistracija(){
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/registracija", htmlUpravitelj.registracija.bind(htmlUpravitelj));
}

function pripremiPutanjeAutentifikacija() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);

	server.get("/odjava", htmlUpravitelj.odjava.bind(htmlUpravitelj));
	server.get("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
	server.get("/getJWT", fetchUpravitelj.getJWT.bind(fetchUpravitelj));

	server.get(
		"/baza/korisnici/:korime/prijava",
		restKorisnik.getKorisnikPrijava
	);
	server.post(
		"/baza/korisnici/:korime/prijava",
		restKorisnik.postKorisnikPrijava
	);
}

function pripremiPutanjeStranica(){
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);

	server.get("/profil",htmlUpravitelj.profil.bind(htmlUpravitelj));
	server.get("/favoriti",htmlUpravitelj.favoriti.bind(htmlUpravitelj));
	server.get("/korisnici",htmlUpravitelj.korisnici.bind(htmlUpravitelj));
	server.get("/dnevnik",htmlUpravitelj.dnevnik.bind(htmlUpravitelj));
	server.get("/favoritiDetalji",htmlUpravitelj.favoritiDetalji.bind(htmlUpravitelj));
}
function pripremiPutanjuDokumentacija(){
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/dokumentacija",htmlUpravitelj.dokumentacija.bind(htmlUpravitelj));
}