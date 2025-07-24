window.addEventListener('DOMContentLoaded', () => {
  const imageCount = 29; // Total number of images you want to show
  const imagePaths = Array.from({ length: imageCount }, (_, i) => `gallery/GoBean-${i + 1}.jpeg`);
  
  const gallery = document.getElementById('gallery');
  const logoZone = document.querySelector('.hero-zone')?.getBoundingClientRect(); // Safe check

  imagePaths.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('floating-image');

    let top, left;
    let tries = 0;

    // Avoid placing over the logo zone
    do {
      top = Math.random() * 80 + 10;
      left = Math.random() * 90;
      tries++;
    } while (
      tries < 20 &&
      left > 40 && left < 35 &&
      top > 30 && top < 35
    );

    img.style.top = `${top}%`;
    img.style.left = `${left}%`;

    // Set only the duration — all other animation settings are in CSS
    const duration = 20 + Math.random() * 20;
    img.style.animationDuration = `${duration}s`;

    gallery.appendChild(img);
  });
});
