const ds = require("fs/promises");
const jwt = require("./moduli/jwt.js");
const Autentifikacija = require("./autentifikacija.js");

class HtmlUpravitelj {
	constructor(tajniKljucJWT) {
		this.tajniKljucJWT = tajniKljucJWT;
		this.auth = new Autentifikacija();
	}

	pocetna = async function (zahtjev, odgovor) {
		console.log(zahtjev.session);
		let pocetna = await ucitajStranicu("pocetna");
		odgovor.send(pocetna);
	};

	registracija = async function (zahtjev, odgovor) {
		let stranica = await ucitajStranicu("registracija");
		odgovor.send(stranica);
	};

	odjava = async function (zahtjev, odgovor) {
		zahtjev.session.korisnik = null;
		zahtjev.session.korime = null;
		odgovor.redirect("/");
	};

	prijava = async function (zahtjev, odgovor) {
		let stranica = await ucitajStranicu("prijava");
		odgovor.send(stranica);
	};
	profil = async function (zahtjev, odgovor) {
		let stranica = await ucitajStranicu("profil");
		odgovor.send(stranica);
	};
	korisnici = async function (zahtjev, odgovor) {
		let stranica = await ucitajStranicu("korisnici");
		odgovor.send(stranica);
	};
	favoriti = async function (zahtjev, odgovor) {
		let stranica = await ucitajStranicu("favoriti");
		odgovor.send(stranica);
	};
	favoritiDetalji = async function (zahtjev, odgovor) {
		let stranica = await ucitajStranicu("favoritiDetalji");
		odgovor.send(stranica);
	};
	serijaDetalji = async function (zahtjev, odgovor) {
		let id = zahtjev.params.id;
		let stranica = await ucitajStranicu("serijaDetalji");
		stranica = stranica.replace("#idSerije#", id);
		odgovor.send(stranica);
	};
	dnevnik = async function (zahtjev, odgovor) {
		let stranica = await ucitajStranicu("dnevnik");
		odgovor.send(stranica);
	};
	dokumentacija = async function (zahtjev, odgovor) {
		let stranica = await ucitajDokumentaciju("dokumentacija");
		odgovor.send(stranica);
	};
}

module.exports = HtmlUpravitelj;

async function ucitajStranicu(nazivStranice, poruka = "") {
	let stranice = [ucitajHTML(nazivStranice), ucitajHTML("navigacija"),ucitajHTML("podnozje")];
	let [stranica, nav, footer] = await Promise.all(stranice);
	stranica = stranica.replace("#navigacija#", nav);
	stranica = stranica.replace("#poruka#", poruka);
	stranica = stranica.replace("#podnozje#", footer);
	return stranica;
}

function ucitajHTML(htmlStranica) {
	return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}
async function ucitajDokumentaciju(htmlDokumentacije) {
	let stranice = [ds.readFile(__dirname + "/../dokumentacija/dokumentacija.html", "UTF-8")
	, ucitajHTML("navigacija")];
	let [stranica, nav, footer] = await Promise.all(stranice);
	stranica = stranica.replace("#navigacija#", nav);
	return stranica;
}
