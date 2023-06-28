(() => {
    const scrollUp = document.querySelector('.scroll-up');

    const showBtn = window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            scrollUp.classList.add('scroll-up');
        } else {
            scrollUp.classList.remove('scroll-up');
        }
    });
})();
