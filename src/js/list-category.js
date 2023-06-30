import { loadingPage, loadPage } from './components/loader';

const loader = document.querySelector('.js-loader');

loadingPage(loader);
getAllCategory();

async function getAllCategory() {
    const urlCategory =
        'https://books-backend.p.goit.global/books/category-list';
    await fetch(urlCategory)
        .then(response => response.json())
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
        .catch(error => console.log(error));
}

const categoryList = document.querySelector('.category-list');
const categoryName = document.querySelector('.category-name');
const bookList = document.querySelector('.book-list');

categoryList.addEventListener('click', onCategoryClick);
createMarkup();
bookList.addEventListener('click', onCategoryClick);

const URL = 'https://books-backend.p.goit.global/books/category';

async function fetchCategory(query) {
    return await fetch(`${URL}?category=${query}`).then(res => res.json());
}

function renderCategoryBooks(books) {
    const isAllBooks = categoryName.textContent === 'allBooks';

    if (isAllBooks) {
        createGalleryItem(books);
    } else {
        const markup = books
            .map(book => {
                let sliceTitle = book.title;
                if (book.title.length > 18) {
                    const lastSpaceIndex = book.title.lastIndexOf(' ', 18);
                    sliceTitle = book.title.slice(0, lastSpaceIndex) + '...';
                }
                let sliceAuthor = book.author;
                if (book.author.length > 21) {
                    const lastSpaceIndex = book.author.lastIndexOf(' ', 21);
                    sliceAuthor = book.author.slice(0, lastSpaceIndex) + '...';
                }
                return `
          <li class="category-book-card" data-id="${book._id}">
          <div class="image-overlay"> 
            <img class="book-image" src="${book.book_image}" alt="${book.title}" loading="lazy" width="" />
            <div class="pop-up-window">
                <p class="pop-up-text">quick view</p>
              </div></div>
            <h3 class="book-name">${sliceTitle}</h3>
            <p class="author-book">${sliceAuthor}</p>
          </li>
        `;
            })
            .join('');
        bookList.innerHTML = markup;
    }
}

function onCategoryClick(e) {
    const category = e.target.dataset.name;
    console.log(category);
    if (!category) return;
    const activeCategory = categoryList.querySelector('.category-active');
    const clickCategory = categoryList.querySelector(
        `[data-name='${category}']`
    );

    if (activeCategory) {
        activeCategory.classList.remove('category-active');
    }
    e.target.classList.add('category-active');
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
        const response = await fetchCategory(category);
        renderCategoryBooks(response);
    } catch (error) {
        console.log(
            `Oops! Something went wrong. You caught the following error: ${error.message}.`
        );
    }
}

async function getBestBooks() {
    try {
        const response = await fetch(
            'https://books-backend.p.goit.global/books/top-books'
        );
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(
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
                    let sliceTitle = el.title;
                    if (el.title.length > 21) {
                        const lastSpaceIndex = el.title.lastIndexOf(' ', 21);
                        sliceTitle = el.title.slice(0, lastSpaceIndex) + '...';
                    }
                    return `
              <li class="book-card" data-id="${el._id}">
              <div class="image-overlay"> 
              <img class="book-image" src="${el.book_image}" alt="${el.title}" loading="lazy" />
                <div class="pop-up-window">
                  <p class="pop-up-text">quick view</p>
                </div>
              </div> 
                <h3 class="book-name">${sliceTitle}</h3>
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
