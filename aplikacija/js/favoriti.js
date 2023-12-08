let poruka = document.getElementById("poruka");

document.addEventListener("DOMContentLoaded", async ()=>{
    dajFavorite();

});

async function dajFavorite() { // bila je odana stranica kao argument

	let odgovor = await fetch(
		"/baza/favoriti"
	);

	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci)
		console.log(podaci);

		prikaziFavorite(podaci);
		//prikaziStranicenje(podaci.page, podaci.total_pages, "dajSerije");
	}else if (odgovor.status == 401) {
		document.getElementById("sadrzaj").innerHTML = "";
		poruka.innerHTML = "Neautorizirani pristup! Prijavite se!";
	} else {
		poruka.innerHTML = "Greška u dohvatu korisnika!";
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