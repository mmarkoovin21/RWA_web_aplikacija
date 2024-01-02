const SezoneDAO = require("./sezoneDAO");

exports.getSezone = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let sdao = new SezoneDAO();
	let favoritId = zahtjev.params.id;
	sdao.dajSve(favoritId).then((sezona) => {
		console.log(sezona);
		odgovor.send(JSON.stringify(sezona));
	});
};
// exports.postSezone = function (zahtjev, odgovor) {
// 	odgovor.type("application/json");
// 	let sdao = new SezoneDAO();
// 	let favoritId = zahtjev.params.id;
// 	sdao.dajSve(favoritId).then((sezona) => {
// 		console.log(sezona);
// 		odgovor.send(JSON.stringify(sezona));
// 	});
// };