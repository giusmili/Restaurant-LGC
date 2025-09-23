document.addEventListener('DOMContentLoaded', ()=> {
   const menu = document.querySelector('.burger-menu');
   const navMenu = document.querySelector(' nav');
   let body = document.querySelector('body');

   menu.addEventListener("click", () => {
      menu.classList.toggle("active");
      navMenu.classList.toggle("active");
   })

   document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
      menu.classList.remove("active");
      navMenu.classList.remove("active");
   }))

   /* Fonction pour empêcher le scroll quand le burger menu est ouvert */
   menu.addEventListener('click', () => {

      body.classList.toggle('no-scroll');
   });

  
   const redirectionReserver=()=>{
      /*  Fonction pour le button Reserver une table de la page d'accueil qui redirige vers la page reservation.html */
      window.location.href = "./reservation.html";
   }
 
})