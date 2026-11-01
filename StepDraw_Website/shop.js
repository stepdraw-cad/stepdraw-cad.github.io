// StepDraw CAD – Shop-Einstellungen der Website (die einzige Datei, die zum Verkaufsstart angepasst wird)
// Kauflinks aus Lemon Squeezy (Produkt → Variante → "Share" → Checkout-Link) hier eintragen.
const SHOP = {
  launch: "2026-11-30",              // Verkaufsstart (JJJJ-MM-TT); ab diesem Tag: Banner weg, Preise sichtbar, Kaufknöpfe aktiv
  buy: {
    monthly:   "",                   // z. B. "https://stepdraw.lemonsqueezy.com/buy/…"
    yearly:    "",
    perpetual: "",
  },
  download: "",                      // Link zum Setup (StepDraw_Setup.exe)
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
  const dl = document.getElementById("download-link");
  if (dl && SHOP.download) dl.href = SHOP.download;
  const st = document.getElementById("store-link");
  if (st && SHOP.store) st.href = SHOP.store;
})();
