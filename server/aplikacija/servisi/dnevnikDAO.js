const Baza = require("./baza.js");

class DnevnikDAO {

	constructor() {
		this.baza = new Baza("./RWA2023mmarkovin21.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Dnevnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}
	dajSortirano = async function (srt) {
		
	}
}

module.exports = DnevnikDAO;