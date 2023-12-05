document.addEventListener("DOMContentLoaded", async () => {
    let poster = document.getElementById("poster");
    let nazivSerije= document.getElementById("nazivSerije");
    let opsiSerije = document.getElementById("opsiSerije");
    let brojSezona = document.getElementById("brojSezona");
    let brojEpizoda = document.getElementById("brojEpizoda");
    let popularnost = document.getElementById("popularnost");
    let vanjskaStranica = document.getElementById("vanjskaStranica");
    let dodajGumb = document.getElementById("dodaj");

    let idSerije = document.getElementById("idSerije").value;

    let odgovor = await fetch("/api/tmdb/serije/" + idSerije);

    let serija = await odgovor.json();

    poster.setAttribute("src", "https://image.tmdb.org/t/p/original/" + serija.poster_path);
    vanjskaStranica.setAttribute("href", serija.homepage);
    nazivSerije.innerText = serija.name;
    opsiSerije.innerText = serija.overview;
    brojSezona.innerText = serija.seasons.length;
    let count = 0;
    for (const s of serija.seasons) {
        count += s.episode_count;
    }
    brojEpizoda.innerText = count;
    popularnost.innerText = serija.popularity;
});