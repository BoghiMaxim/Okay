/* ============================================================
   ui.js — UI Interactions: Products, Search, Toast, Newsletter
   MoldaStore
   ============================================================ */

/* ══════════════════════════════════════
   PRODUCTS
══════════════════════════════════════ */

function renderProducts(filter = 'all') {
  const grid = document.getElementById('prodGrid');
  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="prod-card" data-id="${p.id}">
      <div class="prod-img-wrap" style="background: ${p.color};">
        ${p.tag ? `<span class="prod-tag ${p.tagClass}">${p.tag}</span>` : ''}
        <button class="prod-wishlist"
          onclick="event.stopPropagation(); addToWishlist(${p.id})"
          title="Adaugă la favorite">♡</button>
        <img
          src="${p.image}"
          alt="${p.name}"
          style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0;"
          onerror="this.style.display='none'"
        />
        <button class="prod-add" onclick="addToCart(${p.id})">+ Adaugă în coș</button>
      </div>
      <div class="prod-stars">${p.stars}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-style">${p.style}</div>
      <div class="prod-price">
        ${p.price.toLocaleString()} MDL
        ${p.oldPrice ? `<span class="old">${p.oldPrice.toLocaleString()} MDL</span>` : ''}
      </div>
    </div>
  `).join('');

  attachCursorListeners();
}

function filterProducts(filter, btn) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const grid = document.getElementById('prodGrid');
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(10px)';
  grid.style.transition = 'opacity 0.25s, transform 0.25s';

  setTimeout(() => {
    renderProducts(filter);
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 200);
}

function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  if (product) showToast(`"${product.name}" salvat la favorite ♡`);
}

/* ══════════════════════════════════════
   SEARCH
══════════════════════════════════════ */
function openSearch() {
  document.getElementById('searchOverlay').classList.add('open');
  setTimeout(() => document.getElementById('searchInput').focus(), 200);
}

function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('open');
}

function setSearch(text) {
  document.getElementById('searchInput').value = text;
  document.getElementById('searchInput').focus();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeSearch(); closeCart(); }
});

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
let toastTimer;

function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ══════════════════════════════════════
   NEWSLETTER
══════════════════════════════════════ */
function subscribeNewsletter() {
  const emailInput = document.getElementById('emailInput');
  const email = emailInput.value.trim();
  if (!email || !email.includes('@')) {
    showToast('Introdu o adresă de email validă!');
    return;
  }
  showToast('Felicitări! Ai primit –10% la prima comandă 🎉');
  emailInput.value = '';
}

/* ══════════════════════════════════════
   CURSOR HELPERS
══════════════════════════════════════ */
function attachCursorListeners() {
  document.querySelectorAll(
    'a, button, .prod-card, .cat-card, .look-card, .brand-item, .search-tag, .testi-card'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}
