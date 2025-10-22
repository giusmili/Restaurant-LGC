document.addEventListener('DOMContentLoaded', ()=> {
   const menu = document.querySelector('.burger-menu');
   const navMenu = document.querySelector('nav');
   const body = document.body;

   if (menu && navMenu) {
     menu.addEventListener("click", () => {
        menu.classList.toggle("active");
        const expanded = menu.getAttribute('aria-expanded') === 'true';
        menu.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle("active");
        body.classList.toggle('no-scroll');
     });

     document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        menu.classList.remove("active");
        menu.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove("active");
        body.classList.remove('no-scroll');
     }));
   }

   // Expose reserver redirection if used inline on other pages
  window.redirectionReserver = () => {
      window.location.href = "./reservation.html";
  };
})

// Enregistrement du Service Worker (commun à la plupart des pages)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => console.log('[SW] Enregistré'))
      .catch((err) => console.error('[SW] Échec enregistrement:', err));
  });
}
