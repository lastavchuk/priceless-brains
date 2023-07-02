import throttle from 'lodash.throttle';

const scrollUp = document.querySelector('.scroll-up');

window.addEventListener('scroll', throttle(handlerScrollDoc, 300));

scrollUp.classList.add('is-hidden');

function handlerScrollDoc() {
    if (window.scrollY < 250) {
        scrollUp.classList.add('is-hidden');
    } else {
        scrollUp.classList.remove('is-hidden');
    }

    scrollUp.onclick = () => {
        window.scrollTo(0, 0);
    };
}
