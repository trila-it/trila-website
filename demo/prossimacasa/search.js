// NAV HAMBURGER
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

let activeType = 'all';
let activeRooms = 0;
let maxPrice = 2000000;

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

function getFiltered() {
  const cityVal = document.getElementById('cityFilter').value.toLowerCase().trim();
  const sqmMin  = parseInt(document.getElementById('sqmFilter').value, 10) || 0;
  return PROPERTIES.filter(p => {
    if (activeType !== 'all' && p.type !== activeType) return false;
    if (p.rooms < activeRooms) return false;
    if (p.price > maxPrice) return false;
    if (cityVal && !p.city.toLowerCase().includes(cityVal) && !p.neighborhood.toLowerCase().includes(cityVal)) return false;
    if (p.sqm < sqmMin) return false;
    return true;
  });
}

function getSorted(arr) {
  const v = document.getElementById('sortSelect').value;
  const copy = [...arr];
  if (v === 'price-asc')  copy.sort((a,b) => a.price - b.price);
  if (v === 'price-desc') copy.sort((a,b) => b.price - a.price);
  if (v === 'sqm-desc')   copy.sort((a,b) => b.sqm - a.sqm);
  return copy;
}

function render() {
  const results = getSorted(getFiltered());
  const grid = document.getElementById('searchGrid');
  const count = document.getElementById('resultsCount');
  count.textContent = results.length === 0
    ? 'Nessun immobile trovato'
    : `${results.length} immobil${results.length === 1 ? 'e trovato' : 'i trovati'}`;
  grid.innerHTML = results.length === 0
    ? `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--slate-400)">
         <div style="font-size:2.5rem;margin-bottom:12px">🏠</div>
         <p>Nessun immobile corrisponde ai filtri selezionati.</p>
       </div>`
    : results.map(createPropCard).join('');
}

// TYPE CHIPS
document.getElementById('typeChips').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('#typeChips .chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  activeType = chip.dataset.type;
});

// ROOM CHIPS
document.getElementById('roomChips').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('#roomChips .chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  activeRooms = parseInt(chip.dataset.rooms, 10);
});

// PRICE RANGE
const priceRange = document.getElementById('priceRange');
const priceLabel = document.getElementById('priceLabel');
priceRange.addEventListener('input', () => {
  maxPrice = parseInt(priceRange.value, 10);
  priceLabel.textContent = maxPrice >= 2000000 ? 'Tutti' : '€ ' + maxPrice.toLocaleString('it-IT');
});

// APPLY / RESET
document.getElementById('applyFilters').addEventListener('click', render);
document.getElementById('resetFilters').addEventListener('click', () => {
  document.getElementById('cityFilter').value = '';
  document.getElementById('sqmFilter').value = '';
  priceRange.value = 2000000;
  priceLabel.textContent = 'Tutti';
  activeType = 'all';
  activeRooms = 0;
  maxPrice = 2000000;
  document.querySelectorAll('#typeChips .chip').forEach((c,i) => c.classList.toggle('active', i===0));
  document.querySelectorAll('#roomChips .chip').forEach((c,i) => c.classList.toggle('active', i===0));
  render();
});

document.getElementById('sortSelect').addEventListener('change', render);

render();
