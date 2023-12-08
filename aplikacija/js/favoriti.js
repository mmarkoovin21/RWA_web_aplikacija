document.addEventListener("DOMContentLoaded", async ()=>{
    dajFavorite(1);

});

async function dajFavorite(str) {
	let parametri = {};
	parametri = await dodajToken(parametri);

	let odgovor = await fetch(
		"/baza/favoriti"
	);

	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);

		prikaziFavorite(podaci);
		//prikaziStranicenje(podaci.page, podaci.total_pages, "dajSerije");
	}else {
		poruka.innerHTML = "Greška u dohvatu favorita!";
	}
}

function prikaziFavorite(favoriti) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table>";
	tablica +=
		"<tr><th scope='col'>Naslov</th><th>Opis</th></tr>";
	for (let f of favoriti) {
		tablica += "<tr>";
		tablica += "<td>" + f.naziv + "</td>";
		tablica += "<td>" + f.opis + "</td>";
		tablica +=
			"<td><a href='/favoritiDetalji/" + f.idSerije + "'>Detalji favorita</a></td>";
		tablica += "</tr>";
	}
	tablica += "</table>";

	glavna.innerHTML = tablica;
}