const mail = require("./moduli/mail.js");
const kodovi = require("./moduli/kodovi.js");
const Konfiguracija = require("../konfiguracija.js");
const portRest = require("/var/www/RWA/2023/portovi.js").mmarkovin21;

class Autentifikacija {
	constructor(){
		this.tajniKljucCaptcha = "";

        let konf = new Konfiguracija();
        konf.ucitajKonfiguraciju().then(() => {
            this.tajniKljucCaptcha = konf.dajKonf()["tajniKljucCaptcha"];
        });
	}
	async dodajKorisnika(korisnik) {
		let tijelo = {
			ime: korisnik.ime,
			prezime: korisnik.prezime,
			adresa: korisnik.adresa,
			spol: korisnik.spol,
			zvanje: korisnik.zvanje,
			lozinka: kodovi.kreirajSHA256(korisnik.lozinka, korisnik.korime),
			email: korisnik.email,
			korime: korisnik.korime,
		};

		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};

		let odgovor = await fetch(
			"http://localhost:" + portRest + "/baza/korisnici",
			parametri
		);

		if (odgovor.status == 200) {
			console.log("Korisnik ubačen na servisu");
			let mailPoruka = "Registrirani ste! Korisničko ime: " + korisnik.korime + ", Lozinka: " + korisnik.lozinka;
			return true;
		} else {
			console.log(odgovor.status);
			console.log(await odgovor.text());
			return false;
		}
	}

	async aktivirajKorisnickiRacun(korime, kod) {
		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");
		let parametri = {
			method: "PUT",
			body: JSON.stringify({ aktivacijskiKod: kod }),
			headers: zaglavlje,
		};

		return await fetch(
			"http://localhost:" +
				portRest +
				"/baza/korisnici/" +
				korime +
				"/aktivacija",
			parametri
		);
	}

	async prijaviKorisnika(korime, lozinka) {
		console.log("PRIJAVA: " + korime + lozinka);
		lozinka = kodovi.kreirajSHA256(lozinka, korime);
		let tijelo = {
			lozinka: lozinka,
		};
		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};
		let odgovor = await fetch(
			"http://localhost:" + portRest + "/baza/korisnici/" + korime + "/prijava",
			parametri
		);

		if (odgovor.status == 200) {
			return await odgovor.text();
		} else {
			return false;
		}
	}
	async provjeriRecaptchu(token){
		let parametri = {method: 'POST'}
		let o = await fetch("https://www.google.com/recaptcha/api/siteverify?secret="
		  + this.tajniKljucCaptcha+"&response="+token,parametri);
		let recaptchaStatus = JSON.parse(await o.text());
		console.log(recaptchaStatus);
		if(recaptchaStatus.success && recaptchaStatus.score > 0.5)
		  return true;
		return false;
	  }
}

module.exports = Autentifikacija;
