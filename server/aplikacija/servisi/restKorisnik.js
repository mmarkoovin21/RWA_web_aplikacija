const KorisnikDAO = require("./korisnikDAO.js");
const Konfiguracija = require("../../konfiguracija.js");
const kodovi = require("../moduli/kodovi.js");
const jwt = require("../moduli/jwt.js");

exports.getKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	kdao.dajSve().then((korisnici) => {
		odgovor.send(JSON.stringify(korisnici));
	});
};

exports.postKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	podaci.lozinka = kodovi.kreirajSHA256(podaci.lozinka, podaci.korime);
	console.log("POST podaci:");
	odgovor.status(201);
	console.log(podaci);
	let kdao = new KorisnikDAO();
	kdao.dodaj(podaci).then((poruka) => {
		odgovor.send(JSON.stringify(poruka));
	});
};

exports.deleteKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};
//------------------------------------------------------------------------
exports.getKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.daj(korime).then((korisnik) => {
		console.log(korisnik);
		odgovor.send(JSON.stringify(korisnik));
	});
};

exports.postKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { opis: "zabranjeno!" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let korime = zahtjev.params.korime;
	let kdao = new KorisnikDAO();
	kdao.obrisi(korime).then((poruka) => {
		if(poruka){
			odgovor.status(201);
			let opis = {"opis":"izvrseno"};
			odgovor.send(JSON.stringify(opis));
		}else{
			odgovor.status(400);
			let opis = {"opis":"korisnik nije obrisan"};
			odgovor.send(JSON.stringify(opis));
		}
	});

};

exports.putKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let korime = zahtjev.params.korime;
	let podaci = zahtjev.body;
	if(podaci.lozinka != undefined)
		podaci.lozinka = kodovi.kreirajSHA256(podaci.lozinka, korime);
	odgovor.status(201);
	let kdao = new KorisnikDAO();
	kdao.azuriraj(korime, podaci).then((poruka) => {
		let opis = {"opis":"izvrseno"};
		odgovor.send(JSON.stringify(opis));
	});
};
//-----------------------------------------------------------------------------
exports.getKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;

	let konf = new Konfiguracija();
	konf.ucitajKonfiguraciju()
	.then(() => {
		kdao.daj(korime).then((korisnik) => {
			if (zahtjev.session.korime != null) {
				odgovor.set("Authorization", jwt.kreirajToken(korisnik, konf.dajKonf().jwtTajniKljuc));
				odgovor.send(JSON.stringify({ opis: "izvrseno" }));
			}else{
				odgovor.status(401);
				odgovor.send(JSON.stringify({ opis: "Niste prijavljeni!" }));
			}
		});
	})
	.catch((greska) => {
		console.log(greska);
		odgovor.status(401);
		odgovor.send(JSON.stringify({ opis: greska }));
	});
};
exports.postKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	let lozinka = kodovi.kreirajSHA256(zahtjev.body.lozinka, korime);

	kdao.daj(korime).then((korisnik) => {
		if (korisnik) {
			if (korisnik.lozinka == lozinka){
				zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
				console.log(korisnik);
				zahtjev.session.korime = korisnik.korIme;
				zahtjev.session.idKorisnika = korisnik.idKorisnika;

				odgovor.status(201);
				odgovor.send(JSON.stringify({ opis: "izvrseno" }));
			}
			else {
				odgovor.status(401);
				odgovor.send(JSON.stringify({ opis: "Krivi podaci!" }));
			}
		} else {
			odgovor.status(401);
			odgovor.send(JSON.stringify({ opis: "Krivi podaci!" }));
		}
	});
};
exports.deleteKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};
