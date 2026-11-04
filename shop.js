// StepDraw CAD – Shop-Einstellungen der Website (die einzige Datei, die zum Verkaufsstart angepasst wird)
// Kauflinks aus Lemon Squeezy (Produkt → Variante → "Share" → Checkout-Link) hier eintragen.
const SHOP = {
  launch: "2026-11-30",              // Verkaufsstart (JJJJ-MM-TT); ab diesem Tag: Banner weg, Preise sichtbar, Kaufknöpfe aktiv
  buy: {
    // Hauptprogramm StepDraw CAD: ein Link, dort wählt der Kunde Monatsabo, Jahresabo oder Kauf
    monthly:   "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/3663125f-5626-4e9b-aad5-604528ef9158",
    yearly:    "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/3663125f-5626-4e9b-aad5-604528ef9158",
    perpetual: "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/3663125f-5626-4e9b-aad5-604528ef9158",
    // Zusatzmodule: Checkout-Link je Produkt (dort wählt der Kunde Kauf, Monats- oder Jahresabo);
    // ein Link je Variante geht auch
    pp_kauf:  "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/d48ed219-fc1a-4698-adcc-9b92cc1e3047",   // Prüfplan & Erstbemusterung
    pp_monat: "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/d48ed219-fc1a-4698-adcc-9b92cc1e3047",
    pp_jahr:  "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/d48ed219-fc1a-4698-adcc-9b92cc1e3047",
    kk_kauf:  "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/46dd053b-dc4c-4b54-902d-307f1744c9fb",   // Angebotskalkulation – Kauf
    kk_monat: "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/46dd053b-dc4c-4b54-902d-307f1744c9fb",   // Angebotskalkulation – Monatsabo
    kk_jahr:  "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/46dd053b-dc4c-4b54-902d-307f1744c9fb",   // Angebotskalkulation – Jahresabo
    paket_kauf:  "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/aa21e828-4994-4190-9c19-81cf0967fdaa",   // Duo-Paket Prüfplan + Kalkulation
    paket_monat: "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/aa21e828-4994-4190-9c19-81cf0967fdaa",
    paket_jahr:  "https://stepdraw-cad.lemonsqueezy.com/checkout/buy/aa21e828-4994-4190-9c19-81cf0967fdaa",
  },
  download: "https://github.com/stepdraw-cad/stepdraw-cad.github.io/releases/latest/download/StepDraw-Setup.exe",
  store: "",                         // Link zum Microsoft-Store-Eintrag
};

(function () {
  const en = document.documentElement.lang === "en";
  const live = new Date() >= new Date(SHOP.launch + "T00:00:00");
  if (live) {
    document.documentElement.classList.add("live");   // Preise einblenden
    const b = document.querySelector(".banner");
    if (b) b.remove();
  }
  document.querySelectorAll("[data-buy]").forEach(a => {
    const url = SHOP.buy[a.dataset.buy];
    if (live && url) {
      a.href = url;
      a.classList.remove("disabled");
      a.classList.add("btn-primary");
      a.removeAttribute("aria-disabled");
      a.textContent = en ? "Buy now" : "Jetzt kaufen";
    }
  });
  document.querySelectorAll("[data-buy-small]").forEach(a => {
    const url = SHOP.buy[a.dataset.buySmall];
    if (live && url) {
      a.href = url;
      a.classList.remove("disabled");
      a.removeAttribute("aria-disabled");
    }
  });
  const dl = document.getElementById("download-link");
  if (dl && SHOP.download) dl.href = SHOP.download;
  const st = document.getElementById("store-link");
  if (st && SHOP.store) st.href = SHOP.store;
  else if (st && st.parentElement) st.parentElement.style.display = "none";   // noch kein Store-Eintrag
})();
