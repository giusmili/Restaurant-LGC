//fonctionalité Ajout au panier

document.addEventListener('DOMContentLoaded', ()=> {

  const user = {
    iconCart: document.querySelector(".icon-cart"),
    closeCart: document.querySelector(".close-btn"),
    listProductHTML: document.querySelector(".listProduct"),
  };

  user.iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
  user.closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });

});
