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
});
