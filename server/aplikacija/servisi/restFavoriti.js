const FavoritiDAO = require("./favoritiDAO");

exports.getFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let fdao = new FavoritiDAO();
	let idKorisnika = zahtjev.session.idKorisnika;
	fdao.dajSve(idKorisnika).then((favoriti) => {
		console.log(favoriti);
		odgovor.send(JSON.stringify(favoriti));
	});
};

exports.postFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	let idKorisnik = zahtjev.session.idKorisnika;
	console.log("POST podaci:");
	console.log(podaci);
	let fdao = new FavoritiDAO();
	fdao.dodajSeriju(podaci).then((poruka) => {
		fdao.dajPremaTmdbId(podaci.tmdbId).then((serija)=>{
			fdao.dodajFavorit(idKorisnik, serija.idSerije).then((poruka) => {
				odgovor.status(201);
				odgovor.send(JSON.stringify({ opis: "izvrseno" }));
			});
		});
	});
};
exports.putFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};
//----------------------------------------------------------------------
exports.getFavorit = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new FavoritiDAO();
	let favoritId = zahtjev.params.id;
	kdao.daj(favoritId).then((favorit) => {
		console.log(favorit);
		odgovor.send(JSON.stringify(favorit));
	});
};

exports.postFavorit = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { opis: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putFavorit = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { opis: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteFavorit = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(201);
	let favoritId = zahtjev.params.id;
	let fdao = new FavoritiDAO();
	fdao.obrisi(favoritId).then((poruka) => {
		let opis = { opis: "izvrseno" };
		odgovor.send(JSON.stringify(opis));
	});
};