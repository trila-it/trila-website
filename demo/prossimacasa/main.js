// AI SEARCH
const AI_RESPONSES = {
  keywords: [
    { match: ['mare','spiaggia','costiera','vista mare'], results: [4] },
    { match: ['villa','giardino','parco','indipendente'], results: [2,5,8] },
    { match: ['loft','industriale','moderno','design'], results: [3] },
    { match: ['lusso','premium','attico','penthouse','terrazza'], results: [1,7] },
    { match: ['campagna','collina','toscana','casale','rustico'], results: [8,5] },
    { match: ['centro','storico','città'], results: [6,3] },
  ],
  fallback: [1,2,3]
};

function aiMatch(query) {
  const q = query.toLowerCase();
  for (const rule of AI_RESPONSES.keywords) {
    if (rule.match.some(k => q.includes(k))) return rule.results;
  }
  return AI_RESPONSES.fallback;
}

const propIconSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 7l7-5 7 5v9a1 1 0 01-1 1H3a1 1 0 01-1-1z" stroke="#3b82f6" stroke-width="1.4"/><path d="M6 17v-5h6v5" stroke="#3b82f6" stroke-width="1.4"/></svg>`;

function renderAISuggestions(ids) {
  const box = document.getElementById('aiSuggestions');
  box.innerHTML = ids.map(id => {
    const p = PROPERTIES.find(x => x.id === id);
    if (!p) return '';
    return `<a href="property.html?id=${p.id}" class="ai-suggestion-item">
      <div class="ai-suggestion-icon">${propIconSvg}</div>
      <div class="ai-suggestion-text">
        <div class="ai-suggestion-title">${p.title}</div>
        <div class="ai-suggestion-sub">${p.neighborhood}, ${p.city} · ${p.sqm} m² · ${p.rooms} camere</div>
      </div>
      <div class="ai-suggestion-price">€ ${p.price.toLocaleString('it-IT')}</div>
    </a>`;
  }).join('');
}

function aiSearch(query) {
  const box = document.getElementById('aiSuggestions');
  box.innerHTML = `<div class="ai-thinking"><div class="ai-dots"><span></span><span></span><span></span></div>Sto cercando la casa perfetta per te...</div>`;
  setTimeout(() => renderAISuggestions(aiMatch(query)), 900);
}

document.getElementById('aiBtn').addEventListener('click', () => {
  const q = document.getElementById('aiInput').value.trim();
  if (q) aiSearch(q);
});
document.getElementById('aiInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') { const q = e.target.value.trim(); if (q) aiSearch(q); }
});

// NAV HAMBURGER
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(eased * target);
    el.textContent = val.toLocaleString('it-IT') + (el.dataset.target === '98' ? '%' : '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value').forEach(el => observer.observe(el));

// PROPERTY CARDS
function formatPrice(p) {
  return '€ ' + p.toLocaleString('it-IT');
}

function createPropCard(prop) {
  const badge = prop.badge
    ? `<span class="prop-badge ${prop.badge === 'Nuovo' ? 'new' : ''}">${prop.badge}</span>`
    : '';
  return `
    <a href="property.html?id=${prop.id}" class="prop-card">
      <div class="prop-img-wrap">
        <img src="${prop.img}" alt="${prop.title}" class="prop-img" loading="lazy" />
        ${badge}
        <div class="prop-fav">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13.5S2 9.5 2 5.5A3.5 3.5 0 018 3.26 3.5 3.5 0 0114 5.5c0 4-6 8-6 8z" stroke="#94a3b8" stroke-width="1.4"/>
          </svg>
        </div>
      </div>
      <div class="prop-body">
        <div class="prop-price">${formatPrice(prop.price)}</div>
        <div class="prop-title">${prop.title}</div>
        <div class="prop-loc">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.8 3.5 6.5 3.5 6.5s3.5-3.7 3.5-6.5C9.5 2.57 7.93 1 6 1z" stroke="#94a3b8" stroke-width="1.2"/>
            <circle cx="6" cy="4.5" r="1" fill="#94a3b8"/>
          </svg>
          ${prop.neighborhood}, ${prop.city}
        </div>
        <div class="prop-meta">
          <div class="prop-meta-item">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1.5" y="4" width="10" height="7" rx="1" stroke="#94a3b8" stroke-width="1.2"/>
              <path d="M4 4V3a2 2 0 014 0v1" stroke="#94a3b8" stroke-width="1.2"/>
            </svg>
            ${prop.rooms} cam.
          </div>
          <div class="prop-meta-item">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 7h9M2 7V4.5a1.5 1.5 0 013 0V7M11 7v1.5a2 2 0 01-2 2H4a2 2 0 01-2-2V7" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
            ${prop.bathrooms} bagni
          </div>
          <div class="prop-meta-item">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1.5" y="1.5" width="10" height="10" rx="1" stroke="#94a3b8" stroke-width="1.2"/>
              <path d="M1.5 5.5h10M5.5 1.5v10" stroke="#94a3b8" stroke-width="1.2"/>
            </svg>
            ${prop.sqm} m²
          </div>
        </div>
      </div>
    </a>
  `;
}

const grid = document.getElementById('featuredGrid');
if (grid) {
  const featured = PROPERTIES.slice(0, 6);
  grid.innerHTML = featured.map(createPropCard).join('');
}

// SMOOTH scroll for hero tags
document.querySelectorAll('.tag').forEach(t => {
  t.addEventListener('click', () => {
    const input = document.querySelector('.search-input');
    if (input) { input.value = t.textContent; input.focus(); }
  });
});
