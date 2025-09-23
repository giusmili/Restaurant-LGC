class MenuPopup {
    constructor() {
        this.images = document.querySelectorAll('.img-menu figure');
        this.popup = document.getElementById('popupAjoutPanier');
        this.popupContent = this.popup.querySelector('p');
        this.popupImage = this.popup.querySelector('img:not(.close)');
        this.closeButton = this.popup.querySelector('.close');
        this.ajouterAUPanier = document.getElementById('ajouter-au-panier');
        this.listCartHTML = document.querySelector('.listCart');

        // Initialiser l’image avec sa valeur data-src
        this.popupImage.src = this.popupImage.dataset.src;

        this.initEvents();
    }

    initEvents() {
        this.images.forEach(figure => {
            figure.addEventListener('click', () => this.openPopup(figure));
        });

        this.closeButton.addEventListener('click', () => this.closePopup());

        this.ajouterAUPanier.addEventListener('click', () => this.addToCart());
    }

    openPopup(figure) {
        const { burgerName, burgerPrice, burgerImage } = figure.dataset;

        this.popupContent.innerHTML = `${burgerName}<br>${burgerPrice}€`;
        this.popupImage.src = burgerImage;

        this.popup.classList.remove('hidden');
    }

    closePopup() {
        this.popup.classList.add('hidden');
    }

    addToCart() {
        this.images.forEach(figure => {
            const { burgerName, burgerPrice, burgerImage } = figure.dataset;

            const produitPanier = document.createElement('div');
            produitPanier.classList.add('listCart');
            produitPanier.innerHTML = `
                <img src="${burgerImage}" alt="${burgerName}">
                <p>${burgerName} - ${burgerPrice}€</p>
            `;

            this.listCartHTML.appendChild(produitPanier);
        });
    }
}

// Initialisation quand le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
    new MenuPopup();
});
