document.addEventListener("DOMContentLoaded", () => {
  /* ✅ Typewriter Effect for all elements with .typewriter */
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
    .querySelectorAll(".story-block, .cta, .team-section, .gallery-section, .award-section")
    .forEach((el) => observer.observe(el));

  /* ✅ Parallax Effect */
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax").forEach((img) => {
      const speed = 0.2;
      const yPos = window.scrollY * speed;
      img.style.transform = `translateY(${yPos}px)`;
    });
  });

  /* ✅ Gallery Slider Logic */
  const cards = document.querySelectorAll(".gallery-card");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");
  let current = 0;

  function updateCards() {
    cards.forEach((card, index) => {
      card.classList.remove("active", "prev", "next");
      if (index === current) {
        card.classList.add("active");
      } else if (index === (current - 1 + cards.length) % cards.length) {
        card.classList.add("prev");
      } else if (index === (current + 1) % cards.length) {
        card.classList.add("next");
      }
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      current = (current - 1 + cards.length) % cards.length;
      updateCards();
    });

    nextBtn.addEventListener("click", () => {
      current = (current + 1) % cards.length;
      updateCards();
    });
  }

  updateCards(); // Initialize slider

  /* ✅ Burger Menu Logic */
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector("nav ul");

  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      navMenu.classList.toggle("show-menu");
    });
  }
});
