let cart = [];

function showSection(section) {
  document.getElementById('home').style.display    = section === 'home' ? 'flex' : 'none';
  document.getElementById('products').style.display = section === 'products' ? 'block' : 'none';
  document.getElementById('cart').style.display    = section === 'cart' ? 'block' : 'none';
  if (section === 'cart') renderCart();
}

// Show home by default
document.getElementById('products').style.display = 'block';

function filterProducts(cat, btn) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('.product-card');
  let visible = 0;
  cards.forEach(c => {
    const match = cat === 'all' || c.dataset.category === cat;
    c.style.display = match ? 'block' : 'none';
    if (match) visible++;
  });
  document.getElementById('no-products').style.display = visible === 0 ? 'block' : 'none';
}

function liveSearch(query) {
  const q = query.toLowerCase();
  const cards = document.querySelectorAll('.product-card');
  let visible = 0;
  cards.forEach(c => {
    const match = c.innerText.toLowerCase().includes(q);
    c.style.display = match ? 'block' : 'none';
    if (match) visible++;
  });
  document.getElementById('no-products').style.display = visible === 0 ? 'block' : 'none';
}

function addToCart(btn, name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) { existing.qty++; }
  else { cart.push({ name, price, qty: 1 }); }
  btn.textContent = '✓ Added';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = 'Add to Cart'; btn.classList.remove('added'); }, 1200);
  updateCartCount();
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = total;
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const summary   = document.getElementById('cart-summary');
  const empty     = document.getElementById('empty-cart');

  if (cart.length === 0) {
    container.innerHTML = '';
    summary.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  summary.style.display = 'block';

  const emojis = { 'Wireless Earbuds Pro':'📱','Classic Cotton T-Shirt':'👕','Laptop Stand Adjustable':'💻','Stainless Steel Mug':'☕','Clean Code':'📚','Running Shoes':'👟' };

  container.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-emoji">${emojis[item.name] || '📦'}</div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>Qty: ${item.qty}</span>
      </div>
      <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</div>
      <button class="btn-remove" onclick="removeItem(${idx})">✕</button>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('subtotal').textContent = '₹' + subtotal.toLocaleString();
  document.getElementById('total').textContent    = '₹' + subtotal.toLocaleString();
}

function removeItem(idx) {
  cart.splice(idx, 1);
  updateCartCount();
  renderCart();
}

function checkout() {
  cart = [];
  updateCartCount();
  document.getElementById('order-success').style.display = 'flex';
}

function closeSuccess() {
  document.getElementById('order-success').style.display = 'none';
  showSection('products');
}
