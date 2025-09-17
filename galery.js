const galeryitem = document.getElementsByClassName('galery-item');
const lightBoxContainer = document.createElement('div');
const lightBoxContent = document.createElement('div');
const lightBoxImg = document.createElement('img');
const lightBoxPrev = document.createElement('div');
const lightBoxNext = document.createElement('div');

//ClassList

lightBoxContainer.classList.add('lightbox');
lightBoxContent.classList.add('lightbox-content');
lightBoxPrev.classList.add('fa', 'angle-left', 'lightbox-prev');
lightBoxNext.classList.add('fa', 'angle-right', 'lightbox-next');

lightBoxContainer.appendChild(lightBoxContent);
lightBoxContent.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxPrev);
lightBoxContent.appendChild(lightBoxNext);
document.body.appendChild(lightBoxContainer);

let index = 1;

function showLightBox(n){
    if (n > galeryitem.length){
        index = 1;
    }else if(n < 1) {
        index = galeryitem.length;
    }

    let imageLocation = galeryitem[index-1].children[0].getAttribute("src");
    lightBoxImg.setAttribute("src", imageLocation);
}

function currentImage(){
    lightBoxContainer.style.display = "block";

    let imageIndex = parseInt(this.getAttribute("data-index"));
    showLightBox(index = imageIndex);
}

for (let i = 0; i<galeryitem.length; i++){
    galeryitem[i].addEventListener('click', currentImage);
}

function sliderImage(n){
    showLightBox(index += n);
}
function prevImage(){
    sliderImage(-1);
}
function nextImage(){
    sliderImage(1);
}

lightBoxPrev.addEventListener('click', prevImage);
lightBoxNext.addEventListener('click', nextImage);

//Close lightbox

function closeLightBox(){
    if(this === event.target){
        lightBoxContainer.style.display = "none";
    }
}

lightBoxContainer.addEventListener('click', closeLightBox);