const urlCategory = "https://books-backend.p.goit.global/books/category-list";
fetch(urlCategory)
  .then(response => response.json())
  .then(data => {
    const array = data;
    const markupCategories = array
      .map(
        category =>
          `<li class="item" data-name="${category.list_name}">${category.list_name}</li>`
      )
      .join('');
    categoryList.insertAdjacentHTML('beforeend', markupCategories);
  })
  .catch(error => console.log(error));

const categoryList = document.querySelector('.category-list');
const categoryName = document.querySelector('.category-name');
const bookList = document.querySelector('.book-list');

categoryList.addEventListener('click', onCategoryClick);

const URL = 'https://books-backend.p.goit.global/books/category';

function fetchCategory(query) {
  return fetch(`${URL}?category=${query}`).then(res => res.json());
}

function getBooksPerRow() {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    return 5;
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    return 3;
  } else {
    return 1;
  }
}

function renderCategoryBooks(books) {
  const isAllBooks = categoryName.textContent === "allBooks";
  getBooksPerRow();

  if (isAllBooks) {
    createGalleryItem(books)
  } else {
    const markup = books
      .map(
        book => `
          <li class="book-card">
            <img class="book-image" src="${book.book_image}" alt="${book.title}" loading="lazy" width="" />
            <h3 class="book-name">${book.title}</h3>
            <p class="book-author">${book.author}</p>
          </li>
        `
      )
      .join('');
    bookList.innerHTML = markup;
  }
}

function onCategoryClick(e) {
  const category = e.target.dataset.name;

  if (!category) return;

  if (category === 'allBooks') {
    bookList.innerHTML = '';
    categoryName.textContent = '';
    return;
  }

  getCategoryBooks(category);
  categoryName.textContent = category;
}

async function getCategoryBooks(category) {
  try {
    const response = await fetchCategory(category);
    renderCategoryBooks(response);
  } catch (error) {
    console.log(`Oops! Something went wrong. You caught the following error: ${error.message}.`);
  }
}

async function getBestBooks() {
  try {
    const response = await fetch('https://books-backend.p.goit.global/books/top-books');
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Oops! Something went wrong. You caught the following error: ${error.message}.`);
  }
}

async function createMarkup() {
  const data = await getBestBooks();
  createGalleryItem(data);
}

function createGalleryItem(data) {
  const markup = data
    .map(
      element => `
        <li>
          <h2 class="category-item">${element.list_name}</h2>
          <img class="book-img" src="${element.books[0].book_image}" alt="${element.books[0].title}" loading="lazy" width="" />
          <h3 class="book-name">${element.books[0].title}</h3>
          <p class="book-author">${element.books[0].author}</p>
          <button class="see-more-btn">See More</button>
        </li>
      `
    )
    .join('');
  bookList.innerHTML = markup;
}


