// StepDraw CAD – kleine Bedienhilfen der Website (ohne Bibliotheken).
// 1) Kopfleiste bekommt erst beim Scrollen eine Kante/Schatten.
// 2) Inhalte blenden beim Hineinscrollen ruhig ein (bei „weniger Bewegung“ nur Überblendung, per CSS).
(function () {
  const root = document.documentElement;
  const onScroll = () => root.classList.toggle("scrolled", window.scrollY > 4);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (!("IntersectionObserver" in window)) return;          // ältere Browser: alles sofort sichtbar
  const sel = "section h2, section p.sub, .step, .feature, .price, .compare figure, .video, .split > *, " +
              ".module-paket, .module-faq, .smartscreen, .wide-shot, .side-shot, #faq details";
  const items = Array.from(document.querySelectorAll(sel)).filter(el => !el.closest(".hero"));
  if (!items.length) return;
  root.classList.add("js");
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  // Geschwister in einem Raster leicht versetzt (max. 4 Stufen), damit die Reihe „ankommt“
  items.forEach(el => {
    const sibs = el.parentElement ? Array.from(el.parentElement.children).filter(c => items.includes(c)) : [];
    const i = Math.min(sibs.indexOf(el), 3);
    if (i > 0) el.style.transitionDelay = (i * 60) + "ms";
    el.classList.add("reveal");
    io.observe(el);
  });
  // Drucken/Speichern als PDF: alles zeigen
  window.addEventListener("beforeprint", () => items.forEach(el => el.classList.add("in")));
  // Sprung per Anker: Ziel sofort sichtbar machen
  window.addEventListener("hashchange", () => {
    const t = location.hash && document.querySelector(location.hash);
    if (t) t.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  });
})();

// 3) Bilder per Klick vergrößern (Programmbilder sind sonst zu klein zum Lesen); Esc oder Klick schließt.
(function () {
  const lang = document.documentElement.lang === "en";
  const imgs = document.querySelectorAll(".module img, .wide-shot img, .side-shot img, .compare img, .split > img");
  imgs.forEach(img => {
    img.classList.add("zoomable");
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", (lang ? "Enlarge: " : "Vergrößern: ") + (img.alt || ""));
    const open = () => {
      const box = document.createElement("div");
      box.className = "lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.innerHTML = '<button class="close" aria-label="' + (lang ? "Close" : "Schließen") + '">×</button>';
      const big = document.createElement("img");
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      box.appendChild(big);
      const close = () => {
        box.classList.remove("open");
        document.removeEventListener("keydown", key);
        setTimeout(() => box.remove(), 230);
        img.focus();
      };
      const key = e => { if (e.key === "Escape") close(); };
      box.addEventListener("click", close);
      document.addEventListener("keydown", key);
      document.body.appendChild(box);
      requestAnimationFrame(() => box.classList.add("open"));
      box.querySelector(".close").focus();
    };
    img.addEventListener("click", open);
    img.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
})();
