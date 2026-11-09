// StepDraw CAD – Shop-Einstellungen der Website (Kauflinks, Rabattcode, Download)
// Kauflinks aus Lemon Squeezy (Produkt → Variante → "Share" → Checkout-Link) hier eintragen.
const SHOP = {
  // Offene Beta: Preise sichtbar, Vorabkauf aktiv. Die Kaufknöpfe werden erst klickbar,
  // wenn der Kunde die Beta-Hinweise per Häkchen bestätigt hat (#beta-ok).
  sale: true,                        // false = Preise ausblenden, keine Kaufknöpfe
  checkout: false,                   // false = Preise sichtbar, aber noch kein Kauf ("In Kürze erhältlich");
                                     // true erst nach Steuernummer + Lemon Squeezy im Live-Modus (Live-Links eintragen!)
  founderCode: "GRUENDER25",         // Rabattcode aus Lemon Squeezy (Gründerpreis −25 %); "" = keiner
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
  const live = SHOP.sale;
  if (live) document.documentElement.classList.add("live");   // Preise einblenden
  const checkout = live && SHOP.checkout;
  document.documentElement.classList.add(checkout ? "checkout" : "precheckout");
  const withCode = url => {
    if (!url || !SHOP.founderCode) return url;
    return url + (url.includes("?") ? "&" : "?") + "checkout[discount_code]=" + encodeURIComponent(SHOP.founderCode);
  };
  const ok = document.getElementById("beta-ok");
  const big = [...document.querySelectorAll("[data-buy]")];
  const small = [...document.querySelectorAll("[data-buy-small]")];
  function update() {
    const on = checkout && (!ok || ok.checked);
    big.forEach(a => {
      const url = SHOP.buy[a.dataset.buy];
      if (on && url) {
        a.href = withCode(url);
        a.classList.remove("disabled");
        a.classList.add("btn-primary");
        a.removeAttribute("aria-disabled");
        a.removeAttribute("title");
      } else {
        a.removeAttribute("href");
        a.classList.add("disabled");
        a.classList.remove("btn-primary");
        a.setAttribute("aria-disabled", "true");
        if (!checkout) { a.textContent = en ? "Available soon" : "In Kürze erhältlich"; a.title = ""; }
        else a.title = en ? "Please confirm the beta notes above first" : "Bitte zuerst die Beta-Hinweise oben bestätigen";
      }
    });
    small.forEach(a => {
      const url = SHOP.buy[a.dataset.buySmall];
      if (on && url) { a.href = withCode(url); a.classList.remove("disabled"); a.removeAttribute("aria-disabled"); }
      else { a.removeAttribute("href"); a.classList.add("disabled"); a.setAttribute("aria-disabled", "true"); }
    });
  }
  if (ok) ok.addEventListener("change", update);
  update();
  // Klick auf einen gesperrten Kaufknopf führt zu den Beta-Hinweisen
  big.concat(small).forEach(a => a.addEventListener("click", e => {
    if (a.classList.contains("disabled")) {
      e.preventDefault();
      if (!checkout) return;
      const box = document.getElementById("beta");
      if (box) { box.scrollIntoView({behavior: "smooth", block: "center"}); box.classList.add("attn"); setTimeout(() => box.classList.remove("attn"), 1600); }
    }
  }));
  const dl = document.getElementById("download-link");
  if (dl && SHOP.download) dl.href = SHOP.download;
  mobileHint(dl);
  const st = document.getElementById("store-link");
  if (st && SHOP.store) st.href = SHOP.store;
  else if (st && st.parentElement) st.parentElement.style.display = "none";   // noch kein Store-Eintrag
})();


// Handy/Tablet: StepDraw läuft unter Windows – statt des Downloads den Link für später an sich selbst
// senden (öffnet das eigene Mailprogramm, nichts wird gespeichert) oder kopieren. Beide Klicks zählt
// GoatCounter als Ereignis („link-mail“, „link-copy“), ohne persönliche Daten.
function mobileHint(dl) {
  const ua = navigator.userAgent || "";
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ||
                 (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);      // iPad mit Desktop-Ansicht
  if (!mobile || !dl) return;
  const en = (document.documentElement.lang || "de").startsWith("en");
  const url = en ? "https://stepdraw.de/en/#download" : "https://stepdraw.de/#download";
  const t = en ? {
    head: "StepDraw CAD runs on Windows PCs.",
    text: "Send yourself the link and open it later on your computer:",
    mail: "Email link to me", copy: "Copy link", done: "Link copied",
    subj: "StepDraw CAD – download for Windows",
    body: "Download the free beta on your Windows PC:\n" + url
  } : {
    head: "StepDraw CAD läuft auf Windows-PCs.",
    text: "Schicken Sie sich den Link und öffnen Sie ihn später am Computer:",
    mail: "Link an mich senden", copy: "Link kopieren", done: "Link kopiert",
    subj: "StepDraw CAD – Download für Windows",
    body: "Kostenlose Beta am Windows-PC herunterladen:\n" + url
  };
  const count = (path) => { try { window.goatcounter && window.goatcounter.count({path: path, event: true}); } catch (e) {} };
  const box = document.createElement("div");
  box.className = "mobile-hint";
  box.innerHTML = "<p><b></b><br><span></span></p><div class='mobile-actions'></div>";
  box.querySelector("b").textContent = t.head;
  box.querySelector("span").textContent = t.text;
  const acts = box.querySelector(".mobile-actions");
  const mail = document.createElement("a");
  mail.className = "btn btn-dark";
  mail.textContent = t.mail;
  mail.href = "mailto:?subject=" + encodeURIComponent(t.subj) + "&body=" + encodeURIComponent(t.body);
  mail.addEventListener("click", () => count("link-mail"));
  acts.appendChild(mail);
  if (navigator.clipboard) {
    const cp = document.createElement("button");
    cp.type = "button";
    cp.className = "btn btn-light";
    cp.textContent = t.copy;
    cp.addEventListener("click", () => {
      navigator.clipboard.writeText(url).then(() => { cp.textContent = t.done; count("link-copy"); }, () => {});
    });
    acts.appendChild(cp);
  }
  const row = dl.closest(".download-row");
  if (row) {
    row.style.display = "none";                        // Windows-Download am Handy ausblenden
    row.parentNode.insertBefore(box, row);
  }
}
