const elements = {
    openModaFooter: document.querySelector('[data-modal-open-footer]'),
    closeModalFooter: document.querySelector('[data-modal-footer-close]'),
    modalFooter: document.querySelector('[data-modal-footer]'),
    backdropFooter: document.querySelector('.backdrop_footer'),
}

elements.openModaFooter.addEventListener('click', handlerOpenModal);
elements.closeModalFooter.addEventListener('click', handlerCloseModal);

function handlerOpenModal() {
    elements.modalFooter.classList.remove('visibility-hidden');
    document.body.classList.add('stop-scrolling');
    elements.backdropFooter.addEventListener('click', onBackdropFooterClick);
    document.addEventListener('keydown', onEscapeBtnPress);
}
function handlerCloseModal() {
    elements.modalFooter.classList.add('visibility-hidden');
    document.body.classList.remove('stop-scrolling');
    elements.backdropFooter.removeEventListener('click', onBackdropFooterClick);
    document.removeEventListener('keydown', onEscapeBtnPress);
}

function onBackdropFooterClick(event) {
    const backdrop = event.target.className;
    if (backdrop === 'backdrop_footer') {
        handlerCloseModal();
    }
};

function onEscapeBtnPress(event) {
    event.preventDefault();
    if (event.key === 'Escape') {
        handlerCloseModal();
    }
}