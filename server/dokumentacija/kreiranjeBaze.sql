-- Creator:       MySQL Workbench 8.0.32/ExportSQLite Plugin 0.1.0
-- Author:        Unknown
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2023-11-18 19:50
-- Created:       2023-10-21 13:53

BEGIN;
CREATE TABLE "Uloge"(
  "idUloge" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "nazivUloge" VARCHAR(50) NOT NULL
);
CREATE TABLE "Serije"(
  "idSerije" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "naziv" VARCHAR(45),
  "opis" TEXT,
  "brojSezona" INTEGER,
  "brojEpizoda" INTEGER,
  "popularnost" VARCHAR(45),
  "putanjaSlike" VARCHAR(100),
  "vanjskaStranica" VARCHAR(100),
  "tmdbId" VARCHAR(100) UNIQUE
);
CREATE TABLE "Sezone"(
  "idSezone" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "naziv" VARCHAR(50),
  "opis" VARCHAR(50),
  "putanjaPostera" VARCHAR(100),
  "brojSezone" INTEGER,
  "brojEpizoda" INTEGER,
  "tmdbId" VARCHAR(50) NOT NULL,
  "Serije_idSerije" INTEGER NOT NULL,
  CONSTRAINT "fk_Sezone_Serije1"
    FOREIGN KEY("Serije_idSerije")
    REFERENCES "Serije"("idSerije")
);
CREATE INDEX "Sezone.fk_Sezone_Serije1_idx" ON "Sezone" ("Serije_idSerije");
CREATE TABLE "Korisnici"(
  "idKorisnika" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "ime" VARCHAR(50),
  "prezime" VARCHAR(100),
  "adresa" VARCHAR(45),
  "zvanje" VARCHAR(45),
  "spol" VARCHAR(45),
  "email" VARCHAR(50) NOT NULL,
  "korIme" VARCHAR(100) NOT NULL,
  "lozinka" VARCHAR(50) NOT NULL,
  "uloge_korisnika_id" INTEGER NOT NULL,
  CONSTRAINT "korIme_UNIQUE"
    UNIQUE("korIme"),
  CONSTRAINT "fk_korisnici_uloge_korisnika"
    FOREIGN KEY("uloge_korisnika_id")
    REFERENCES "Uloge"("idUloge")
);
CREATE INDEX "Korisnici.fk_korisnici_uloge_korisnika_idx" ON "Korisnici" ("uloge_korisnika_id");
CREATE TABLE "Dnevnik"(
  "idDnevnika" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "datum" VARCHAR(45),
  "vrijeme" VARCHAR(45),
  "metoda" VARCHAR(45),
  "akcija" VARCHAR(45),
  "trazeniResurs" VARCHAR(45),
  "tijelo" VARCHAR(45),
  "Korisnici_idKorisnika" INTEGER NOT NULL,
  CONSTRAINT "fk_Dnevnik_Korisnici1"
    FOREIGN KEY("Korisnici_idKorisnika")
    REFERENCES "Korisnici"("idKorisnika")
);
CREATE INDEX "Dnevnik.fk_Dnevnik_Korisnici1_idx" ON "Dnevnik" ("Korisnici_idKorisnika");
CREATE TABLE "Favoriti"(
  "Korisnici_idKorisnika" INTEGER NOT NULL,
  "Serije_idSerije" INTEGER NOT NULL,
  PRIMARY KEY("Korisnici_idKorisnika","Serije_idSerije"),
  CONSTRAINT "fk_Korisnici_has_Serije_Korisnici1"
    FOREIGN KEY("Korisnici_idKorisnika")
    REFERENCES "Korisnici"("idKorisnika") ON DELETE CASCADE,
  CONSTRAINT "fk_Korisnici_has_Serije_Serije1"
    FOREIGN KEY("Serije_idSerije")
    REFERENCES "Serije"("idSerije")
);
CREATE INDEX "Favoriti.fk_Korisnici_has_Serije_Serije1_idx" ON "Favoriti" ("Serije_idSerije");
CREATE INDEX "Favoriti.fk_Korisnici_has_Serije_Korisnici1_idx" ON "Favoriti" ("Korisnici_idKorisnika");
COMMIT;


INSERT INTO Uloge(nazivUloge)  VALUES("administrator");
INSERT INTO Uloge(nazivUloge)  VALUES("registrirani korisnik");

INSERT INTO Korisnici(korime,lozinka,email,uloge_korisnika_id) VALUES("obican","rwa","mmarkovin21@foi.hr",2);
INSERT INTO Korisnici(korime,lozinka,email,uloge_korisnika_id) VALUES("admin","rwa","matnovak@foi.hr",1);

INSERT INTO Serije(naziv,opis, vanjskaStranica,tmdbId) VALUES("neka serija","nešto", "https://nekaStranica.com","5");
INSERT INTO Serije(naziv,opis, vanjskaStranica,tmdbId) VALUES("serija2","još nešto", "https://blaba.com","4");
INSERT INTO Serije(naziv,opis, vanjskaStranica,tmdbId) VALUES("serija3"," ", "https://aaaa.com","3");

INSERT INTO Sezone(naziv,opis,brojSezone, brojEpizoda, tmdbId, Serije_idSerije) VALUES ("neka sezona","neki opis", 1,20, "187236", 1);

INSERT INTO Favoriti(Korisnici_idKorisnika,Serije_idSerije)VALUES(5,1);
INSERT INTO Favoriti(Korisnici_idKorisnika,Serije_idSerije) VALUES(5,2);
INSERT INTO Favoriti(Korisnici_idKorisnika,Serije_idSerije) VALUES(6,3);
INSERT INTO Favoriti(Korisnici_idKorisnika,Serije_idSerije) VALUES(6,2);

SELECT * FROM Uloge;
SELECT * FROM Korisnici;
SELECT * FROM Serije;
SELECT * FROM Favoriti;
SELECT * FROM Sezone;

UPDATE Korisnici SET uloge_korisnika_id = 1 WHERE korIme="admin";

DELETE From Serije;
DROP TABLE Serije;
DELETE From Korisnici WHERE korIme="placic";
DELETE From Favoriti;

SELECT * FROM Serije WHERE idSerije IN (SELECT Serije_idSerije FROM Favoriti WHERE Serije_idSerije=2);
DELETE FROM Serije WHERE idSerije=4;

SELECT name FROM sqlite_master WHERE type='table';

