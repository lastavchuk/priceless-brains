import amazon from '../images/js-project-png/amazon_x1.png';
import applebooks from '../images/js-project-png/ibooks_x1.png';
import bookshop from '../images/js-project-png/book-shop_x1.png';

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
    if (evt.target === evt.currentTarget) {
        return;
    }
    idBook = findIdBook(evt.target);
    checkInLS(idBook);
    getBookModal(idBook);
    openModal();
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
        refs.modalBtn.textContent = 'remove from the shopping list';
        refs.modalBtn.classList.replace('js-btn-add', 'js-btn-remove');
        return;
    }
    refs.modalBtn.textContent = 'add to shopping list';
    refs.modalBtn.classList.replace('js-btn-remove', 'js-btn-add');
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
    refs.modalBackDrop.classList.remove('modal-is-hidden');
    refs.modalBackDrop.addEventListener('click', onBackDropModalClose);
    window.addEventListener('keydown', onEscModalClose);
}

function closeModal() {
    refs.modal.innerHTML = '';
    refs.modalBackDrop.classList.add('modal-is-hidden');
    refs.congrat.classList.add('visually-hidden');
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
        evt.target.textContent = 'remove from the shopping list';
        refs.congrat.classList.remove('visually-hidden');
        return;
    }
    if (evt.target.classList.contains('js-btn-remove')) {
        const books = getFromLS(KEY_LS);
        books.splice(
            books.findIndex(el => el === idBook),
            1
        );
        localStorage.removeItem(KEY_LS);
        addToLS(KEY_LS, books);
        return;
    }
}

function createModalMarkup(data) {
    const { book_image, buy_links, title, description, author } = data;
    const defaultDescr = 'Sorry! This book not have any description...';
    let markup = `<div class="thumb">
    <img class="book-img" src="${book_image}" alt="${title}" />
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
                class="modal-link"
                href="${url}"
                rel="noopener noreferrer"
                target="_blank"
            >
                <img src="${amazon}" alt="${name}" />
            </a>
        </li>`;
            }
            if (name === 'Apple Books') {
                return `<li class="modal-item">
            <a
                aria-label="${name}"
                class="modal-link"
                href="${url}"
                rel="noopener noreferrer"
                target="_blank"
            >
                <img src="${applebooks}" alt="${name}" />
            </a>
        </li>`;
            }
            if (name === 'Bookshop') {
                return `<li class="modal-item">
            <a
                aria-label="${name}"
                class="modal-link"
                href="${url}"
                rel="noopener noreferrer"
                target="_blank"
            >
                <img src="${bookshop}" alt="${name}" />
            </a>
        </li>`;
            }
            markup += `</ul>`;
        })
        .join('');
    return markup;
}
