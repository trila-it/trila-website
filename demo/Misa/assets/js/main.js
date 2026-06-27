// Nav scroll
const nav = document.querySelector('.nav');
if (nav) {
  const tick = () => nav.classList.toggle('filled', window.scrollY > 50);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

// Hamburger
const ham = document.querySelector('.hamburger');
const mob = document.querySelector('.mobile-nav');
if (ham && mob) {
  ham.addEventListener('click', () => {
    const open = ham.classList.toggle('open');
    mob.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// Reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Active nav
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-left a, .nav-right a').forEach(a => {
  if (a.getAttribute('href') === page) a.style.opacity = '1';
});
