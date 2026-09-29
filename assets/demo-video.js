// Demo-Video in der Projektkarte: startet erst, wenn es zur Hälfte sichtbar ist, und pausiert außerhalb des Bildes.
// Vorher lädt der Browser nichts (preload="none") – die Seite bleibt schnell, zu sehen ist nur das Vorschaubild.
// Wer „weniger Bewegung“ eingestellt hat oder selbst auf Pause tippt, startet es selbst.
const video = document.querySelector("video[data-autoplay]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
