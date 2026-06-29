// NAV HAMBURGER
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

// MODAL
document.getElementById('contactBtn').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.add('active');
});
document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('active');
});
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
});

// GET PROPERTY
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'), 10) || 1;
const prop = PROPERTIES.find(p => p.id === id) || PROPERTIES[0];

function formatPrice(p) { return '€ ' + p.toLocaleString('it-IT'); }

// HERO
const heroImgEl = document.getElementById('heroImg');
heroImgEl.style.backgroundImage = `url(${prop.images[0]})`;
heroImgEl.style.backgroundSize = 'cover';
heroImgEl.style.backgroundPosition = 'center';
document.getElementById('propTitle').textContent = prop.title;
document.getElementById('propLocation').querySelector('span').textContent = `${prop.neighborhood}, ${prop.city}`;
document.title = `${prop.title} — ProssimaCasa`;

// BADGES
const badgesEl = document.getElementById('propBadges');
badgesEl.innerHTML = [prop.type, prop.city].map(t =>
  `<span class="prop-badge-hero">${t}</span>`
).join('');
if (prop.badge) badgesEl.innerHTML += `<span class="prop-badge-hero">${prop.badge}</span>`;

// GALLERY
const galleryStrip = document.getElementById('galleryStrip');
galleryStrip.innerHTML = prop.images.map((url, i) => `
  <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-url="${url}">
    <img src="${url}" alt="Foto ${i+1}" style="width:100%;height:100%;object-fit:cover" loading="lazy" />
  </div>
`).join('');

galleryStrip.querySelectorAll('.gallery-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    galleryStrip.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    heroImgEl.style.backgroundImage = `url(${thumb.dataset.url})`;
  });
});

// DESCRIPTION
document.getElementById('propDescription').textContent = prop.description;

// PRICE
document.getElementById('propPrice').textContent = formatPrice(prop.price);
document.getElementById('priceDetails').innerHTML = `
  <div class="price-detail-item">
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1.5" y="1.5" width="10" height="10" rx="1" stroke="#3b82f6" stroke-width="1.2"/>
      <path d="M1.5 5.5h10M5.5 1.5v10" stroke="#3b82f6" stroke-width="1.2"/>
    </svg>
    ${prop.sqm} m²
  </div>
  <div class="price-detail-item">
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1.5" y="4" width="10" height="7" rx="1" stroke="#3b82f6" stroke-width="1.2"/>
      <path d="M4 4V3a2 2 0 014 0v1" stroke="#3b82f6" stroke-width="1.2"/>
    </svg>
    ${prop.rooms} camere
  </div>
  <div class="price-detail-item">
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 7h9M2 7V4.5a1.5 1.5 0 013 0V7M11 7v1.5a2 2 0 01-2 2H4a2 2 0 01-2-2V7" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round"/>
    </svg>
    ${prop.bathrooms} bagni
  </div>
`;

// DETAILS GRID
const detailsGrid = document.getElementById('detailsGrid');
const details = [
  { svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="1.5" stroke="#3b82f6" stroke-width="1.5"/><path d="M2 8h16M8 2v16" stroke="#3b82f6" stroke-width="1.5"/></svg>`, value: `${prop.sqm} m²`, label: 'Superficie' },
  { svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="7" width="16" height="10" rx="1.5" stroke="#3b82f6" stroke-width="1.5"/><path d="M6 7V5a4 4 0 018 0v2" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/></svg>`, value: prop.rooms, label: 'Camere da letto' },
  { svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 11h14M3 11V7.5A2.5 2.5 0 018 5v6M17 11v2.5A3 3 0 0114 16.5H6A3 3 0 013 13.5V11" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/></svg>`, value: prop.bathrooms, label: 'Bagni' },
  { svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="1.5" stroke="#3b82f6" stroke-width="1.5"/><path d="M3 8h14M8 3v14" stroke="#3b82f6" stroke-width="1.5"/></svg>`, value: prop.floor, label: 'Piano' },
  { svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 9L10 3l8 6v9a1 1 0 01-1 1H3a1 1 0 01-1-1z" stroke="#3b82f6" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 19v-7h6v7" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/></svg>`, value: prop.type, label: 'Tipologia' },
  { svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="14" rx="1.5" stroke="#3b82f6" stroke-width="1.5"/><path d="M6 2v4M14 2v4M2 9h16" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/></svg>`, value: prop.year, label: 'Anno costruzione' },
];
detailsGrid.innerHTML = details.map(d => `
  <div class="detail-item">
    <div class="detail-icon">${d.svg}</div>
    <div class="detail-value">${d.value}</div>
    <div class="detail-label">${d.label}</div>
  </div>
`).join('');

// FEATURES
const featuresList = document.getElementById('featuresList');
const checkSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
featuresList.innerHTML = prop.features.map(f =>
  `<span class="feature-tag">${checkSvg}${f}</span>`
).join('');

// AGENT
document.getElementById('agentName').textContent = prop.agent.name;
document.getElementById('agentAgency').textContent = prop.agent.agency;

// SIMILAR PROPERTIES
const similar = PROPERTIES.filter(p => p.id !== prop.id && (p.city === prop.city || p.type === prop.type)).slice(0, 3);
const similarList = document.getElementById('similarList');
similarList.innerHTML = similar.map(p => `
  <a href="property.html?id=${p.id}" class="similar-item">
    <div class="similar-thumb"><img src="${p.img}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover" loading="lazy" /></div>
    <div class="similar-info">
      <div class="similar-price">${formatPrice(p.price)}</div>
      <div class="similar-name">${p.title}</div>
    </div>
  </a>
`).join('');
