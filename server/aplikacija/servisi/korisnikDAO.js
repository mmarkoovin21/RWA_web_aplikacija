const Baza = require("./baza.js");

class KorisnikDAO {

	constructor() {
		this.baza = new Baza("./RWA2023mmarkovin21.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Korisnici;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Korisnici WHERE korIme=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else
			return null;
	}

	dodaj = async function (korisnik) {
		let sql = `INSERT INTO Korisnici (ime,prezime,adresa,spol,zvanje,lozinka,email,korIme,uloge_korisnika_id) VALUES (?,?,?,?,?,?,?,?,?)`;
        let podaci = [korisnik.ime,korisnik.prezime,korisnik.adresa,korisnik.spol,korisnik.zvanje,
                      korisnik.lozinka,korisnik.email,korisnik.korime,2];
		try {
			await this.baza.izvrsiUpit(sql,podaci);
			return true;
		} catch (greska) {
			console.log(greska);
			return false;
		}
	}

	obrisi = async function (korime) {
		let sql = "DELETE FROM Korisnici WHERE korIme=?";
		try {
			await this.baza.izvrsiUpit(sql,[korime]);
			return true;
		} catch (greska) {
			console.log(greska);
			return false;
		}
	}

	azuriraj = async function (korime, korisnik) {
		console.log(korisnik);
		let sql = `UPDATE Korisnici SET ime=?, prezime=?, adresa=?, spol=?, zvanje=?, lozinka=? WHERE korIme=?`;
        let podaci = [korisnik.ime, korisnik.prezime, korisnik.adresa, korisnik.spol, korisnik.zvanje,
                      korisnik.lozinka,korime];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
}

module.exports = KorisnikDAO;
