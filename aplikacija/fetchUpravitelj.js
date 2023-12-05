const SerijePretrazivanje = require("./serijePretrazivanje.js");
const jwt = require("./moduli/jwt.js");
const Autentifikacija = require("./autentifikacija.js");

class FetchUpravitelj {
	constructor(tajniKljucJWT) {
		this.auth = new Autentifikacija();
		this.fp = new SerijePretrazivanje();
		this.tajniKljucJWT = tajniKljucJWT;
	}

	getJWT = async function (zahtjev, odgovor) {
		odgovor.type("json");
		if (zahtjev.session.korime != null) {
			let k = { korime: zahtjev.session.korime };
			let noviToken = jwt.kreirajToken(k, this.tajniKljucJWT);
			odgovor.send({ ok: noviToken });
			return;
		}
		odgovor.status(401);
		odgovor.send({ greska: "nemam token!" });
	};
}
module.exports = FetchUpravitelj;
