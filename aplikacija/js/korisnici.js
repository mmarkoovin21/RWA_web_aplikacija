let poruka = document.getElementById("poruka");

document.addEventListener("DOMContentLoaded", async () => {
    dajKorisnike();
});

async function dajKorisnike() {

	let odgovor = await fetch(
		"/baza/korisnici"
	);

	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);

		prikaziKorisnike(podaci);
	} else if (odgovor.status == 401) {
		document.getElementById("sadrzaj").innerHTML = "";
		poruka.innerHTML = "Neautorizirani pristup! Prijavite se!";
	} else {
		poruka.innerHTML = "Greška u dohvatu korisnika!";
	}
}

function prikaziKorisnike(korisnici) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table>";
	tablica +=
		"<tr><th>Id</th><th>Ime</th><th>Prezime</th><th>Adresa</th><th>Zvanje</th><th>Spol</th><th>E-mail</th><th>Korisničko ime</th><th>Lozinka</th><th>Uloga <br> 1=admin <br> 2=korisnik</th></tr>";
	for (let k of korisnici) {
		tablica += "<tr>";
		tablica += "<td>" + k.idKorisnika + "</td>";
		tablica += "<td>" + k.ime + "</td>";
		tablica += "<td>" + k.prezime + "</td>";
		tablica += "<td>" + k.adresa + "</td>";
		tablica += "<td>" + k.zvanje + "</td>";
		tablica += "<td>" + k.spol + "</td>";
		tablica += "<td>" + k.email + "</td>";
		tablica += "<td>" + k.korIme + "</td>";
		tablica += "<td>" + k.lozinka + "</td>";
		tablica += "<td>" + k.uloge_korisnika_id + "</td>";
		tablica +=
			'<td><button type="button" class="brisiKorisnika" id="brisiKorisnika^' + k.korIme + '">Briši korisnika</button></td>';
		tablica += "</tr>";
	}
	tablica += "</table>";

	glavna.innerHTML = tablica;

	let brisi = document.getElementsByClassName("brisiKorisnika");

	for (let gumb of brisi) {
		gumb.addEventListener("click", async (dogadjaj)=>{
			let korime = dogadjaj.target.id.split("^")[1];

			let odgovor = await fetch("/getJWT");
			if(odgovor.status == 200){
				let token = (await odgovor.json()).ok;

				let zaglavlje = new Headers();
				zaglavlje.set("Authorization", token);

				let odgovorObrisi = await fetch("/baza/korisnici/" + korime, {
					method: "DELETE",
					headers: zaglavlje,
				});
				if (odgovorObrisi.status == 201) {
					let redakZaBrisanje = dogadjaj.target.closest("tr");
					if (redakZaBrisanje) {
						redakZaBrisanje.remove();
					}
				}
			}
		});
	}

}
async function brisiKorisnika(dogadjaj){
	console.log(dogadjaj.target);
}

function dekodirajBase64(data){
	return atob(data, 'base64');
}

function dajTijelo(token){
	let dijelovi = token.split(".");
	return JSON.parse(dekodirajBase64(dijelovi[1]));
}