# danielgrzegorzek.github.io

Persönliche Portfolio-Seite von Daniel Grzegorzek – live unter **https://danielgrzegorzek.github.io**.

Statisches HTML und CSS, dazu ein kleines Skript für das Demo-Video: ohne Build-Schritt, ohne Cookies, ohne
Tracking, ohne externe Dienste oder Schriften. Hell und dunkel folgen der Einstellung des Geräts.

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Kopf, Skills, Projekte (Bräu am Stein hervorgehoben), Arbeitsweise, Über mich, Kontakt |
| `datenschutz.html` | Datenschutzhinweis (Hosting bei GitHub Pages) |
| `impressum.html` | Entwurf, noch nicht verlinkt |
| `assets/style.css` | Gestaltung |
| `assets/demo.mp4`, `assets/demo-poster.jpg` | Demo-Video der Arbeitsprobe (45 s, aufgenommen mit `tools/record_demo.py` im App-Repo) und sein Vorschaubild – auch die Making-of-Seite der App bindet genau diese Dateien ein |
| `assets/demo-video.js` | Startet das Demo-Video erst, wenn es sichtbar ist (vorher lädt es nicht), pausiert außerhalb des Bildes, respektiert „weniger Bewegung“ |

**Fotos und Lebenslauf austauschen:** Dateien mit gleichem Namen ersetzen – `assets/portrait.jpg` (quadratisch),
`assets/abschluss.jpg` (Querformat 4:3) und `assets/lebenslauf.pdf`.

Lokal ansehen: `index.html` im Browser öffnen oder `python -m http.server` im Ordner starten.

Arbeitsprobe: [Bräu am Stein](https://braeu-am-stein-ki.streamlit.app) ·
[Code](https://github.com/danielgrzegorzek/brauerei-ki-auftragserfassung)
