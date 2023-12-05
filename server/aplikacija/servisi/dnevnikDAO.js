const Baza = require("./baza.js");

class DnevnikDAO {

	constructor() {
		this.baza = new Baza("./dokumentacija/RWA2023mmarkovin21.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Dnevnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}
    // funkcija za soanje i straničenje
	dajSortirano = async function (srt) {
		/* this.baza.spojiSeNaBazu();
		//let sql = "SELECT * FROM Korisnici WHERE korIme=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else
			return null; */
	}
}

module.exports = DnevnikDAO;