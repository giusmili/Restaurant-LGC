const images = document.querySelectorAll('.img-menu figure');
const popup = document.getElementById('popupAjoutPanier');
const popupContent = popup.querySelector('p');
const popupImage = popup.querySelector('img:not(.close)'); // Sélectionne la deuxième image (l'image du burger)
const closeButton = popup.querySelector('.close');
const ajouterAUPanier = document.getElementById('ajouter-au-panier');
let listCartHTML = document.querySelector('.listCart');

// Initialiser l'image avec la valeur de data-src
popupImage.src = popupImage.dataset.src;

images.forEach(figure => {
  figure.addEventListener('click', () => {
    const burgerName = figure.dataset.burgerName;
    const burgerPrice = figure.dataset.burgerPrice;
    const burgerImage = figure.dataset.burgerImage;

    popupContent.innerHTML = `${burgerName}<br>${burgerPrice}€`;
    popupImage.src = burgerImage;

    popup.classList.remove('hidden');
  });
});

closeButton.addEventListener('click', () => {
  popup.classList.add('hidden');
});

//Ajout au Panier

ajouterAUPanier.addEventListener('click', () => {
  // Récupérer les données du produit
  images.forEach(figure => {
    const burgerName = figure.dataset.burgerName;
    const burgerPrice = figure.dataset.burgerPrice;
    const burgerImage = figure.dataset.burgerImage;

      // Créer un élément pour représenter le produit dans le panier
  const produitPanier = document.createElement('div');
  produitPanier.classList.add('listCart');
  produitPanier.innerHTML = `
    <img src="${burgerImage}" alt="${burgerName}">
    <p>${burgerName} - ${burgerPrice}€</p>
  `;

  // Ajouter le produit au panier
  listCartHTML.appendChild(produitPanier);
  })


});
