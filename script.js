document.addEventListener("DOMContentLoaded", () => {
  /* ✅ Animate ALL typewriters */
  document.querySelectorAll(".typewriter").forEach((el) => {
    const textContent = el.getAttribute("data-text") || el.textContent.trim();
    el.textContent = "";
    el.style.width = "0ch";

    let i = 0;
    function type() {
      if (i <= textContent.length) {
        el.textContent = textContent.substring(0, i);
        el.style.width = i + "ch";
        i++;
        setTimeout(type, 120);
      } else {
        el.style.width = "auto"; // allow wrapping after typing
      }
    }
    type();
  });

  /* ✅ Scroll-triggered animations */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.3 }
  );

  document
    .querySelectorAll(".story-block, .cta, .team-section, .award-section, .gallery-section")
    .forEach((el) => observer.observe(el));

  /* ✅ Gallery Slider (3‑card stack, safe + delegated clicks) */
(function initGallery() {
  const slider = document.querySelector(".gallery-slider");
  if (!slider) return;

  const cards = slider.querySelectorAll(".gallery-card");
  if (!cards.length) return;

  let currentIndex = 0;
  const total = cards.length;
  const LOOP = true;
  const mod = (n, m) => ((n % m) + m) % m;

  function render() {
    cards.forEach((c) => c.className = "gallery-card"); // reset classes
    if (LOOP) {
      const prev = mod(currentIndex - 1, total);
      const next = mod(currentIndex + 1, total);
      cards[prev].classList.add("prev");
      cards[currentIndex].classList.add("active");
      cards[next].classList.add("next");
    } else {
      if (currentIndex > 0) cards[currentIndex - 1].classList.add("prev");
      cards[currentIndex].classList.add("active");
      if (currentIndex < total - 1) cards[currentIndex + 1].classList.add("next");
    }
  }

  // 🔁 Event delegation: works even if markup shifts
  document.addEventListener("click", (e) => {
    if (e.target.closest(".gallery-prev")) {
      currentIndex = LOOP ? mod(currentIndex - 1, total) : Math.max(0, currentIndex - 1);
      render();
    } else if (e.target.closest(".gallery-next")) {
      currentIndex = LOOP ? mod(currentIndex + 1, total) : Math.min(total - 1, currentIndex + 1);
      render();
    }
  });

  render();

  /* ✅ Lightbox */
  let lb = document.getElementById("lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "lightbox";
    lb.className = "lightbox";
    lb.setAttribute("aria-hidden", "true");
    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Close">×</button>
      <img class="lightbox-img" alt="">
    `;
    document.body.appendChild(lb);
  }
  const lbImg = lb.querySelector(".lightbox-img");
  const lbClose = lb.querySelector(".lightbox-close");

  function openLightbox(src) {
    lbImg.src = src;
    lb.classList.add("show");
    document.body.classList.add("no-scroll");
    lb.setAttribute("aria-hidden", "false");
  }
  function closeLightbox() {
    lb.classList.remove("show");
    document.body.classList.remove("no-scroll");
    lb.setAttribute("aria-hidden", "true");
  }

  slider.querySelectorAll(".gallery-card img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src));
  });
  lbClose?.addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("show")) closeLightbox();
  });
})();
});

/* ✅ Parallax Effect */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax").forEach((img) => {
    const speed = 0.5;
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrollProgress = 1 - rect.top / windowHeight;
      const yPos = scrollProgress * 100 * speed;
      img.style.transform = `translateY(${yPos}px)`;
    }
  });
});

/* ✅ Burger Menu Toggle */
const burger = document.querySelector(".burger");
const navMenu = document.querySelector("nav ul");

if (burger) {
  burger.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
  });
}

// header scroll
(function(){
  const hdr = document.querySelector('header');
  if(!hdr) return;
  const apply = () => {
    const h = hdr.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-h', `${h}px`);
    document.body.style.paddingTop = `var(--header-h)`;
    // shadow when scrolled
    if (window.scrollY > 4) hdr.classList.add('is-stuck');
    else hdr.classList.remove('is-stuck');
  };
  apply();
  window.addEventListener('resize', apply, {passive:true});
  window.addEventListener('scroll', apply, {passive:true});
})();