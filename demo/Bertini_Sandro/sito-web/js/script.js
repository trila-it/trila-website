// Studio Immobiliare Bertini — interazioni base

document.addEventListener('DOMContentLoaded', () => {
  // Menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const phone = document.querySelector('.nav-phone');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '78px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = '#fdfcf7';
      links.style.padding = '20px 24px';
      links.style.borderBottom = '1px solid #e4e5dd';
      if (phone) phone.style.display = open ? 'none' : 'flex';
    });
  }

  // Filtri per categoria (solo visuale, filtra le card in pagina se presenti)
  const pills = document.querySelectorAll('.cat-pill');
  const cards = document.querySelectorAll('[data-category]');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const category = pill.dataset.filter;
      if (!cards.length) return;
      cards.forEach((card) => {
        const match = category === 'tutti' || card.dataset.category === category;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  // Form di contatto: invio dimostrativo (da collegare a un servizio email/backend reale)
  document.querySelectorAll('form[data-contact-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      if (feedback) {
        feedback.textContent = 'Grazie! Il messaggio è pronto per essere inviato: collega questo modulo alla tua email o CRM per riceverlo davvero.';
        feedback.style.color = '#565a35';
      }
      form.reset();
    });
  });
});
