import { loadingPage, loadPage } from './components/loader';
import {
    fetchAllCategory,
    fetchCategory,
    fetchBestBooks,
} from './components/api-request';
import Notiflix from 'notiflix';

const loader = document.querySelector('.js-loader');

loadingPage(loader);
getAllCategory();

async function getAllCategory() {
    await fetchAllCategory()
        .then(data => {
            const markupCategories = data
                .filter(
                    (category, index, self) =>
                        self.findIndex(
                            el => el.list_name === category.list_name
                        ) === index
                )
                .map(
                    category =>
                        `<li class="item" data-name="${category.list_name}">${category.list_name}</li>`
                )
                .sort()
                .join('');
            categoryList.insertAdjacentHTML('beforeend', markupCategories);
        })
        .catch(error => Notiflix.Notify.failure(error));
}

const categoryList = document.querySelector('.category-list');
const categoryName = document.querySelector('.category-name');
const bookList = document.querySelector('.book-list');

categoryList.addEventListener('click', onCategoryClick);
createMarkup();
bookList.addEventListener('click', onCategoryClick);

function renderCategoryBooks(books) {
    const isAllBooks = categoryName.textContent === 'allBooks';

    if (isAllBooks) {
        createGalleryItem(books);
        loadingPage(loader);
    } else {
        const markup = books
            .map(book => {
                return `
          <li class="category-book-card" data-id="${book._id}">
          <div class="image-overlay"> 
            <img class="book-image" src="${book.book_image}" alt="${
                    book.title
                }" loading="lazy" width="" />
            <div class="pop-up-window">
                <p class="pop-up-text">quick view</p>
              </div></div>
            <h3 class="book-name">${trimText(book.title, 17)}</h3>
            <p class="author-book">${trimText(book.author, 21)}</p>
          </li>
        `;
            })
            .join('');
        bookList.innerHTML = markup;
    }
}

function onCategoryClick(e) {
    const category = e.target.dataset.name;
    if (!category) return;
    const activeCategory = categoryList.querySelector('.category-active');
    const clickCategory = categoryList.querySelector(
        `[data-name='${category}']`
    );

    if (activeCategory) {
        activeCategory.classList.remove('category-active');
    }

    // e.target.classList.add('category-active');
    clickCategory.classList.add('category-active');
    if (category === 'allBooks') {
        createMarkup();
        categoryName.innerHTML = parseTitle('Best Seller Books');
        return;
    }

    getCategoryBooks(category);
    categoryName.innerHTML = parseTitle(category);
}

function parseTitle(title) {
    const words = title.split(' ');
    const lastWord = words.pop();
    const parsedTitle =
        words.join(' ') + ' <span class="title-blue">' + lastWord + '</span>';
    return parsedTitle;
}

async function getCategoryBooks(category) {
    try {
        renderCategoryBooks(await fetchCategory(category));
    } catch (error) {
        Notiflix.Notify.failure(
            `Oops! Something went wrong. You caught the following error: ${error.message}.`
        );
    }
}

async function getBestBooks() {
    try {
        return await fetchBestBooks();
    } catch (error) {
        Notiflix.Notify.failure(
            `Oops! Something went wrong. You caught the following error: ${error.message}.`
        );
    }
}

async function createMarkup() {
    const data = await getBestBooks();
    createGalleryItem(data);
    loadPage(loader);
}

function createGalleryItem(data) {
    const markup = data
        .map(element => {
            const booksMarkup = element.books
                .map(el => {
                    return `
              <li class="book-card" data-id="${el._id}">
              <div class="image-overlay"> 
              <img class="book-image" src="${el.book_image}" alt="${
                        el.title
                    }" loading="lazy" />
                <div class="pop-up-window">
                  <p class="pop-up-text">quick view</p>
                </div>
              </div> 
                <h3 class="book-name">${trimText(el.title, 21)}</h3>
                <p class="book-author">${el.author}</p>
              </li>
            `;
                })
                .join('');

            return `
        <li class="books-allcat">
          <h2 class="category-item">${element.list_name}</h2>
          <ul class="categories">
            ${booksMarkup}
          </ul>
          <button class="see-more-btn" data-name="${element.list_name}">See More</button>
        </li>
        
      `;
        })
        .join('');

    bookList.innerHTML = markup;
}

function trimText(text, count) {
    if (text.length > count) {
        return text.slice(0, text.lastIndexOf(' ', count)) + '...';
    }
    return text;
}
