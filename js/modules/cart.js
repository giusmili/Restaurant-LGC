// Simple Cart module (ES2025)
// Manages items, persistence, rendering, and interactions

export class Cart {
  constructor({ storageKey = 'lgc_cart' } = {}) {
    this.storageKey = storageKey;
    this.items = new Map(); // key: name, value: { name, price, image, qty }
    this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const obj = JSON.parse(raw);
        this.items = new Map(
          Object.values(obj).map((it) => [it.name, { ...it, qty: Number(it.qty) || 1 }])
        );
      }
    } catch (_) {
      this.items = new Map();
    }
  }

  save() {
    const plain = {};
    this.items.forEach((v, k) => {
      plain[k] = v;
    });
    localStorage.setItem(this.storageKey, JSON.stringify(plain));
  }

  add({ name, price, image }) {
    const key = name;
    const existing = this.items.get(key);
    if (existing) {
      existing.qty += 1;
      this.items.set(key, existing);
    } else {
      this.items.set(key, { name, price: Number(price), image, qty: 1 });
    }
    this.save();
  }

  update(name, delta) {
    const it = this.items.get(name);
    if (!it) return;
    it.qty += delta;
    if (it.qty <= 0) {
      this.items.delete(name);
    } else {
      this.items.set(name, it);
    }
    this.save();
  }

  remove(name) {
    this.items.delete(name);
    this.save();
  }

  count() {
    let c = 0;
    this.items.forEach((it) => (c += it.qty));
    return c;
  }

  total() {
    let t = 0;
    this.items.forEach((it) => (t += it.qty * (Number(it.price) || 0)));
    return t;
  }

  render(container) {
    if (!container) return;
    container.innerHTML = '';
    if (this.items.size === 0) {
      const empty = document.createElement('div');
      empty.className = 'items';
      empty.textContent = 'Votre panier est vide';
      container.appendChild(empty);
      return;
    }
    this.items.forEach((it) => {
      const row = document.createElement('div');
      row.className = 'items';
      row.innerHTML = `
        <div class="image"><img src="${it.image}" alt="${it.name}"></div>
        <div class="name">${it.name}</div>
        <div class="totalPrice">${(it.price * it.qty).toFixed(2)}€</div>
        <div class="quantity" data-name="${it.name}">
          <button class="minus" type="button" aria-label="Retirer">−</button>
          <span aria-live="polite">${it.qty}</span>
          <button class="plus" type="button" aria-label="Ajouter">+</button>
        </div>
      `;
      container.appendChild(row);
    });
  }

  bindInteractions(container, onChange) {
    if (!container) return;
    container.addEventListener('click', (e) => {
      const target = e.target.closest('button');
      if (!target) return;
      const parent = target.closest('.quantity');
      if (!parent) return;
      const name = parent.dataset.name;
      if (target.classList.contains('plus')) this.update(name, +1);
      if (target.classList.contains('minus')) this.update(name, -1);
      onChange?.();
    });
  }
}

export function formatCurrency(val) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(val);
}
