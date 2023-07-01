import { getFromLS } from './modal';
import { KEY_LS } from './modal';

const bagMobile = document.querySelectorAll('.cart');
const bagContainer = document.querySelectorAll('.js-bag-container');
const bagItem = document.querySelectorAll('.js-bag-item');

window.addEventListener('click', checkNumberinLS);

checkNumberinLS();

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
    for (let i = 0; i < 2; i += 1) {
        bagMobile[i].classList.remove('js-bag');
        bagContainer[i].classList.add('visually-hidden');
        bagItem[i].classList.add('visually-hidden');
    }
}

function addBagCounter() {
    for (let i = 0; i < 2; i += 1) {
        bagMobile[i].classList.add('js-bag');
        bagContainer[i].classList.remove('visually-hidden');
        bagItem[i].classList.remove('visually-hidden');
    }
}

function counterBooks(bookNumbers) {
    return bagItem.forEach(el =>
        bookNumbers < 10
            ? (el.textContent = bookNumbers)
            : (el.textContent = '9+')
    );
}
