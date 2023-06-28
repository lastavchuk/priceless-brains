const refs = {
    modalBtnClose: document.querySelector('[data-modal-close]'),
    modalBtnAdd: document.querySelector('.modal-btn'),
    modal: document.querySelector('[data-modal]'),
    congrat: document.querySelector('.congratulations'),
    cardList: document.querySelector('.book-list'),
};

const classes = {
    addShoppingList: 'js-btn-add',
    removeShoppingList: 'js-btn-remove',
};

refs.modalBtnClose.addEventListener('click', toggleMode);
refs.modalBtnAdd.addEventListener('click', handlerClickAddRemove);
refs.cardList.addEventListener('click', addToModal);

function addToModal(evt) {
    if (evt.target === evt.currentTarget) {
        return;
    }
    const currentBook = evt.target.closest('li').children;
    console.log(currentBook);
    toggleMode();
}

function toggleMode() {
    refs.modal.classList.toggle('modal-is-hidden');
    refs.modalBtnAdd.textContent = 'add to shopping list';
    refs.congrat.classList.add('visually-hidden');
}

function addItem() {}

function handlerClickAddRemove(evt) {
    if (evt.target.classList.contains(classes.addShoppingList)) {
        evt.target.textContent = 'remove from the shopping list';
        refs.congrat.classList.remove('visually-hidden');
        evt.target.classList.replace('js-btn-add', 'js-btn-remove');
        return;
    }
    if (evt.target.classList.contains(classes.removeShoppingList)) {
        evt.target.classList.replace('js-btn-remove', 'js-btn-add');
        toggleMode();
        return;
    }
}
function createModalMarkup(array) {
    return array
        .map(
            ({ img, name, author, descr }) =>
                `<div class="thumb">
    <img
        class="book-img"
        src="${img}"
        alt="Cover"
    />
</div>
<div class="modal-book-info">
    <h3 class="name">${name}</h3>
    <h4 class="author">${author}</h4>
    <p class="descr">${descr}</p>`
        )
        .join('');
}
