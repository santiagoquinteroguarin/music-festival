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

