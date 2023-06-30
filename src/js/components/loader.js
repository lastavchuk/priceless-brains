function loadingPage(selector) {
    selector.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
}

function loadPage(selector) {
    document.body.style.overflow = '';
    selector.classList.add('is-hidden');
}

export { loadingPage, loadPage };
