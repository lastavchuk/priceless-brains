const refs = {
    modalBtnClose: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
};

refs.modalBtnClose.addEventListener('click', toggleMode);

function toggleMode() {
    refs.modal.classList.toggle('modal-is-hidden');
}
