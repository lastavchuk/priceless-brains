import buyIcons from '../images/symbol-defs.svg';
const emptyPage = document.querySelector('.emptyPage__container')
const cardsListShop = document.querySelector('.cards');
const listBookShop = document.querySelector('.book__wrapper')
let bookLocalStorage = JSON.parse(localStorage.getItem('books'));

const URL = 'https://books-backend.p.goit.global/books/';

cardShoppingList(bookLocalStorage)
async function fetchCards(id) {
  try {
    const response = await fetch(`${URL}${id}`);
    const book = await response.json();
    return book;
  } catch (error) {
    console.log(`Oops! Something went wrong while fetching book with id ${id}. Error: ${error}`);
    throw error;
  }
}

async function cardShoppingList(bookLocalStorage) {
    if (bookLocalStorage.length) {
        emptyPage.classList.add('visually-hidden')
        listBookShop.classList.remove('visually-hidden');
    }
    
  try {
    const bookPromises = bookLocalStorage.map(id => fetchCards(id));
    const books = await Promise.all(bookPromises);

    const markup = books
        .map(res => {

        return `<li class="book__card" data-id=${res._id}>
            
                <img
                    class="book__card-img"
                    src="${res.book_image}"
                    alt="${res.title}"
                />
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
                    ${res.description}
                </p>
                <div class="book__card-author-platforms-wrapper">
                    <p class="book__card-author">${res.author}</p>
                    <ul class="book__card-platforms-wrapper">
<li><a class="book__card-platforms-a amazon" href="${res.buy_links[0].url}"
                            ><svg class="modal-buy-svg" width="16px" height="16px">
            <use href="${buyIcons}#icon-amazon"></use>
        </svg></a></li>
                        <li><a href="${res.buy_links[1].url}"
                            ><svg class="modal-buy-svg" width="16px" height="16px">
            <use href="${buyIcons}#icon-apple"></use>
        </svg></a></li>
                        <li><a href="${res.buy_links[4].url}"
                            ><svg class="modal-buy-svg" width="16px" height="16px">
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
      cardsListShop.addEventListener('click', basketDelete)
  } catch (error) {
    console.log(`Oops! Something went wrong. You caught the following error: ${error.message}.`);
  }
}

function basketDelete(e) {
  if (e.target.closest('.book__card-delBtn')) {
    const listItem = e.target.closest('li');
    listItem.remove();
    
    const bookLocalStorage = JSON.parse(localStorage.getItem('books'));
    const newBooks = bookLocalStorage.filter(id => id !== listItem.dataset.id);
    localStorage.setItem('books', JSON.stringify(newBooks));
  }
}
