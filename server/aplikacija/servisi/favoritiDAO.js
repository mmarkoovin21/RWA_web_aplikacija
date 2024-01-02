const Baza = require("./baza.js");

class FavoritiDAO {

	constructor() {
		this.baza = new Baza("./RWA2023mmarkovin21.sqlite");
	}

	dajSve = async function (idKorisnika) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Serije WHERE idSerije IN (SELECT Serije_idSerije FROM Favoriti WHERE Korisnici_idKorisnika = ?)"
		var podaci = await this.baza.izvrsiUpit(sql, [idKorisnika]);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (idSerije) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Serije WHERE idSerije IN (SELECT Serije_idSerije FROM Favoriti WHERE Serije_idSerije=?);"
		var podaci = await this.baza.izvrsiUpit(sql, [idSerije]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else
			return null;
	}

	dodajFavorit = async function (idKorisnika,idSerije) {
		let sql = `INSERT INTO Favoriti VALUES (${idKorisnika}, ${idSerije})`;
		await this.baza.izvrsiUpit(sql,[]);
		return true;
	}
	dodajSeriju = async function (serija) {
		let podaci = [serija.naziv, serija.opis, serija.brojSezona, serija.popularnost, serija.putanjaSlike, serija.vanjskaStranica, serija.tmdbId];
		let sql = `INSERT INTO Serija (naziv, opis, brojSezona, brojEpizoda, popularnost, putanjaSlike, vanjskaStranica, tmdbId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
		await this.baza.izvrsiUpit(sql,[podaci]);
		return true;
	}

	obrisi = async function (idSerije) {
		let sql = "DELETE FROM Favoriti WHERE Serije_idSerije=?";
		await this.baza.izvrsiUpit(sql,[idSerije]);
		return true;
	}
}

module.exports = FavoritiDAO;