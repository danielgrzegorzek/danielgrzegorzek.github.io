// Weiche für Recruiter: Die zum gewählten Schwerpunkt passenden Highlights und Screenshots rücken nach vorn.
// Auch per Link wählbar, z. B. https://danielgrzegorzek.github.io/?fokus=sap (Werte: sap, ki, daten).
// Ohne JavaScript bleibt die Seite vollständig – nur die Weiche ist dann ausgeblendet.

const LABELS = { sap: "SAP-Beratung", ki: "AI Automation", daten: "Data Analytics" };
const DEFAULT_HINT = "Wählen Sie einen Schwerpunkt – die passenden Highlights rücken nach vorn.";

const buttons = document.querySelectorAll("[data-focus-button]");
const lists = document.querySelectorAll("[data-sortable]");
const hint = document.querySelector("[data-focus-hint]");

// Ursprüngliche Reihenfolge merken, damit „kein Schwerpunkt“ sie wiederherstellt
lists.forEach((list) => [...list.children].forEach((item, index) => { item.dataset.order = index; }));

function matches(item, focus) {
  return (item.dataset.focus || "").split(" ").includes(focus);
}

function applyFocus(focus) {
  buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.focusButton === focus)));
  lists.forEach((list) => {
    const items = [...list.children].sort((a, b) =>
      (focus ? matches(b, focus) - matches(a, focus) : 0) || a.dataset.order - b.dataset.order);
    items.forEach((item) => {
      item.classList.toggle("is-match", Boolean(focus) && matches(item, focus));
      list.append(item);
    });
  });
  hint.textContent = focus ? `Passend für ${LABELS[focus]}: die markierten Highlights stehen vorn.` : DEFAULT_HINT;
  const url = new URL(window.location.href);
  if (focus) url.searchParams.set("fokus", focus); else url.searchParams.delete("fokus");
  window.history.replaceState(null, "", url);
}

buttons.forEach((button) => button.addEventListener("click", () => {
  const active = button.getAttribute("aria-pressed") === "true";
  applyFocus(active ? null : button.dataset.focusButton);   // zweiter Klick hebt die Auswahl auf
}));

const initial = new URLSearchParams(window.location.search).get("fokus");
if (initial && Object.hasOwn(LABELS, initial)) applyFocus(initial);
