document.addEventListener('DOMContentLoaded', function() {
    scrollNav();
});

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