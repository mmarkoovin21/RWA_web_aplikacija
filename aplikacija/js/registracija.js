document.addEventListener("DOMContentLoaded", async () => {
    let forma = document.getElementById("formaRegistracija");
    let imeUnos = document.getElementById("ime");
    let prezimeUnos = document.getElementById("prezime");
    let adresaUnos = document.getElementById("adresa");
    let muskoUnos = document.getElementById("musko");
    let zenskoUnos = document.getElementById("zensko");
    let spolUnos = "";
    let zvanjeUnos = document.getElementById("zvanje");
    let lozinkaUnos = document.getElementById("lozinka");
    let emailUnos = document.getElementById("email");
    let korimeUnos = document.getElementById("korime");

    forma.addEventListener("submit", async (dogadjaj)=> {
        dogadjaj.preventDefault();
        if(muskoUnos.checked){
            spolUnos = "Muško";
        }else if(zenskoUnos.checked){
            spolUnos = "Žensko";
        }
        let tijelo = {
            ime: imeUnos.value,
            prezime: prezimeUnos.value,
            adresa: adresaUnos.value,
            spol: spolUnos,
            zvanje: zvanjeUnos.value,
            lozinka: lozinkaUnos.value,
            email: emailUnos.value,
            korime: korimeUnos.value,
        }
        let odgovor = await fetch("/getJWT");
        if(odgovor.status == 200 ){
            let token = (await odgovor.json()).ok;

            let zaglavlje = new Headers();
            zaglavlje.set("Content-Type", "application/json");
            zaglavlje.set("Authorization", token);

            let odgovorRegistriraj = await fetch("/baza/korisnici/", {
                method: "POST",
                headers: zaglavlje,
                body: JSON.stringify(tijelo)
            });
            if(odgovorRegistriraj.status == 201){
                location.href = "/";
            }
        }
    })
});
