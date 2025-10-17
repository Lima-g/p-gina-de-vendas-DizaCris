// Util: helper seguro para addEventListener
function on(el, evt, handler) {
  if (el) el.addEventListener(evt, handler, { passive: true });
}

// ===============================
// Carrossel de depoimentos (A11y)
// ===============================
(function initTestimonialsCarousel() {
  const items = Array.from(document.querySelectorAll(".testimonial"));
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  if (!items.length || !prevBtn || !nextBtn) return;

  let current = 0;

  // Região viva para anunciar mudanças (polite)
  let live = document.querySelector("#testimonial-live");
  if (!live) {
    live = document.createElement("div");
    live.id = "testimonial-live";
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");
    live.style.position = "absolute";
    live.style.width = "1px";
    live.style.height = "1px";
    live.style.overflow = "hidden";
    live.style.clip = "rect(1px, 1px, 1px, 1px)";
    document.body.appendChild(live);
  }

  function updateLiveRegion(index) {
    const total = items.length;
    const nameEl = items[index].querySelector(".testimonial-name");
    const name = nameEl ? nameEl.textContent.trim() : `Depoimento ${index + 1}`;
    live.textContent = `${name} — item ${index + 1} de ${total}`;
  }

  function show(index, { focus = false } = {}) {
    items.forEach((t, i) => {
      const isActive = i === index;
      t.classList.toggle("active", isActive);
      // Opcional: visibilidade semântica
      t.setAttribute("aria-hidden", isActive ? "false" : "true");
      // Tornar focável apenas o ativo, se desejar
      t.tabIndex = isActive ? 0 : -1;
    });
    updateLiveRegion(index);
    if (focus) {
      const focusable = items[index].querySelector("h3, p, a, button") || items[index];
      focusable.focus({ preventScroll: true });
    }
  }

  on(prevBtn, "click", () => {
    current = (current - 1 + items.length) % items.length;
    show(current, { focus: false });
  });

  on(nextBtn, "click", () => {
    current = (current + 1) % items.length;
    show(current, { focus: false });
  });

  // Teclado: setas esquerda/direita
  [prevBtn, nextBtn].forEach(btn => {
    on(btn, "keydown", (e) => {
      if (e.key === "ArrowLeft") { prevBtn.click(); }
      if (e.key === "ArrowRight") { nextBtn.click(); }
    });
  });

  // Inicia
  show(current);
})();

// ===============================
// Remoção de código órfão
// ===============================
// .bonus-tags não existe no HTML atual; evitando erro caso futuramente apareça
(function initBonusTags() {
  const tags = document.querySelectorAll(".bonus-tags span");
  if (!tags.length) return;
  tags.forEach(tag => on(tag, "click", () => alert(`Você clicou em: ${tag.textContent}`)));
})();

// ===============================
// FAQ - Acordeão (APG pattern)
// ===============================
// FAQ - Acordeão (APG)
// ===== FAQ - Acordeão acessível (único) =====
document.addEventListener("DOMContentLoaded", () => {
  const faq = document.querySelector(".faq");
  if (!faq) return;

  // Normaliza ids/ARIA
  faq.querySelectorAll(".accordion-item").forEach((item, idx) => {
    const btn = item.querySelector(".accordion-button");
    const panel = item.querySelector(".accordion-content");
    if (!btn || !panel) return;
    if (!btn.id) btn.id = `faq-btn-${idx + 1}`;
    if (!panel.id) panel.id = `faq-panel-${idx + 1}`;
    btn.setAttribute("aria-controls", panel.id);
    btn.setAttribute("aria-expanded", btn.getAttribute("aria-expanded") || "false");
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", btn.id);
    panel.hidden = true;
    panel.classList.remove("show");
  });

  function closeAll() {
    faq.querySelectorAll(".accordion-button[aria-expanded='true']").forEach(b => b.setAttribute("aria-expanded","false"));
    faq.querySelectorAll(".accordion-content").forEach(p => { p.hidden = true; p.classList.remove("show"); });
  }

  faq.addEventListener("click", (e) => {
    const btn = e.target.closest(".accordion-button");
    if (!btn) return;
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;

    const open = btn.getAttribute("aria-expanded") === "true";
    if (open) {
      btn.setAttribute("aria-expanded","false");
      panel.hidden = true;
      panel.classList.remove("show");
    } else {
      closeAll();
      btn.setAttribute("aria-expanded","true");
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add("show"));
    }
  }, { passive: true });

  // Navegação por teclado
  faq.addEventListener("keydown", (e) => {
    const btn = e.target.closest(".accordion-button");
    if (!btn) return;
    const buttons = Array.from(faq.querySelectorAll(".accordion-button"));
    const i = buttons.indexOf(btn);
    if (e.key === "ArrowDown") { e.preventDefault(); buttons[Math.min(i + 1, buttons.length - 1)].focus(); }
    if (e.key === "ArrowUp")   { e.preventDefault(); buttons[Math.max(i - 1, 0)].focus(); }
    if (e.key === "Home")      { e.preventDefault(); buttons[0].focus(); }
    if (e.key === "End")       { e.preventDefault(); buttons[buttons.length - 1].focus(); }
  }, { passive: false });
});
