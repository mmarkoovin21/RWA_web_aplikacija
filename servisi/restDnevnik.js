const DnevnikDAO = require("./dnevnikDAO")

exports.getDnevnik = function (zahtje ,odgovor){
    odgovor.type("application/json");
	let ddao = new DnevnikDAO();
	ddao.dajSve().then((dnevnik) => {
		console.log(dnevnik);
		odgovor.send(JSON.stringify(dnevnik));
	});
};

exports.postDnevnik = function(zahtjev, odgovor){
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};
exports.putDnevnik = function(zahtjev, odgovor){
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};
exports.deleteDnevnik = function(zahtjev, odgovor){
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};