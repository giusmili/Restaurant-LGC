class Avis {
    constructor() {
        this.btn = document.getElementById('btn-avis');
        this.post = document.querySelector('.post');
        this.widget = document.querySelector('.star-widget');
        this.editBtn = document.querySelector('.edit');

        this.initEvents();
    }

    initEvents() {
        this.btn.addEventListener('click', (event) => this.handleSubmit(event));
        this.editBtn.addEventListener('click', () => this.handleEdit());
    }

    handleSubmit(event) {
        event.preventDefault();
        this.widget.style.display = "none";
        this.post.style.display = "block";
    }

    handleEdit() {
        this.widget.style.display = "block";
        this.post.style.display = "none";
    }
}

// Instance de la classe Avis lorsque le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", () => {
    new Avis();
});
