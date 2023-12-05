document.addEventListener("DOMContentLoaded", async () => {
    let forma = document.getElementById("formaPrijava");
    let lozinkaUnos = document.getElementById("lozinka");
    let korimeUnos = document.getElementById("korime");

    forma.addEventListener("submit", async (dogadjaj)=> {
        dogadjaj.preventDefault();
        let tijelo = {
            lozinka: lozinkaUnos.value
        }

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let odgovorPrijavi = await fetch("/baza/korisnici/" + korimeUnos.value + "/prijava", {
            method: "POST",
            headers: zaglavlje,
            body: JSON.stringify(tijelo)
        });
        if(odgovorPrijavi.status == 201){
            location.href = "/";
        }
    })
});
