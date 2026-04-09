/* ============================================================
   cart.js — Shopping Cart Logic
   MoldaStore
   ============================================================ */

let cart = [];

/* ── ADD TO CART ── */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`"${product.name}" adăugat în coș`);
}

/* ── CHANGE QUANTITY ── */
function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(x => x.id !== id);
  }

  updateCartUI();
}

/* ── REMOVE FROM CART ── */
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

/* ── UPDATE CART UI ── */
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  document.getElementById('cartCount').textContent = totalCount;
  document.getElementById('cartTotal').textContent = totalPrice.toLocaleString() + ' MDL';

  renderCartBody();
}

/* ── RENDER CART ITEMS ── */
function renderCartBody() {
  const body = document.getElementById('cartBody');

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍</div>
        <p>Coșul tău este gol.<br>Adaugă produse pentru a începe.</p>
      </div>`;
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">👗</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.style}</div>
        <div class="cart-item-bottom">
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
          <div style="display:flex; align-items:center;">
            <span class="cart-item-price">${(item.price * item.qty).toLocaleString()} MDL</span>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── OPEN / CLOSE DRAWER ── */
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}
