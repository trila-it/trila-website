/* ===================================================================
   ALBERGO BARTOLI — main.js
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- topbar on scroll ---------- */
  const topbar = document.querySelector('.topbar');
  const topBtn = document.querySelector('.top-btn');

  const onScroll = () => {
    const y = window.scrollY;
    if (topbar) topbar.classList.toggle('scrolled', y > 40);
    if (topBtn) topBtn.classList.toggle('show', y > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- mobile nav ---------- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ---------- hero entrance timeline ---------- */
  if (document.querySelector('.hero')) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: .7 }, 0.15)
      .to('.hero-title .line', { opacity: 1, y: 0, duration: 1, stagger: .12 }, 0.3)
      .to('.hero-sub', { opacity: 1, y: 0, duration: .8 }, 0.75)
      .to('.hero-desc', { opacity: 1, y: 0, duration: .8 }, 0.9)
      .to('.hero-actions', { opacity: 1, y: 0, duration: .8 }, 1.05)
      .to('.hero-stamp', { opacity: 1, rotation: 0, duration: 1, ease: 'power2.out' }, 0.9)
      .to('.hero-scroll', { opacity: 1, duration: .8 }, 1.3);
  }

  /* ---------- generic scroll reveals ---------- */
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      }
    });
  });

  gsap.utils.toArray('.reveal-scale').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      }
    });
  });

  /* stagger groups: any [data-stagger] container reveals its direct children */
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    const items = group.children;
    gsap.set(items, { opacity: 0, y: 30 });
    gsap.to(items, {
      opacity: 1, y: 0,
      duration: .9,
      stagger: .1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
      }
    });
  });

  /* ---------- animated counters ---------- */
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
    const counter = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = counter.val.toFixed(decimals); }
        });
      }
    });
  });

  /* ---------- gallery items reveal ---------- */
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.fromTo(item, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: .9, delay: i * 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-track', start: 'top 85%' }
    });
  });

  /* ---------- rates table rows reveal ---------- */
  gsap.utils.toArray('.rates-table tbody tr').forEach((row, i) => {
    gsap.fromTo(row, { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: .6, delay: i * 0.05, ease: 'power2.out',
      scrollTrigger: { trigger: '.rates-table', start: 'top 88%' }
    });
  });

  /* ---------- refresh ScrollTrigger after everything laid out ---------- */
  window.addEventListener('load', () => ScrollTrigger.refresh());

  /* ---------- lightbox for gallery photos, with prev/next ---------- */
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-nav lightbox-prev" aria-label="Precedente">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    </button>
    <button class="lightbox-nav lightbox-next" aria-label="Successiva">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </button>
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Chiudi">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <div class="lightbox-media"></div>
    </div>`;
  document.body.appendChild(lightbox);
  const lightboxMedia = lightbox.querySelector('.lightbox-media');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');

  let currentGroup = [];
  let currentIndex = 0;

  function renderLightbox() {
    const photoEl = currentGroup[currentIndex];
    lightboxMedia.innerHTML = '';
    const img = photoEl.querySelector('img');
    if (img) {
      const clone = document.createElement('img');
      clone.src = img.src;
      clone.alt = img.alt;
      lightboxMedia.appendChild(clone);
    } else {
      const ph = document.createElement('div');
      ph.className = 'lightbox-placeholder';
      ph.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>
        <span>Foto in arrivo</span>`;
      lightboxMedia.appendChild(ph);
    }
    const showNav = currentGroup.length > 1;
    lightboxPrev.style.display = showNav ? '' : 'none';
    lightboxNext.style.display = showNav ? '' : 'none';
  }

  function openLightbox(photoEl) {
    const group = photoEl.closest('.breakfast-gallery, .room-album-photos, .about-mosaic, .gallery-track');
    if (group) {
      currentGroup = Array.from(group.querySelectorAll(':scope > .breakfast-photo, :scope > .room-album-photo, :scope > .about-mosaic-item, :scope > .gallery-item'));
    } else {
      currentGroup = [photoEl];
    }
    currentIndex = Math.max(0, currentGroup.indexOf(photoEl));
    renderLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function showPrev() {
    if (!currentGroup.length) return;
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    renderLightbox();
  }
  function showNext() {
    if (!currentGroup.length) return;
    currentIndex = (currentIndex + 1) % currentGroup.length;
    renderLightbox();
  }

  const lightboxSelectors = [
    '.room-album-photo',
    '.breakfast-photo',
    '.about-frame-inner',
    '.about-mosaic-item',
    '.about-family-photo',
    '.about-duo-item',
    '.gallery-item'
  ];
  document.querySelectorAll(lightboxSelectors.join(',')).forEach((photo) => {
    photo.classList.add('lightbox-trigger');
    photo.addEventListener('click', () => openLightbox(photo));
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  /* ---------- richiedi disponibilità form (no email sending yet) ---------- */
  const requestForm = document.getElementById('requestForm');
  if (requestForm) {
    requestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('requestSuccess');
      requestForm.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
