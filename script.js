(function() {

  /* ── HEADER ── */
  const hdr = document.getElementById('site-header');
  window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', window.scrollY > 4), {passive:true});

  /* ── BURGER ── */
  const burger = document.querySelector('.burger');
  const navMenu = document.getElementById('nav-menu');
  burger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    burger.textContent = open ? '✕' : '☰';
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
    burger.textContent = '☰';
  }));

  /* ── TYPEWRITER ── */
  function typewrite(el, cb) {
    const text = el.dataset.text || '';
    el.textContent = '';
    el.style.width = '0ch';
    let i = 0;
    function tick() {
      el.textContent = text.substring(0, i);
      el.style.width = i + 'ch';
      if (i < text.length) { i++; setTimeout(tick, 105); }
      else { el.style.borderRight = 'none'; el.style.width = 'auto'; if(cb) cb(); }
    }
    tick();
  }

  const heroTW = document.querySelector('.typewriter');
  if (heroTW) typewrite(heroTW);

  /* ── SCROLL REVEAL ── */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('show');
      revObs.unobserve(e.target);
    });
  }, {threshold: 0.18});
  document.querySelectorAll('.hidden').forEach(el => revObs.observe(el));

  /* ── PARALLAX ── */
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(img => {
      const r = img.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        const p = 1 - r.top / window.innerHeight;
        img.style.transform = `translateY(${(p * 80 * .45).toFixed(1)}px)`;
      }
    });
  }, {passive:true});

  /* ── GALLERY (scrolling track + arrows + dots + swipe) ── */
  (function initGallery() {
    const track   = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('gal-prev');
    const nextBtn = document.getElementById('gal-next');
    const dotsWrap= document.getElementById('gallery-dots');
    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.gallery-card'));
    const total = cards.length;

    /* build dots */
    cards.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to image ' + (i+1));
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });

    /* ── infinite carousel: clone cards before & after ── */
    const origCount = cards.length;

    /* clone last N cards before, first N cards after */
    const clonesBefore = [...cards].reverse().map(c => { const cl = c.cloneNode(true); track.insertBefore(cl, track.firstChild); return cl; });
    const clonesAfter  = cards.map(c => { const cl = c.cloneNode(true); track.appendChild(cl); return cl; });

    /* all slides including clones */
    const allSlides = Array.from(track.querySelectorAll('.gallery-card'));
    /* real cards now start at index origCount */
    let cur = origCount;

    function getOffset(idx) {
      const cardW = allSlides[0].offsetWidth;
      const wrapW = track.parentElement.offsetWidth;
      return idx * cardW - (wrapW / 2 - cardW / 2);
    }

    function goTo(idx, animate) {
      if (animate === false) track.style.transition = 'none';
      else track.style.transition = 'transform .4s cubic-bezier(.25,1,.5,1)';
      cur = idx;
      track.style.transform = `translateX(${-getOffset(cur)}px)`;
      /* update dots against real index */
      const realIdx = ((cur - origCount) % origCount + origCount) % origCount;
      dotsWrap.querySelectorAll('.gallery-dot').forEach((d,i) => d.classList.toggle('active', i === realIdx));
    }

    /* after transition ends, silently jump if we've gone into clones */
    track.addEventListener('transitionend', () => {
      if (cur < origCount) {
        goTo(cur + origCount, false);
      } else if (cur >= origCount * 2) {
        goTo(cur - origCount, false);
      }
    });

    prevBtn.addEventListener('click', () => goTo(cur - 1, true));
    nextBtn.addEventListener('click', () => goTo(cur + 1, true));

    /* keyboard */
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  goTo(cur - 1, true);
      if (e.key === 'ArrowRight') goTo(cur + 1, true);
    });

    /* touch / mouse drag swipe */
    let startX = 0, isDragging = false, didDrag = false;
    function onStart(x) { startX = x; isDragging = true; didDrag = false; track.classList.add('grabbing'); }
    function onMove(x) { if (!isDragging) return; if (Math.abs(x - startX) > 5) didDrag = true; }
    function onEnd(x) {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('grabbing');
      const diff = startX - x;
      if (Math.abs(diff) > 50) { goTo(diff > 0 ? cur + 1 : cur - 1, true); }
    }

    track.addEventListener('mousedown',  e => onStart(e.clientX));
    window.addEventListener('mousemove', e => { if(isDragging) onMove(e.clientX); });
    window.addEventListener('mouseup',   e => onEnd(e.clientX));
    track.addEventListener('touchstart', e => onStart(e.touches[0].clientX), {passive:true});
    track.addEventListener('touchmove',  e => onMove(e.touches[0].clientX),  {passive:true});
    track.addEventListener('touchend',   e => onEnd(e.changedTouches[0].clientX));

    /* prevent img drag triggering click */
    track.querySelectorAll('img').forEach(img => {
      img.addEventListener('dragstart', e => e.preventDefault());
    });

    /* re-center on resize */
    window.addEventListener('resize', () => goTo(cur, false), {passive:true});

    goTo(origCount, false);

    /* ── LIGHTBOX ── */
    const lb    = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const openLB  = src => { lbImg.src = src; lb.classList.add('show'); lb.setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll'); };
    const closeLB = ()  => { lb.classList.remove('show'); lb.setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); };

    track.querySelectorAll('img').forEach(img => img.addEventListener('click', () => { if (!didDrag) openLB(img.src); }));
    document.getElementById('lb-close').addEventListener('click', closeLB);
    lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
  })();

})();