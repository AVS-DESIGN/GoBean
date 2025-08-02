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
        el.style.width = "auto"; // ✅ allow wrapping after typing
      }
    }

    type();
  });

  /* ✅ Scroll-triggered animations for all sections */
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
  const gallery = document.querySelector(".gallery-slider");
  if (gallery) {
    const cards = gallery.querySelectorAll(".gallery-card");
    const prevBtn = gallery.querySelector(".gallery-prev");
    const nextBtn = gallery.querySelector(".gallery-next");
    let currentIndex = 0;

    function updateGallery() {
      cards.forEach((card, index) => {
        card.style.display = "none";
        card.style.transform = "scale(0.8)";
        card.style.opacity = "0.5";
      });

      const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
      const nextIndex = (currentIndex + 1) % cards.length;

      // Previous card
      cards[prevIndex].style.display = "block";
      cards[prevIndex].style.transform = "translateX(-120px) scale(0.9)";
      cards[prevIndex].style.opacity = "0.7";

      // Active card
      cards[currentIndex].style.display = "block";
      cards[currentIndex].style.transform = "translateX(0) scale(1)";
      cards[currentIndex].style.opacity = "1";

      // Next card
      cards[nextIndex].style.display = "block";
      cards[nextIndex].style.transform = "translateX(120px) scale(0.9)";
      cards[nextIndex].style.opacity = "0.7";
    }

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateGallery();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateGallery();
    });

    updateGallery(); // Initialize
  }
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

burger.addEventListener("click", () => {
  navMenu.classList.toggle("show-menu");
});
