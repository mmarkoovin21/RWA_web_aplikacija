let poruka = document.getElementById("poruka");

document.addEventListener("DOMContentLoaded", async () => {
    let pretrazivanjeUnos = document.getElementById("pretrazivanje");
	console.log(pretrazivanjeUnos);

    pretrazivanjeUnos.addEventListener("keyup", async () => {
		if (pretrazivanjeUnos.value.length >= 3) {
			dajSerije(1);
			console.log(pretrazivanjeUnos.value);
		}
    });

	poruka = document.getElementById("poruka");
});

async function dajSerije(str) {
	let parametri = {};
	parametri = await dodajToken(parametri);

	let odgovor = await fetch(
		"/api/tmdb/serije?stranica=" + str + "&trazi=" + dajFilter(),
		parametri
	);

	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);

		prikaziSerije(podaci.results);
		prikaziStranicenje(podaci.page, podaci.total_pages, "dajSerije");
	} else if (odgovor.status == 401) {
		document.getElementById("sadrzaj").innerHTML = "";
		poruka.innerHTML = "Neautorizirani pristup! Prijavite se!";
	} else {
		poruka.innerHTML = "Greška u dohvatu serija!";
	}
}

function prikaziSerije(serije) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table>";
	tablica +=
		"<tr><th scope='col'>Naslov</th><th>Opis</th></tr>";
	for (let s of serije) {
		tablica += "<tr>";
		tablica += "<td>" + s.name + "</td>";
		tablica += "<td>" + s.overview + "</td>";
		tablica +=
			"<td><a href='/serijaDetalji/" + s.id + "'>Detalji serije</a></td>";
		tablica += "</tr>";
	}
	tablica += "</table>";

	glavna.innerHTML = tablica;
}

function dajFilter() {
	return document.getElementById("pretrazivanje").value;
}
