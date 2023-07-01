import buyIcons from '../images/symbol-defs.svg';

const refs = {
    modalBtnClose: document.querySelector('[data-modal-close]'),
    modalBtn: document.querySelector('.modal-btn'),
    modalBackDrop: document.querySelector('[data-modal]'),
    modal: document.querySelector('.modal-book'),
    congrat: document.querySelector('.congratulations'),
    cardList: document.querySelector('.book-list'),
    seeMoreBtn: document.querySelector('.see-more-btn'),
};

const KEY_LS = 'books';
let idBook;

refs.modalBtn.addEventListener('click', handlerClickAddRemove);
refs.cardList.addEventListener('click', addToModal);
refs.modalBtnClose.addEventListener('click', closeModal);

function addToModal(evt) {
    if (evt.target === evt.currentTarget || refs.seeMoreBtn) {
        return;
    }
    refs.modal.innerHTML = '';
    idBook = findIdBook(evt.target);
    checkInLS(idBook);
    getBookModal(idBook);
}

function addFromModal(idBook) {
    const books = getFromLS(KEY_LS) || [];
    const isAlready = books.some(el => el === idBook);
    if (!isAlready) {
        books.push(idBook);
        addToLS(KEY_LS, books);
        return;
    }
}

function checkInLS(idBook) {
    const books = getFromLS(KEY_LS) || [];
    const isAlready = books.some(el => el === idBook);
    if (isAlready) {
        removeModalLogic();
        return;
    }
    addModalLogic();
}

function onBackDropModalClose(evt) {
    if (evt.target !== evt.currentTarget) {
        return;
    }
    closeModal();
}

function onEscModalClose(evt) {
    if (evt.key === 'Escape') {
        closeModal();
    }
}

function openModal() {
    document.body.classList.add('stop-scrolling');
    refs.modalBackDrop.classList.remove('modal-is-hidden');
    refs.modalBackDrop.addEventListener('click', onBackDropModalClose);
    window.addEventListener('keydown', onEscModalClose);
}

function closeModal() {
    document.body.classList.remove('stop-scrolling');
    refs.modalBackDrop.classList.add('modal-is-hidden');
    window.removeEventListener('keydown', onEscModalClose);
    refs.modalBackDrop.removeEventListener('click', onBackDropModalClose);
}

async function getBookModal(idBook) {
    try {
        const response = await fetch(
            `https://books-backend.p.goit.global/books/${idBook}`
        );
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const data = await response.json();
        refs.modal.innerHTML = createModalMarkup(data);
        openModal();
        return data;
    } catch (error) {
        console.log(
            `Oops! Something went wrong. You caught the following error: ${error.message}.`
        );
    }
}

function findIdBook(htmlEl) {
    return htmlEl.closest(`li`).dataset.id;
}

function addToLS(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
}

function getFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

function handlerClickAddRemove(evt) {
    if (evt.target.classList.contains('js-btn-add')) {
        addFromModal(idBook);
        removeModalLogic();
        return;
    }
}
function handlerClickRemove(evt) {
    if (evt.target.classList.contains('js-btn-remove')) {
        removeFromLS();
        addModalLogic();
        return;
    }
}

function removeFromLS() {
    const books = getFromLS(KEY_LS);
    books.splice(
        books.findIndex(el => el === idBook),
        1
    );
    localStorage.removeItem(KEY_LS);
    addToLS(KEY_LS, books);
    return;
}

function addModalLogic(evt) {
    refs.modalBtn.addEventListener('click', handlerClickAddRemove);
    refs.modalBtn.removeEventListener('click', handlerClickRemove);
    refs.modalBtn.textContent = 'add to shopping list';
    refs.congrat.classList.add('visually-hidden');
    refs.modalBtn.classList.replace('js-btn-remove', 'js-btn-add');
    return;
}
function removeModalLogic(evt) {
    refs.modalBtn.removeEventListener('click', handlerClickAddRemove);
    refs.modalBtn.addEventListener('click', handlerClickRemove);
    refs.modalBtn.textContent = 'remove from the shopping list';
    refs.congrat.classList.remove('visually-hidden');
    refs.modalBtn.classList.replace('js-btn-add', 'js-btn-remove');
    return;
}

function createModalMarkup(data) {
    const { book_image, buy_links, title, description, author } = data;
    const defaultDescr = 'Sorry! This book not have any description...';
    let markup = `<div class="thumb">
    <img class="book-img" src="${book_image}" alt="${title}" loading="lazy"/>
</div>
<div class="modal-book-info">
    <h3 class="name">${title}</h3>
    <h4 class="author">${author}</h4>
    <p class="descr">${description || defaultDescr}</p>
    <ul class="modal-list">`;

    markup += buy_links
        .map(({ name, url }) => {
            if (name === 'Amazon') {
                return `<li class="modal-item">
            <a
                aria-label="${name}"
                class="modal-buy-link"
                href="${url}"
                rel="noopener noreferrer"
                target="_blank"
            >
            <svg class="modal-buy-svg" width="32px" height="32px">
            <use href="${buyIcons}#icon-amazon"></use>
        </svg>

            </a>
        </li>`;
            }
            if (name === 'Apple Books') {
                return `<li class="modal-item">
            <a
                aria-label="${name}"
                class="modal-buy-link"
                href="${url}"
                rel="noopener noreferrer"
                target="_blank"
            >
            <svg class="modal-buy-svg" width="32px" height="32px">
            <use href="${buyIcons}#icon-apple"></use>
        </svg>

            </a>
        </li>`;
            }
            if (name === 'Bookshop') {
                return `<li class="modal-item">
            <a
                aria-label="${name}"
                class="modal-buy-link"
                href="${url}"
                rel="noopener noreferrer"
                target="_blank"
            >
            <svg class="modal-buy-svg" width="32px" height="32px">
            <use href="${buyIcons}#icon-books"></use>
        </svg>

            </a>
        </li>`;
            }
            markup += `</ul>`;
        })
        .join('');
    return markup;
}

export { getFromLS, addToLS, removeFromLS };
export { KEY_LS };
export { refs };
