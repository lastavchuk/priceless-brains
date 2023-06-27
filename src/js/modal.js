const refs = {
    modalBtnClose: document.querySelector('[data-modal-close]'),
    modalBtnAdd: document.querySelector('.modal-btn'),
    modal: document.querySelector('[data-modal]'),
    congrat: document.querySelector('.congratulations'),
};

const classes = {
    addShoppingList: 'js-btn-add',
    removeShoppingList: 'js-btn-remove',
};

refs.modalBtnClose.addEventListener('click', toggleMode);
refs.modalBtnAdd.addEventListener('click', handlerClickAddRemove);

function toggleMode() {
    refs.modal.classList.toggle('modal-is-hidden');
}

function handlerClickAddRemove(evt) {
    if (evt.target.classList.contains(classes.addShoppingList)) {
        evt.target.textContent = 'remove from the shopping list';
        console.log(evt.target.textContent);
        refs.congrat.classList.remove('visually-hidden');

        evt.target.classList.replace(
            classes.addShoppingList,
            classes.removeShoppingList
        );
        // evt.target.classList.add(classes.removeShoppingList);
    }
    if (evt.target.classList.contains(classes.removeShoppingList)) {
        refs.congrat.classList.add('visually-hidden');
        refs.modal.classList.toggle('modal-is-hidden');
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
