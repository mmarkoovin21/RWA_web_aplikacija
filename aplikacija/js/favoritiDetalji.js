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
    brojSezona.innerText = serija.brojSezona;
    brojEpizoda.innerText = serija.brojEpizoda;
    popularnost.innerText = serija.popularnost;
})