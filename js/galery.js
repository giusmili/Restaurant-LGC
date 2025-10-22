document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".galery-item");

  // Créer le lightbox accessible
  const lightBoxContainer = document.createElement("div");
  const lightBoxContent = document.createElement("div");
  const lightBoxImg = document.createElement("img");
  const lightBoxPrev = document.createElement("button");
  const lightBoxNext = document.createElement("button");
  const lightBoxClose = document.createElement("button");

  lightBoxContainer.classList.add("lightbox");
  lightBoxContainer.setAttribute("role", "dialog");
  lightBoxContainer.setAttribute("aria-modal", "true");
  lightBoxContainer.setAttribute("aria-label", "Visionneuse d'images");
  lightBoxContainer.tabIndex = -1;

  lightBoxContent.classList.add("lightbox-content");
  lightBoxPrev.classList.add("lightbox-prev");
  lightBoxNext.classList.add("lightbox-next");
  lightBoxClose.classList.add("lightbox-close");

  lightBoxPrev.type = "button";
  lightBoxNext.type = "button";
  lightBoxClose.type = "button";
  lightBoxPrev.setAttribute("aria-label", "Image précédente");
  lightBoxNext.setAttribute("aria-label", "Image suivante");
  lightBoxClose.setAttribute("aria-label", "Fermer");
  lightBoxClose.setAttribute("title", "Fermer");
  lightBoxClose.textContent = '×';

  // Structure
  lightBoxContent.append(lightBoxImg, lightBoxPrev, lightBoxNext, lightBoxClose);
  lightBoxContainer.append(lightBoxContent);
  document.body.append(lightBoxContainer);

  let index = 1;
  let lastFocused = null;

  // Accessibilité des items (clavier)
  galleryItems.forEach((item, i) => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    if (!item.getAttribute('aria-label')) {
      item.setAttribute('aria-label', `Ouvrir la photo ${i+1}`);
    }
  });

  const showLightBox = (n) => {
    if (n > galleryItems.length) index = 1;
    else if (n < 1) index = galleryItems.length;
    const anchor = galleryItems[index - 1].querySelector("img");
    const src = anchor ? anchor.getAttribute("src") : "";
    const alt = anchor ? anchor.getAttribute("alt") || `Photo ${index}` : `Photo ${index}`;
    lightBoxImg.setAttribute("src", src);
    lightBoxImg.setAttribute("alt", alt);
  };

  const openLightBox = (startIndex) => {
    lastFocused = document.activeElement;
    lightBoxContainer.style.display = "block";
    document.body.classList.add('no-scroll');
    showLightBox(index = startIndex);
    lightBoxClose.focus();
  };

  const closeLightBox = () => {
    lightBoxContainer.style.display = "none";
    document.body.classList.remove('no-scroll');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  // Bind ouverture
  const handleOpen = (e) => {
    const imageIndex = parseInt(e.currentTarget.getAttribute("data-index"), 10);
    openLightBox(imageIndex);
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", handleOpen);
    item.addEventListener("keydown", (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        handleOpen({ currentTarget: item });
      }
    });
  });

  // Navigation
  const sliderImage = (n) => showLightBox((index += n));
  const prevImage = () => sliderImage(-1);
  const nextImage = () => sliderImage(1);

  lightBoxPrev.addEventListener("click", prevImage);
  lightBoxNext.addEventListener("click", nextImage);
  lightBoxClose.addEventListener("click", closeLightBox);

  // Fermer si clic hors contenu
  lightBoxContainer.addEventListener("click", (e) => {
    if (e.target === lightBoxContainer) closeLightBox();
  });

  // Gestion clavier dans le lightbox
  lightBoxContainer.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Escape': closeLightBox(); break;
      case 'ArrowLeft': prevImage(); break;
      case 'ArrowRight': nextImage(); break;
      case 'Tab': {
        // Trap focus entre prev/next/close
        const focusables = [lightBoxPrev, lightBoxNext, lightBoxClose];
        const i = focusables.indexOf(document.activeElement);
        if (e.shiftKey) {
          e.preventDefault();
          const ni = (i <= 0 ? focusables.length : i) - 1;
          focusables[ni].focus();
        } else {
          e.preventDefault();
          const ni = (i + 1) % focusables.length;
          focusables[ni].focus();
        }
        break;
      }
    }
  });
});
