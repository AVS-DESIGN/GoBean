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

  // ✅ Observe all sections that should fade in
  document
  .querySelectorAll(".story-block, .cta, .team-section, .award-section, .gallery-section")
  .forEach((el) => observer.observe(el));
});


/* ✅ Parallax Effect */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax").forEach((img) => {
    const speed = 0.5; // increase speed for more visible effect
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Only move the image if it's visible in the viewport
    if (rect.top < windowHeight && rect.bottom > 0) {
      // How far the image is inside the viewport (0 at top, 1 at bottom)
      const scrollProgress = 1 - rect.top / windowHeight;

      // Apply a transform relative to its position
      const yPos = scrollProgress * 100 * speed; // adjust 50 for stronger effect
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


