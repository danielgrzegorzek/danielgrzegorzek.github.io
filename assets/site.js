// Kleines Skript der Portfolio-Seite – ohne Bibliotheken, ohne Tracking. Zwei Aufgaben:
// 1. Abschnitte blenden beim Scrollen einmal sanft ein (das Aussehen steht in style.css).
// 2. Das Demo-Video startet erst, wenn es zur Hälfte sichtbar ist, und pausiert außerhalb des Bildes.
// Bei der Einstellung „weniger Bewegung“ ist alles sofort sichtbar, und das Video startet nur per Klick.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- 1. Abschnitte einblenden ----------
// Erst dieses Skript schaltet das Einblenden ein (Klasse „reveal“): Lädt es nicht, bleibt alles sichtbar.
const sections = document.querySelectorAll(".section");
if (!reducedMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("reveal");
  const revealer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target);   // nur einmal – beim Zurückscrollen bleibt alles stehen
      }
    }
  }, { rootMargin: "0px 0px -12% 0px" });
  sections.forEach((section) => revealer.observe(section));
}

// ---------- 2. Demo-Video ----------
// Vorher lädt der Browser nichts (preload="none") – die Seite bleibt schnell, zu sehen ist nur das Vorschaubild.
const video = document.querySelector("video[data-autoplay]");

if (video && !reducedMotion && "IntersectionObserver" in window) {
  let visible = false;
  let pausedByUser = false;
  video.addEventListener("pause", () => { if (visible) pausedByUser = true; });
  video.addEventListener("play", () => { pausedByUser = false; });

  new IntersectionObserver((entries) => {
    for (const entry of entries) {
      visible = entry.isIntersecting;
      if (visible && !pausedByUser) {
        video.play().catch(() => {});  // lässt der Browser es nicht zu, bleibt das Vorschaubild mit Steuerleiste
      } else if (!visible && !video.paused) {
        video.pause();
      }
    }
  }, { threshold: 0.5 }).observe(video);
}
