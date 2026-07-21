/* ===================================================================
   ARSURA — Calici & Sorrisi — main.js
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
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .to('.hero-eyebrow', { opacity: 1, y: 0, duration: .7 }, 0.15)
    .to('.hero-title .line', { opacity: 1, y: 0, duration: 1, stagger: .12 }, 0.3)
    .to('.hero-sub', { opacity: 1, y: 0, duration: .8 }, 0.75)
    .to('.hero-desc', { opacity: 1, y: 0, duration: .8 }, 0.9)
    .to('.hero-actions', { opacity: 1, y: 0, duration: .8 }, 1.05)
    .to('.hero-art', { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out' }, 0.4)
    .to('.hero-scroll', { opacity: 1, duration: .8 }, 1.3);

  /* draw glass line-art */
  document.querySelectorAll('.hero-art .glass-line').forEach((path, i) => {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power2.inOut',
      delay: 0.6 + i * 0.15
    });
  });

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
      stagger: .12,
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

  /* ---------- draw svg icons on scroll (offer / gallery) ---------- */
  document.querySelectorAll('.offer-icon svg path, .gallery-item svg path').forEach((path) => {
    if (typeof path.getTotalLength !== 'function') return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    ScrollTrigger.create({
      trigger: path,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(path, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' })
    });
  });

  /* ---------- parallax on hero art ---------- */
  const heroArt = document.querySelector('.hero-art');
  if (heroArt && window.matchMedia('(min-width: 901px)').matches) {
    gsap.to(heroArt, {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /* ---------- marquee pause on hover ---------- */
  const marquee = document.querySelector('.marquee-track');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
    marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
  }

  /* ---------- gallery track drag-free horizontal tilt on scroll ---------- */
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.fromTo(item, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: .9, delay: i * 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-track', start: 'top 85%' }
    });
  });

  /* ---------- menu page: tabs + section scrollspy ---------- */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuSections = document.querySelectorAll('.menu-section');

  if (menuTabs.length && menuSections.length) {
    menuTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = tab.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const offset = 140;
          const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    const spy = () => {
      let currentId = menuSections[0].id;
      menuSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 160) currentId = sec.id;
      });
      menuTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('href') === '#' + currentId);
      });
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  }

  /* ---------- menu rows reveal ---------- */
  gsap.utils.toArray('.menu-row').forEach((row, i) => {
    gsap.fromTo(row, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: .7, ease: 'power2.out',
      scrollTrigger: { trigger: row, start: 'top 92%' }
    });
  });

  /* ---------- refresh ScrollTrigger after everything laid out ---------- */
  window.addEventListener('load', () => ScrollTrigger.refresh());
});
