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
        el.style.width = "auto";
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
    .querySelectorAll(
      ".story-block, .cta, .team-section, .award-section, .gallery-section"
    )
    .forEach((el) => observer.observe(el));

  /* ✅ Gallery Slider */
  const galleryCards = document.querySelectorAll(".gallery-card");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");

  let currentIndex = 0;

  function updateGallery() {
    galleryCards.forEach((card) => {
      card.style.display = "none";
      card.style.opacity = "0";
      card.style.transform = "scale(0.8)";
    });

    // ✅ Calculate indices safely
    let indices = [currentIndex - 1, currentIndex, currentIndex + 1].filter(
      (i) => i >= 0 && i < galleryCards.length
    );

    indices.forEach((i) => {
      galleryCards[i].style.display = "block";
      galleryCards[i].style.opacity = "1";
      galleryCards[i].style.transform =
        i === currentIndex ? "scale(1)" : "scale(0.85)";
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = Math.max(currentIndex - 1, 0);
      updateGallery();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = Math.min(currentIndex + 1, galleryCards.length - 1);
      updateGallery();
    });
  }

  updateGallery(); // ✅ Initialize
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
