// -------- Active nav highlight --------
function markActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navlinks a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

// -------- Year / updated label --------
function setUpdatedLabel() {
  const yearEls = document.querySelectorAll("[data-year]");
  const y = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = y);
}

// -------- TH / EN toggle (เฉพาะส่วนบน About) --------
function setupLanguageToggle() {
  const thBtn = document.getElementById("btnTH");
  const enBtn = document.getElementById("btnEN");
  const thBlock = document.querySelector("[data-lang='th']");
  const enBlock = document.querySelector("[data-lang='en']");

  if (!thBtn || !enBtn || !thBlock || !enBlock) return;

  const setLang = (lang) => {
    if (lang === "en") {
      thBlock.style.display = "none";
      enBlock.style.display = "block";
      enBtn.classList.add("active");
      thBtn.classList.remove("active");
      localStorage.setItem("pakkad_lang", "en");
    } else {
      enBlock.style.display = "none";
      thBlock.style.display = "block";
      thBtn.classList.add("active");
      enBtn.classList.remove("active");
      localStorage.setItem("pakkad_lang", "th");
    }
  };

  thBtn.addEventListener("click", () => setLang("th"));
  enBtn.addEventListener("click", () => setLang("en"));

  // default from storage
  const saved = localStorage.getItem("pakkad_lang") || "th";
  setLang(saved);
}

// -------- Carousel (smooth) --------
function setupCarousel(id, images) {
  const root = document.getElementById(id);
  if (!root) return;

  const imgEl = root.querySelector("img");
  const dotsEl = root.querySelector(".dots");
  const leftBtn = root.querySelector(".car-btn.left");
  const rightBtn = root.querySelector(".car-btn.right");

  let idx = 0;

  const renderDots = () => {
    dotsEl.innerHTML = "";
    images.forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "dot" + (i === idx ? " active" : "");
      d.addEventListener("click", () => go(i));
      dotsEl.appendChild(d);
    });
  };

  const go = (newIdx) => {
    idx = (newIdx + images.length) % images.length;
    // smooth fade
    imgEl.style.opacity = "0";
    setTimeout(() => {
      imgEl.src = images[idx];
      imgEl.onload = () => { imgEl.style.opacity = "1"; };
      renderDots();
    }, 160);
  };

  leftBtn?.addEventListener("click", () => go(idx - 1));
  rightBtn?.addEventListener("click", () => go(idx + 1));

  // initial
  imgEl.style.transition = "opacity 220ms ease";
  imgEl.src = images[0];
  imgEl.style.opacity = "1";
  renderDots();
}

// -------- Accordion --------
function setupAccordion() {
  document.querySelectorAll("[data-acc]").forEach(btn => {
    btn.addEventListener("click", () => {
      const panelId = btn.getAttribute("data-acc");
      const panel = document.getElementById(panelId);
      if (!panel) return;

      const isOpen = panel.classList.contains("show");
      panel.classList.toggle("show", !isOpen);

      // rotate chevron (optional)
      const chev = btn.querySelector("[data-chevron]");
      if (chev) chev.style.transform = !isOpen ? "rotate(180deg)" : "rotate(0deg)";
    });
  });
}

// -------- Lightbox --------
function setupLightbox() {
  const lb = document.getElementById("lightbox");
  const lbImg = lb?.querySelector("img");
  const closeBtn = lb?.querySelector(".close");
  if (!lb || !lbImg) return;

  const open = (src) => {
    lbImg.src = src;
    lb.classList.add("show");
  };
  const close = () => lb.classList.remove("show");

  document.querySelectorAll("[data-lightbox]").forEach(img => {
    img.addEventListener("click", () => open(img.getAttribute("src")));
  });

  closeBtn?.addEventListener("click", close);
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  markActiveNav();
  setUpdatedLabel();
  setupLanguageToggle();
  setupAccordion();
  setupLightbox();
});