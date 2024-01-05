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
	dajPremaTmdbId = async function (tmdbId) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Serije WHERE tmdbId=?"
		var podaci = await this.baza.izvrsiUpit(sql, [tmdbId]);
		if(podaci.length == 1)
			return podaci[0];
		else
			return null;
	}

	dodajFavorit = async function (idKorisnika,idSerije) {
		let sql = `INSERT INTO Favoriti(Korisnici_idKorisnika, Serije_idSerije) VALUES (?, ?)`;
		try {
			await this.baza.izvrsiUpit(sql,[idKorisnika, idSerije]);
			return true;
		} catch (error) {
			if(error.message.includes("UNIQUE constraint failed")){
				console.log("Favorit već postoji!");
			}
			return false;
		}
	}
	dodajSeriju = async function (serija) {
		let podaci = [serija.naziv, serija.opis, serija.brojSezona, serija.brojEpizoda, serija.popularnost, serija.putanjaSlike, serija.vanjskaStranica, serija.tmdbId];
		let sql = `INSERT INTO Serije (naziv, opis, brojSezona, brojEpizoda, popularnost, putanjaSlike, vanjskaStranica, tmdbId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
		try {
			await this.baza.izvrsiUpit(sql,podaci);
			return true;
		} catch (error) {
			if(error.message.includes("UNIQUE constraint failed")){
				console.log("Serija već postoji!");
			}
			return false;
		}
	}

	obrisi = async function (idSerije) {
		let sql = "DELETE FROM Favoriti WHERE Serije_idSerije=?";
		await this.baza.izvrsiUpit(sql,[idSerije]);
		return true;
	}
}

module.exports = FavoritiDAO;