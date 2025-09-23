document.addEventListener("DOMContentLoaded", () => {
  // Sélection des éléments
  const galleryItems = document.querySelectorAll(".galery-item");

  // Création des éléments du lightbox
  const lightBoxContainer = document.createElement("div");
  const lightBoxContent = document.createElement("div");
  const lightBoxImg = document.createElement("img");
  const lightBoxPrev = document.createElement("div");
  const lightBoxNext = document.createElement("div");

  // Ajout des classes
  lightBoxContainer.classList.add("lightbox");
  lightBoxContent.classList.add("lightbox-content");
  lightBoxPrev.classList.add("fa", "angle-left", "lightbox-prev");
  lightBoxNext.classList.add("fa", "angle-right", "lightbox-next");

  // Construction de la structure DOM
  lightBoxContent.append(lightBoxImg, lightBoxPrev, lightBoxNext);
  lightBoxContainer.append(lightBoxContent);
  document.body.append(lightBoxContainer);

  let index = 1;

  // Affichage d'une image
  const showLightBox = (n) => {
    if (n > galleryItems.length) {
      index = 1;
    } else if (n < 1) {
      index = galleryItems.length;
    }

    const imageLocation = galleryItems[index - 1]
      .querySelector("img")
      .getAttribute("src");
    lightBoxImg.setAttribute("src", imageLocation);
  };

  // Ouvrir l’image cliquée
  const currentImage = (e) => {
    lightBoxContainer.style.display = "block";
    const imageIndex = parseInt(e.currentTarget.getAttribute("data-index"), 10);
    showLightBox((index = imageIndex));
  };

  // Ajouter les events sur toutes les images
  galleryItems.forEach((item) => {
    item.addEventListener("click", currentImage);
  });

  // Navigation
  const sliderImage = (n) => showLightBox((index += n));
  const prevImage = () => sliderImage(-1);
  const nextImage = () => sliderImage(1);

  lightBoxPrev.addEventListener("click", prevImage);
  lightBoxNext.addEventListener("click", nextImage);

  // Fermer le lightbox si clic à l’extérieur du contenu
  const closeLightBox = (e) => {
    if (e.target === lightBoxContainer) {
      lightBoxContainer.style.display = "none";
    }
  };

  lightBoxContainer.addEventListener("click", closeLightBox);
});
