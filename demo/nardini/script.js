document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Anno corrente nel footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Menu mobile ---------- */
  var menuToggle = document.getElementById('menu-toggle');
  var mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      var isActive = mainNav.classList.toggle('active');
      menuToggle.classList.toggle('active', isActive);
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Fade-in on scroll ---------- */
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Form prenotazione (demo, nessun invio reale) ---------- */
  var bookingForm = document.getElementById('booking-form');
  var formNote = document.getElementById('form-note');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nome = document.getElementById('nome').value.trim();
      var telefono = document.getElementById('telefono').value.trim();

      if (!nome || !telefono) {
        formNote.textContent = 'Compila nome e telefono per inviare la richiesta.';
        formNote.style.color = '#c0392b';
        return;
      }

      formNote.style.color = '';
      formNote.textContent = 'Grazie ' + nome + '! La tua richiesta è stata inviata, ti ricontatteremo al più presto.';
      bookingForm.reset();
    });
  }

});
