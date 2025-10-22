import { Cart } from '../modules/cart.js';

// Page module for burgers (popup + cart)
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const iconCart = document.querySelector('.icon-cart');
  const closeCart = document.querySelector('.close-btn');
  const listCartHTML = document.querySelector('.listCart');
  const badge = document.querySelector('.icon-cart span');

  const cart = new Cart();

  const refresh = () => {
    cart.render(listCartHTML);
    if (badge) badge.textContent = String(cart.count());
  };
  cart.bindInteractions(listCartHTML, refresh);
  refresh();

  // Toggle cart panel
  if (iconCart) iconCart.addEventListener('click', () => body.classList.toggle('showCart'));
  if (closeCart) closeCart.addEventListener('click', () => body.classList.toggle('showCart'));

  // Popup logic
  const popup = document.getElementById('popupAjoutPanier');
  const popupContent = popup ? popup.querySelector('#popup-content') : null;
  const popupImage = popup ? popup.querySelector('#popup-image, img:not(.close)') : null;
  const popupClose = popup ? popup.querySelector('.close') : null;
  const addBtn = document.getElementById('ajouter-au-panier');

  let currentItem = null; // { name, price, image }

  const openPopup = (figure) => {
    const { burgerName, burgerPrice, burgerImage } = figure.dataset;
    currentItem = { name: burgerName, price: Number(burgerPrice), image: burgerImage };
    if (popupContent) popupContent.innerHTML = `${burgerName}<br>${burgerPrice}€`;
    if (popupImage) popupImage.src = burgerImage;
    if (popup) popup.classList.remove('hidden');
  };
  const closePopup = () => popup && popup.classList.add('hidden');

  // Bind grid figures
  document.querySelectorAll('.img-menu figure').forEach((figure) => {
    figure.addEventListener('click', () => openPopup(figure));
  });

  if (popupClose) popupClose.addEventListener('click', closePopup);

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (currentItem) {
        cart.add(currentItem);
        refresh();
        closePopup();
        body.classList.add('showCart');
      }
    });
  }
});

