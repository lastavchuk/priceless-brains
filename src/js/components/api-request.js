const URL_BEST_BOOKS = 'https://books-backend.p.goit.global/books/top-books';
const URL_ALL_CATEGORY =
    'https://books-backend.p.goit.global/books/category-list';
const URL_CATEGORY = 'https://books-backend.p.goit.global/books/category';
const URL_BOOK = 'https://books-backend.p.goit.global/books/';

async function fetchAllCategory() {
    const resp = await fetch(URL_ALL_CATEGORY);
    if (!resp.ok) {
        showError(resp);
    }
    return resp.json();
}

async function fetchCategory(query) {
    const resp = await fetch(`${URL_CATEGORY}?category=${query}`);
    if (!resp.ok) {
        showError(resp);
    }
    return await resp.json();
}

async function fetchBestBooks() {
    const resp = await fetch(URL_BEST_BOOKS);
    if (!resp.ok) {
        showError(resp);
    }
    return await resp.json();
}

async function fetchBook(id) {
    const resp = await fetch(`${URL_BOOK}${id}`);
    if (!resp.ok) {
        showError(resp);
    }
    return await resp.json();
}

function showError(resp) {
    throw new Error(
        `Error! Status: ${resp.status}. Message: ${resp.statusText}`
    );
}

export { fetchAllCategory, fetchCategory, fetchBestBooks, fetchBook };
