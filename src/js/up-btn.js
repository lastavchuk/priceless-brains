const scrollUp = document.querySelector('.scroll-up');

window.addEventListener('scroll', handlerScrollDoc);

scrollUp.classList.add('is-hidden');

function handlerScrollDoc() {
    if (window.scrollY > 600) {
        scrollUp.classList.remove('is-hidden');
    } else {
        scrollUp.classList.add('is-hidden');
    }

    scrollUp.onclick = () => {
        window.scrollTo(0, 0);
    };
}
