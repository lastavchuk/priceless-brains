import { getFromLS, addToLS, removeFromLS } from './modal';
import { KEY_LS } from './modal';
import { refs } from './modal';

const bag = document.querySelector('.cart');
const bagContainer = doc.querySelector('.js-bag-container');
const bagItem = doc.querySelector('.js-bag-item');

window.addEventListener('click', checkNumberinLS);

function checkNumberinLS() {
    const books = getFromLS(KEY_LS) || [];
    const bookNumbers = books.length;
    if (!bookNumbers) {
        bag.classList.remove('js-bag');
        return;
    }
    bag.classList.add('js-bag');
    bag.classList.remove('js-bag-container');
    console.log(bookNumbers);
    return;
}
