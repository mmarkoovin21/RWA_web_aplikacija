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

	obrisi = async function (idSerije) {
		let sql = "DELETE FROM Favoriti WHERE Serije_idSerije=?";
		await this.baza.izvrsiUpit(sql,[idSerije]);
		return true;
	}

	azuriraj = async function (idSerije, korisnik) {
		// ovo je zabranjeno, treba vratiti statusni kod 405
	}
}

module.exports = FavoritiDAO;