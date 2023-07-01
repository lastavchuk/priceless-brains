import { getFromLS } from './modal';
import { KEY_LS } from './modal';

const bag = document.querySelector('.cart');
const bagContainer = document.querySelector('.js-bag-container');
const bagItem = document.querySelector('.js-bag-item');

window.addEventListener('click', checkNumberinLS);

function checkNumberinLS() {
    const books = getFromLS(KEY_LS) || [];
    const bookNumbers = books.length;
    if (!bookNumbers) {
        hideBagCounter();
        return;
    }
    addBagCounter();
    counterBooks(bookNumbers);
    return;
}

function hideBagCounter() {
    bag.classList.remove('js-bag');
    bagContainer.classList.add('visually-hidden');
    bagItem.classList.add('visually-hidden');
}

function addBagCounter() {
    bag.classList.add('js-bag');
    bagContainer.classList.remove('visually-hidden');
    bagItem.classList.remove('visually-hidden');
}

function counterBooks(bookNumbers) {
    return bookNumbers < 10
        ? (bagItem.textContent = bookNumbers)
        : (bagItem.textContent = '9+');
}
