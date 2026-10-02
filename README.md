# danielgrzegorzek.github.io

Persönliche Portfolio-Seite von Daniel Grzegorzek – live unter **https://danielgrzegorzek.github.io**.

Statisches HTML und CSS, dazu ein kleines Skript: ohne Build-Schritt, ohne Cookies, ohne Tracking, ohne externe
Dienste oder Schriften. Hell und dunkel folgen der Einstellung des Geräts.

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Kopf, Skills, Projekte (Bräu am Stein hervorgehoben), Arbeitsweise, Über mich, Kontakt |
| `datenschutz.html` | Datenschutzhinweis (Hosting bei GitHub Pages) |
| `impressum.html` | Entwurf, noch nicht verlinkt |
| `assets/style.css` | Gestaltung – Farben, Schriften und Maße als Variablen ganz oben |
| `assets/site.js` | Blendet Abschnitte beim Scrollen einmal ein; startet das Demo-Video erst, wenn es sichtbar ist (vorher lädt es nicht), und pausiert es außerhalb des Bildes. Respektiert „weniger Bewegung“ |
| `assets/fonts/` | Newsreader (Überschriften) und Schibsted Grotesk (Text) als WOFF2, mit Lizenztexten (SIL OFL 1.1) |
| `assets/demo.mp4`, `assets/demo-poster.jpg` | Demo-Video der Arbeitsprobe (45 s, aufgenommen mit `tools/record_demo.py` im App-Repo) und sein Vorschaubild – auch die Making-of-Seite der App bindet genau diese Dateien ein |
| `assets/favicon.svg`, `assets/og-image.png` | Monogramm „DG“ (Schrift als Pfade, hell und dunkel) und Vorschaubild für geteilte Links (Kopfbereich, 1200 × 630) |

**Fotos und Lebenslauf austauschen:** Dateien mit gleichem Namen ersetzen – `assets/portrait.jpg` (quadratisch,
wird im Hochformat 4 : 5 gezeigt), `assets/abschluss.jpg` (Querformat 4 : 3) und `assets/lebenslauf.pdf`.

Lokal ansehen: `index.html` im Browser öffnen oder `python -m http.server` im Ordner starten.

## Gestaltung

Editorial wie ein hochwertiges Magazin. Akzentfarbe und Überschriftenschrift teilt die Seite mit der App
„Bräu am Stein“ – so gehören beide erkennbar zusammen.

| Entscheidung | Begründung | Alternative |
|---|---|---|
| **Typografie als Hauptmittel:** Newsreader für Überschriften, Schibsted Grotesk für Text | Newsreader (Production Type) ist eine Serifenschrift für Zeitungen und Magazine mit eigenem Schnitt für große Größen – charakterstark, aber ruhig. Schibsted Grotesk stammt aus einem Medienhaus und ist für Bildschirme gemacht: gut lesbar, klare Ziffern. | Inter oder Systemschrift: lesbar, aber ohne eigenen Charakter. |
| **Genau eine Akzentfarbe: Kupfer** (`#a34a1f`, dunkel `#cf7743`), sonst Papier und Tinte | Warm und unverwechselbar, passt zur Brauerei der Arbeitsprobe. Kupfer nur für Kleinigkeiten: Abschnittsnummern, Linien, Fokus, Rahmen – der Hauptknopf ist dunkel und wird erst beim Darüberfahren kupfern. Dunkelmodus mit eigenen Werten, nicht invertiert. | Petrol-Blau: robust, aber weniger eigen. |
| **Raster mit zwölf Spalten, bewusst asymmetrisch:** links Nummer und Rubrik (01 Skills …), rechts Überschrift und Inhalt; feine Haarlinien | Ruhige Ordnung wie im Magazin, der Blick findet sofort den Einstieg. Die Nummern zählt das CSS selbst (`counter`), im HTML steht nur die Rubrik. | Karten mit Schatten (bis 10/2026): wirken wie eine Vorlage. |
| **Name passt sich Breite und Höhe an:** `clamp(3.4rem, min(10.4vw, 17vh), 10.5rem)`, auch die Abstände im Kopf hängen an der Fensterhöhe | Auf Laptops mit 1366 × 768 und 1280 × 720 sind Name, Satz und Knöpfe ohne Scrollen sichtbar – auch mit Browserleisten. Das Porträt ist so hoch wie Überzeile und Name, seine Unterkante sitzt auf der Grundlinie des Nachnamens. | Größe nur nach Breite: Auf flachen Bildschirmen rutschen die Knöpfe aus dem Bild. |
| **„Passer“:** versetzter Kupferrahmen hinter Porträt und Demo-Video | Wie im Druck, wenn eine Farbe leicht neben der anderen liegt – ein eigenes, ruhiges Erkennungszeichen. Beim Darüberfahren über das Projekt rückt der Rahmen näher heran. | Rundes Porträt: Standard. |
| **Bewegung dezent:** Kopf steigt beim Laden leicht auf, Abschnitte blenden beim Scrollen einmal ein, Linien wachsen beim Darüberfahren | Wirkt hochwertig, ohne abzulenken. Bei „weniger Bewegung“ ist alles aus. Das Einblenden schaltet erst das Skript ein – lädt es nicht, bleibt alles sichtbar. | Bibliothek für Animationen: zu groß für den Zweck. |
| **Barrierefreiheit** | Texte mindestens 4,5 : 1 (Nebentext 5,2 : 1, Kupfer 5,3 : 1, dunkel 5,7 : 1), sichtbarer Fokusrahmen, Sprunglink zum Inhalt, Texte bleiben Text. | – |
| **Leistung:** Schriften selbst gehostet, nur lateinische Zeichen und die nötigen Stärken (zusammen 94 KB), per `preload` sofort geladen; das Video lädt erst beim Hinscrollen | Kein Abruf bei Google oder anderen Diensten, schnelle erste Anzeige. | Google Fonts: externer Abruf, Datenschutzfrage. |

### Schriften neu erzeugen

Quelle: [github.com/google/fonts](https://github.com/google/fonts) (`ofl/newsreader`, `ofl/schibstedgrotesk`).
Mit [fontTools](https://github.com/fonttools/fonttools) (`pip install fonttools brotli`) den großen Schnitt von
Newsreader festlegen, die Stärken eingrenzen und nur die benötigten Zeichen behalten:

```bash
python -m fontTools.varLib.instancer "Newsreader[opsz,wght].ttf" opsz=72 wght=300:600 -o newsreader.ttf
python -m fontTools.varLib.instancer "SchibstedGrotesk[wght].ttf" wght=400:700 -o schibsted.ttf
python -m fontTools.subset newsreader.ttf --output-file=newsreader-display.woff2 --flavor=woff2 --no-hinting --desubroutinize --unicodes="U+0020-007E,U+00A0-00FF,U+0152-0153,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2197,U+2212" --layout-features="kern,liga,calt,locl,case,tnum,pnum,zero,ccmp,mark,mkmk"
```

(für `schibsted.ttf` → `schibsted-grotesk.woff2` dieselben Optionen).

Arbeitsprobe: [Bräu am Stein](https://braeu-am-stein-ki.streamlit.app) ·
[Code](https://github.com/danielgrzegorzek/brauerei-ki-auftragserfassung)
