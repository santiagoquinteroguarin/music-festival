document.addEventListener('DOMContentLoaded', function() {
    scrollNav();

    navigationFixed();
});

function navigationFixed() {
    const bar = document.querySelector('.header');

    // registrar el intersection observer
    const observer = new IntersectionObserver(function(entries){
        if(entries[0].isIntersecting) {
            bar.classList.remove('fijo');
        } else {
            bar.classList.add('fijo');
        }
    });

    // elemento observar
    observer.observe(document.querySelector('.about-festival'));
}

function scrollNav() {
    const links = document.querySelectorAll('.main-navigation');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const section = document.querySelector(e.target.attributes.href.value);
            section.scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
};


document.addEventListener('DOMContentLoaded', function() {
    createGallery();
});

function createGallery() {
    const gallery = document.querySelector('.gallery-images');

    for(let i = 1; i <= 12; i++) {
        const image = document.createElement('img');
        image.src = `/build/img/thumb/${i}.webp`;

        // agregarle un id a la imagen
        image.dataset.imageId = i;

        // añadir la función de mostar imagen
        image.onclick = showImage;

        const list = document.createElement('li');
        list.appendChild(image);

        gallery.appendChild(list);
    }
}

function showImage(e) {
    const id = parseInt(e.target.dataset.imageId);

    // generar la imagen
    const image = document.createElement('img');
    image.src = `/build/img/grande/${id}.webp`;

    const overlay = document.createElement('div');
    overlay.appendChild(image);
    overlay.classList.add('overlay');

    // cuando se da click afuera, cerrar la imagen
    overlay.onclick = function() {
        overlay.remove();
    }

    // Boton para cerrar la imagen
    const closeImage = document.createElement('p');
    closeImage.textContent = 'X';
    closeImage.classList.add('btn-close');

    // cta para el boton de cerrar imagen
    closeImage.onclick = function() {
        overlay.remove();
    }

    overlay.appendChild(closeImage);

    // mostar en el html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}