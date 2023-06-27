const urlCategory = "https://books-backend.p.goit.global/books/category-list"
fetch(urlCategory)
  .then(response => response.json())
  .then(data => {
    const array = data;
    const markupCategories = array.map(category =>
      `<li class="item" data-name="${category.list_name}">${category.list_name}</li>`
    ).join('');
    categoryList.insertAdjacentHTML('beforeend', markupCategories);
  })
  .catch(error => console.log(error));


const categoryList = document.querySelector('.category-list');
const categoryName = document.querySelector('.category-name');
const bookList = document.querySelector('.book-list');
const itemCat=document.querySelector('.item')

categoryList.addEventListener('click', onCategoryClick);

const URL = 'https://books-backend.p.goit.global/books/category';

function fetchCategory(query) {
  return fetch(`${URL}?category=${query}`).then(res => res.json());
}

function renderCategoryBooks(books) {
  const isAllBooks = categoryName.textContent === 'allBooks';

  if (isAllBooks) {
    const markup = `
      <h1 class="title-book">
        Best Sellers <span class="title-book-span">Books</span>
      </h1>
      <ul class="books-container">
        ${books
          .map(elements => {
            return `
              <li class="books-list"> 
                <h3 class="books-list-title">${elements.list_name}</h3>
                <div class="books-card-container" data-list-id="${elements.list_name}">
                  ${elements.books
                    .map(book => {
                      return `
                        <a href="#" class="books-item-link" rel="noopener noreferrer" data-id='${book._id}'>
                            <img
                              src="${book.book_image}"
                              alt="${book.title}"
                              class="books-img"
                              width="180"
                              height="256"
                              loading="lazy"
                            />

                            <h3 class="books-card-title">${book.title}</h3>
                            <p class="books-card-author">${book.author}</p>
                        </a>
                      `;
                    })
                    .join('')}
                </div>
                <button class="books-btn" type="button" data-id="${elements.list_name}">see more</button>
              </li>
            `;
          })
          .join('')}
      </ul>
    `;

    bookList.innerHTML = markup;
  } else {
    const markup = books
      .map(
        book => `
        <li class="book-item">
          <img class="book-img" src="${book.book_image}" alt="${book.title}" loading="lazy" width="" />
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

function getCategoryBooks(category) {
  fetchCategory(category).then(res => {
    renderCategoryBooks(res);
  });
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
console.log(markup);
  bookList.innerHTML = markup;
}

async function createMarkup() {
  const data = await getBestBooks();
  createGalleryItem(data);
}

createMarkup();