const urlCategory = "https://books-backend.p.goit.global/books/category-list";
fetch(urlCategory)
  .then(response => response.json())
  .then(data => {
 
    const markupCategories = data.filter((category, index, self) => self.findIndex(el => el.list_name === category.list_name) === index)
  .map(
    category => `<li class="item" data-name="${category.list_name}">${category.list_name}</li>`
  )
  .sort()
  .join('');
    categoryList.insertAdjacentHTML('beforeend', markupCategories);
  })
  .catch(error => console.log(error));

const categoryList = document.querySelector('.category-list');
const categoryName = document.querySelector('.category-name');
const bookList = document.querySelector('.book-list');

categoryList.addEventListener('click', onCategoryClick);
createMarkup()
const URL = 'https://books-backend.p.goit.global/books/category';

function fetchCategory(query) {
  return fetch(`${URL}?category=${query}`).then(res => res.json());
}

function renderCategoryBooks(books) {
  const isAllBooks = categoryName.textContent === "allBooks";

  if (isAllBooks) {
    createGalleryItem(books)
  } else {
    const markup = books
      .map(
        book => {
          let sliceTitle = book.title;
          if (book.title.length > 20) {
            const lastSpaceIndex = book.title.lastIndexOf(' ', 20);
            sliceTitle = book.title.slice(0, lastSpaceIndex) + '...';
          }
          let sliceAuthor = book.author;
      if (book.author.length > 21) {
        const lastSpaceIndex = book.author.lastIndexOf(' ', 21);
        sliceAuthor = book.author.slice(0, lastSpaceIndex) + '...';
          }
          return `
          <li class="book-card" data-id="${book._id}">
            <img class="book-img" src="${book.book_image}" alt="${book.title}" loading="lazy" width="" />
            <h3 class="book-name">${sliceTitle}</h3>
            <p class="book-author">${sliceAuthor}</p>
          </li>
        `
        })
      .join('');
    bookList.innerHTML = markup;
  }
}

function onCategoryClick(e) {
  const category = e.target.dataset.name;

  if (!category) return;
const activeCategory = categoryList.querySelector('.category-active');
  if (activeCategory) {
    activeCategory.classList.remove('category-active');
  }

  // Добавить стиль .category-active к выбранному элементу
  e.target.classList.add('category-active');
  if (category === 'allBooks') {
  createMarkup()
    categoryName.textContent = 'Best Seller Books';
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
    .map((element) => {
      const booksMarkup = element.books
        .map((el) => {
          let sliceTitle = el.title;
          if (el.title.length > 21) {
            const lastSpaceIndex = el.title.lastIndexOf(' ', 21);
            sliceTitle = el.title.slice(0, lastSpaceIndex) + '...';
          }
          return `
            <li class="book-card" data-id="${el._id}">
              <img class="book-image" src="${el.book_image}" alt="${el.title}" loading="lazy" />
              <h3 class="book-name">${sliceTitle}</h3>
              <p class="author-book">${el.author}</p>
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
        </li>
        <button class="see-more-btn">See More</button>
      `;
    })
    .join('');

  bookList.innerHTML = markup;
}

