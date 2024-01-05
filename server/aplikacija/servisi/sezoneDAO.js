const Baza = require("./baza.js");

class SezoneDAO {

	constructor() {
		this.baza = new Baza("./RWA2023mmarkovin21.sqlite");
	}

	dajSveSezone = async function (idFavorita) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM Sezone WHERE Serije_idSerije=?"
		var podaci = await this.baza.izvrsiUpit(sql, [idFavorita]);
		this.baza.zatvoriVezu();
		return podaci;
	}

	dodaj = async function (sezone, idSerije) {
		for (let s of sezone){
			let podaci = [s.name, s.overview, s.poster_path, s.season_number, s.episode_count, s.id, idSerije]
			let sql = `INSERT INTO Sezone (naziv, opis, putanjaPostera, brojSezone, brojEpizoda, tmdbId, Serije_idSerije) VALUES (?,?,?,?,?,?,?)`;
			await this.baza.izvrsiUpit(sql, podaci);
		}
		return true;
	}
}

module.exports = SezoneDAO;