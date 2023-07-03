import buyIcons from '../images/symbol-defs.svg';
import { fetchBook } from './components/api-request';
import Notiflix from 'notiflix';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

if (!localStorage.getItem('user')) {
    location.href = './';
}

const navHome = document.querySelector('.js-header-home-btn');
const navShop = document.querySelector('.js-header-shop-btn');
const navHomeBurger = document.querySelector('.js-burger-home-btn');
const navShopBurger = document.querySelector('.js-burger-shop-btn');

navHome.classList.remove('current');
navHomeBurger.classList.remove('current');
navShop.classList.add('current');
navShopBurger.classList.add('current');

const emptyPage = document.querySelector('.emptyPage__container');
const cardsListShop = document.querySelector('.cards');
const listBookShop = document.querySelector('.book__wrapper');
let bookLocalStorage = JSON.parse(localStorage.getItem('books'));

cardShoppingList(bookLocalStorage);

async function getCards(id) {
    try {
        return await fetchBook(id);
    } catch (error) {
        Notiflix.Notify.failure(
            `Oops! Something went wrong while fetching book with id ${id}. Error: ${error}`
        );
    }
}
async function cardShoppingList(bookLocalStorage) {
    if (bookLocalStorage.length) {
        emptyPage.classList.add('visually-hidden');
        listBookShop.classList.remove('visually-hidden');
    }

    try {
        // const bookPromises = bookLocalStorage.map(getCards(id));
        const bookPromises = bookLocalStorage.map(id => getCards(id));
        const books = await Promise.all(bookPromises);

        const markup = books
            .map(res => {
                return `<li class="book__card" data-id=${res._id}>
            <div class = "book__img-wrapper">
                <img
                    class="book__card-img"
                    src="${res.book_image}"
                    alt="${res.title}"
                />
                </div>
            <div class="book__card-info">
                <div class="flex">
                    <div class="book__book__card-info-nameGenre">
                        <h3 class="book__card-info-name">${res.title}</h3>
                        <p class="book__card-info-genre">${res.list_name}</p>
                    </div>
                      </div>
                    <button class="book__card-delBtn" type="button">
                        <svg class="trash-svg" width="18" height="18">
                            <use
                                href="${buyIcons}#icon-trash"
                            ></use>
                        </svg>
                    </button>
              
                <p class="book__card-info-desc">
                    ${res.description || 'Sorry! This book has no description'}
                </p>
                <div class="book__card-author-platforms-wrapper">
                    <p class="book__card-author">${res.author}</p>
                    <ul class="book__card-platforms-wrapper">
<li><a class="book__card-platforms-a amazon" href="${res.buy_links[0].url}"
                            ><svg class="modal-buy-svg" width="20px" height="20px">
            <use href="${buyIcons}#icon-amazon"></use>
        </svg></a></li>
                        <li><a href="${res.buy_links[1].url}"
                            ><svg class="modal-buy-svg" width="20px" height="20px">
            <use href="${buyIcons}#icon-apple"></use>
        </svg></a></li>
                        <li><a href="${res.buy_links[4].url}"
                            ><svg class="modal-buy-svg" width="20px" height="20px">
            <use href="${buyIcons}#icon-books"></use>
        </svg>
                        </a></li>
                    </ul>
                </div>
            </div>
        </li>`;
            })
            .join('');

        cardsListShop.insertAdjacentHTML('beforeend', markup);
        cardsListShop.addEventListener('click', basketDelete);
    } catch (error) {
        Notiflix.Notify.failure(
            `Oops! Something went wrong. You caught the following error: ${error.message}.`
        );
    }
}

function basketDelete(e) {
    if (e.target.closest('.book__card-delBtn')) {
        const listItem = e.target.closest('li');
        listItem.remove();

        const bookLocalStorage =
            JSON.parse(localStorage.getItem('books')) || [];
        const newBooks = bookLocalStorage.filter(
            id => id !== listItem.dataset.id
        );
        if (!newBooks.length) {
            emptyPage.classList.remove('visually-hidden');
            listBookShop.classList.add('visually-hidden');
            cardsListShop.removeEventListener('click', basketDelete);
        }
        localStorage.setItem('books', JSON.stringify(newBooks));
    }
}
function trimText(text, count) {
    if (text.length > count) {
        return text.slice(0, text.lastIndexOf(' ', count)) + '...';
    }
    return text;
}
