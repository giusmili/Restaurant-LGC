import { Cart } from '../modules/cart.js';

// Generic shop page module for pages with .img-menu and #popupAjoutPanier
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const iconCart = document.querySelector('.icon-cart');
  const closeCart = document.querySelector('.close-btn');
  const listCartHTML = document.querySelector('.listCart');
  const badge = document.querySelector('.icon-cart span');

  const cart = new Cart();
  const refresh = () => {
    if (listCartHTML) cart.render(listCartHTML);
    if (badge) badge.textContent = String(cart.count());
  };
  if (listCartHTML) cart.bindInteractions(listCartHTML, refresh);
  refresh();

  if (iconCart) iconCart.addEventListener('click', () => body.classList.toggle('showCart'));
  if (closeCart) closeCart.addEventListener('click', () => body.classList.toggle('showCart'));

  const popup = document.getElementById('popupAjoutPanier');
  const popupContent = popup ? popup.querySelector('#popup-content, p') : null;
  const popupImage = popup ? popup.querySelector('#popup-image, img:not(.close)') : null;
  const popupClose = popup ? popup.querySelector('.close') : null;
  const addBtn = popup ? popup.querySelector('button') : null;

  let currentItem = null;

  const parseFigure = (figure) => {
    const ds = figure.dataset || {};
    let name = ds.burgerName || '';
    let price = ds.burgerPrice || '';
    let image = ds.burgerImage || '';
    if (!name || !price) {
      const cap = figure.querySelector('figcaption');
      const txt = cap ? (cap.innerText || cap.textContent || '').trim() : '';
      const lines = txt.split('\n').map(s => s.trim()).filter(Boolean);
      if (lines.length >= 1) name = name || lines[0];
      // Find price in any line
      const joined = lines.join(' ');
      const m = joined.match(/([0-9]+(?:[\.,][0-9]{1,2})?)\s*€/);
      if (m) price = price || m[1];
    }
    if (!image) {
      const img = figure.querySelector('img');
      if (img && img.getAttribute('src')) image = img.getAttribute('src');
    }
    const normalizedPrice = Number(String(price).replace(',', '.'));
    return { name, price: normalizedPrice, image };
  };

  const openPopup = (figure) => {
    const item = parseFigure(figure);
    currentItem = item;
    if (popupContent) popupContent.innerHTML = `${item.name}<br>${item.price}€`;
    if (popupImage) popupImage.src = item.image;
    if (popup) popup.classList.remove('hidden');
  };
  const closePopup = () => popup && popup.classList.add('hidden');

  document.querySelectorAll('.img-menu figure').forEach((figure) => {
    figure.addEventListener('click', () => openPopup(figure));
  });

  if (popupClose) popupClose.addEventListener('click', closePopup);
  if (addBtn) addBtn.addEventListener('click', () => {
    if (!currentItem) return;
    cart.add(currentItem);
    refresh();
    closePopup();
    if (iconCart) body.classList.add('showCart');
  });
});

