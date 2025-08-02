document.addEventListener("DOMContentLoaded", () => {
  /* ✅ Typewriter Effect */
  const typewriterEl = document.querySelector(".typewriter");
  const textContent = typewriterEl.getAttribute("data-text") || typewriterEl.textContent.trim();

  typewriterEl.textContent = ""; // clear initially
  typewriterEl.style.width = "0ch"; // start with 0 width

  let i = 0;
  function type() {
    if (i <= textContent.length) {
      typewriterEl.textContent = textContent.substring(0, i);
      typewriterEl.style.width = i + "ch"; // expand width
      i++;
      setTimeout(type, 120); // typing speed
    }
  }

  type();

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
    .querySelectorAll(".story-block, .cta, .team-section")
    .forEach((el) => observer.observe(el));
});
