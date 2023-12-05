const portRest = require("/var/www/RWA/2023/portovi.js").mmarkvin21;
const url = "http://localhost:" + portRest + "/api";
const kodovi = require("./moduli/kodovi.js");
class SerijePretrazivanje {
	async dohvatiFilmove(stranica, kljucnaRijec = "") {
		let putanja =
			url + "/tmdb/filmovi?stranica=" + stranica + "&trazi=" + kljucnaRijec;
		console.log(putanja);
		let odgovor = await fetch(putanja);
		let podaci = await odgovor.text();
		let filmovi = JSON.parse(podaci);
		console.log(filmovi);
		return filmovi;
	}

}

module.exports = SerijePretrazivanje;
