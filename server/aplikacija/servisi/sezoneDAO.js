const Baza = require("./baza.js");

class SezoneDAO {

	constructor() {
		this.baza = new Baza("./RWA2023mmarkovin21.sqlite");
	}

	dajSve = async function (idSerije) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Sezone WHERE Serije_idSerije IN (SELECT ? FROM Serije)"
		var podaci = await this.baza.izvrsiUpit(sql, [idSerije]);
		this.baza.zatvoriVezu();
		return podaci;
	}
	//implementiraj poslje
	// dodaj = async function (idKorisnika,idSerije) {
	// 	console.log(korisnik)
	// 	let sql = `INSERT INTO Sezone () VALUES (?,?,?,?,?,?,?)`;
	// 	await this.baza.izvrsiUpit(sql,[]);
	// 	return true;
	// }
}

module.exports = SezoneDAO;