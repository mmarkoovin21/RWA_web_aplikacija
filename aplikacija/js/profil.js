document.addEventListener("DOMContentLoaded", async () => {
    let ime = document.getElementById("ime");
    let prezime= document.getElementById("prezime");
    let adresa = document.getElementById("adresa");
    let email = document.getElementById("email");
    let spol = document.getElementById("spol");

    let imeUnos = document.getElementById("imeUnos");
    let prezimeUnos = document.getElementById("prezimeUnos");
    let adresaUnos = document.getElementById("adresaUnos");
    let muskoUnos = document.getElementById("muskoUnos");
    let zenskoUnos = document.getElementById("zenskoUnos");
    let spolUnos = "";
    let zvanjeUnos = document.getElementById("zvanjeUnos");
    let lozinkaUnos = document.getElementById("lozinkaUnos");

    let forma = document.getElementById("formaProfil");

    let odgovor = await fetch("/getJWT");
    if(odgovor.status == 200 ){
        let token = (await odgovor.json()).ok;

        let korime = dajTijelo(token).korime;

        odgovor = await fetch("/baza/korisnici/" + korime);
        let korisnik = await odgovor.json();

        ime.innerText = korisnik.ime;
        prezime.innerText = korisnik.prezime;
        adresa.innerText = korisnik.adresa;
        email.innerText = korisnik.email;
        spol.innerText = korisnik.spol;

        imeUnos.value = korisnik.ime;
        prezimeUnos.value = korisnik.prezime;
        adresaUnos.value = korisnik.adresa;
        if(korisnik.spol === "Muško"){
            muskoUnos.checked = true;
            spolUnos = "Muško";
        }else{
            zenskoUnos.checked = true;
            spolUnos = "Žensko";
        }
        zvanjeUnos.value = korisnik.zvanje;
    }
    forma.addEventListener("submit", async (dogadjaj)=>{
        dogadjaj.preventDefault();

        let tijelo = {
            ime: imeUnos.value,
            prezime: prezimeUnos.value,
            adresa: adresaUnos.value,
            spol: spolUnos,
            zvanje: zvanjeUnos.value,
            lozinka: lozinkaUnos.value
        }
        let odgovor = await fetch("/getJWT");
        if(odgovor.status == 200 ){
            let token = (await odgovor.json()).ok;
            let korime = dajTijelo(token).korime;

            let zaglavlje = new Headers();
            zaglavlje.set("Content-Type", "application/json");
            zaglavlje.set("Authorization", token);

            let odgovorAzuriraj = await fetch("/baza/korisnici/" + korime, {
                method: "PUT",
                headers: zaglavlje,
                body: JSON.stringify(tijelo)
            });
            console.log(await odgovorAzuriraj.text());
        }
    });
});

function dekodirajBase64(data){
	return atob(data, 'base64');
}

function dajTijelo(token){
	let dijelovi = token.split(".");
	return JSON.parse(dekodirajBase64(dijelovi[1]));
}