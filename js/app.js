document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".burger-menu");
  const navMenu = document.querySelector("nav");
  const body = document.body;
  
  const carousel = document.querySelector(".carousel");
  const items = carousel ? carousel.querySelectorAll(".list .item") : [];
  const dots = document.querySelectorAll(".carousel .dots li");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  const btnCard = document.querySelectorAll('.btn-command')[0];
  if (btnCard) {
    btnCard.addEventListener("click", ()=>{
      // Placeholder action: accessible click is handled by href when it's a link
    });
  }
 // console.log(btnCard[0])
  let active = 0;
  let firstPosition = 0;
  let lastPosition = items.length - 1;
  let autoPlay;
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const startAutoPlay = () => {
    if (prefersReducedMotion || !next) return;
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
      next.click();
    }, 7000);
  };
  startAutoPlay();

  const setSlider = () => {
    if (!carousel || items.length === 0) return;
    const itemActiveOld = carousel.querySelector(".list .item.active");
    if (itemActiveOld) itemActiveOld.classList.remove("active");
    items[active].classList.add("active");

    const dotActiveOld = document.querySelector(".carousel .dots li.active");
    if (dotActiveOld) dotActiveOld.classList.remove("active");
    if (dots[active]) dots[active].classList.add("active");
    startAutoPlay();
  };
  setSlider();

  if (next) {
    next.onclick = () => {
      active = active + 1 > lastPosition ? 0 : active + 1;
      if (carousel) carousel.style.setProperty("--calculation", 1);
      setSlider();
    };
  }
  if (prev) {
    prev.onclick = () => {
      active = active - 1 < firstPosition ? lastPosition : active - 1;
      if (carousel) carousel.style.setProperty("--calculation", -1);
      setSlider();
    };
  }

  dots.forEach((item, position) => {
    item.addEventListener('click', () => {
      active = position;
      setSlider();
    });
    item.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        active = position;
        setSlider();
      }
    });
  });

  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('focusin', () => clearInterval(autoPlay));
    carousel.addEventListener('focusout', startAutoPlay);
  }

  if (menu && navMenu) {
    menu.addEventListener("click", () => {
      menu.classList.toggle("active");
      const expanded = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle("active");
      body.classList.toggle("no-scroll");
    });

    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        menu.classList.remove("active");
        menu.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove("active");
        body.classList.remove("no-scroll");
      })
    );
  }

  // Expose redirection for legacy inline usage if present on other pages
  window.redirectionEnSsavoirPlus = function() {
    window.location.href = "./apropos.html";
  };


});
