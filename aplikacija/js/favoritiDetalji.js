document.addEventListener("DOMContentLoaded", async ()=>{
    let poster = document.getElementById("poster");
    let nazivSerije= document.getElementById("nazivSerije");
    let opisSerije = document.getElementById("opisSerije");
    let brojSezona = document.getElementById("brojSezona");
    let brojEpizoda = document.getElementById("brojEpizoda");
    let popularnost = document.getElementById("popularnost");
    let vanjskaStranica = document.getElementById("vanjskaStranica");

    let idSerije = document.getElementById("idSerije").value;
    let odgovor = await fetch("/baza/favoriti/" + idSerije);
    let serija = await odgovor.json();

    poster.setAttribute("src", serija.putanjaSlike);
    vanjskaStranica.setAttribute("href", serija.vanjskaStranica);
    nazivSerije.innerText = serija.naziv;
    opisSerije.innerText = serija.opis;
    brojSezona.innerText = serija.seasons.length;
    let count = 0;
    for (const s of serija.seasons) {
        count += s.episode_count;
    }
    brojEpizoda.innerText = count;
    popularnost.innerText = serija.popularnost;

});
async function dajSezone() {

	let odgovor = await fetch(
		"/baza/favoriti/" + idSerije
	);

	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);

		prikaziSezone(podaci);
	} else if (odgovor.status == 401) {
		document.getElementById("sadrzaj").innerHTML = "";
		poruka.innerHTML = "Neautorizirani pristup! Prijavite se!";
	} else {
		poruka.innerHTML = "Greška u dohvatu sezona!";
	}
}

function prikaziSezone(sezone) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table>";
	tablica +=
		"<tr><th scope='col'>Naziv</th><th>Opis</th><th>Broj sezone</th><th>Broj Epizoda</th><th>Poster</th><th>TmdbId</th></tr>";
	for (let s of sezone) {
		tablica += "<tr>";
		tablica += "<td>" + s.naziv + "</td>";
		tablica += "<td>" + s.opis + "</td>";
        tablica += "<td>" + s.brojSezone + "</td>";
        tablica += "<td>" + s.brojEpizoda + "</td>";
        tablica += "<td>" + s.putanjaPostera + "</td>";
        tablica += "<td>" + s.tmdbId + "</td>";
		tablica += "</tr>";
	}
	tablica += "</table>";

	glavna.innerHTML = tablica;
}