document.addEventListener("DOMContentLoaded", () => {
  /* ✅ Fixed Typewriter Effect */
  const typewriterEl = document.querySelector(".typewriter");
  const textContent = typewriterEl.getAttribute("data-text") || typewriterEl.textContent.trim();

  typewriterEl.textContent = ""; // clear initially
  typewriterEl.style.width = "0ch"; // set width to 0 initially

  let i = 0;
  function type() {
    if (i <= textContent.length) {
      typewriterEl.textContent = textContent.substring(0, i);
      typewriterEl.style.width = i + "ch"; // expand width with text
      i++;
      setTimeout(type, 120);
    }
  }

  type();

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

  document.querySelectorAll(".story-block, .cta").forEach((el) => {
    observer.observe(el);
  });
});
