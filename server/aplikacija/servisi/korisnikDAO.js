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

		if (korisnik.ime == null && korisnik.prezime == null && korisnik.lozinka == null && korisnik.korime == null)
			return false;
		let podaci = [];
		let sql = `UPDATE Korisnici SET `;
		if (korisnik.ime != null){
			sql += `ime=?`
			podaci.push(korisnik.ime);
		}

		if (korisnik.prezime != null) {
			if (korisnik.ime != null)
				sql += `, `;
			sql += `prezime=?`
			podaci.push(korisnik.prezime);
		}

		if (korisnik.adresa != null) {
			if (korisnik.ime != null || korisnik.prezime != null)
				sql += `, `
			sql += `adresa=? `
			podaci.push(korisnik.adresa);
		}
		if (korisnik.spol != null) {
			if (korisnik.ime != null || korisnik.prezime != null || korisnik.adresa != null)
				sql += `, `
			sql += `spol=? `
			podaci.push(korisnik.spol);
		}
		if (korisnik.zvanje != null) {
			if (korisnik.ime != null || korisnik.prezime != null || korisnik.adresa != null || korisnik.spol != null)
				sql += `, `
			sql += `zvanje=? `
			podaci.push(korisnik.zvanje);
		}

		if (korisnik.lozinka != null) {
			if (korisnik.ime != null || korisnik.prezime != null || korisnik.adresa != null || korisnik.spol != null || korisnik.zvanje != null)
				sql += `, `
			sql += `lozinka=? `
			podaci.push(korisnik.lozinka);
		}
		sql += ` WHERE korIme=?;`
		podaci.push(korime);

		this.baza.izvrsiUpit(sql, podaci);		return true;
	}
}

module.exports = KorisnikDAO;
