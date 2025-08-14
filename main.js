const products = [
  { id: 1, name: 'Headphones', category: 'electronics', price: 999, rating: 4.5, img: 'assets/images/headphones.jpg' },
  { id: 2, name: 'Keyboard', category: 'electronics', price: 2499, rating: 4.7, img: 'assets/images/keyboard.jpg' },
  { id: 3, name: 'Mouse', category: 'electronics', price: 799, rating: 4.3, img: 'assets/images/mouse.jpg' }
  
];

const grid = document.getElementById('productGrid');
const cartKey = 'eshop_cart_v1';
let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

function updateCartCount() {
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = cart.length;
}

function saveCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(c => c.id === id);
  if (!existing) {
    cart.push({ id, name: p.name, price: p.price, qty: 1, img: p.img });
    saveCart();
    const btn = document.querySelector(`.add[data-id="${id}"]`);
    if (btn) {
      btn.textContent = "Added";
      btn.disabled = true;
      btn.style.background = "#888";
    }
  }
}

function renderProducts(list = products) {
  if (!grid) return;
  grid.innerHTML = list.map(p => {
    const isInCart = cart.find(c => c.id === p.id);
    return `
      <article class="product" data-id="${p.id}">
        <h3>${p.name}</h3>
        <img src="${p.img}" alt="${p.name}">
        <p>₹${p.price}</p>
        <button class="add" data-id="${p.id}" ${isInCart ? 'disabled style="background:#888"' : ''}>
          ${isInCart ? 'Added' : 'Add to cart'}
        </button>
      </article>
    `;
  }).join('');
  attachListeners();
}

function attachListeners() {
  document.querySelectorAll('.add').forEach(btn => {
    btn.addEventListener('click', e => addToCart(Number(e.target.dataset.id)));
  });
}

renderProducts();
updateCartCount();
