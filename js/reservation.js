document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("myButton");
  const popup = document.getElementById("popup");
  const closeButton = document.querySelector(".close");

  if (button) {
    button.addEventListener("click", () => {
      popup?.classList.remove("hidden");
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      popup?.classList.add("hidden");
    });
  }
});
