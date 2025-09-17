//fonctionalité Ajout au panier
let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close-btn');
let listProductHTML =document.querySelector('.listProduct');




iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

