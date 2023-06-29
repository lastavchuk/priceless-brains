import Storage from '#';

const ref = {
  homeBtnEl: document.querySelector('.js-header-home-btn'),
  shopBtnEl: document.querySelector('.js-header-shop-btn'),
  burgerHomeBtnEl: document.querySelector('.js-burger-home-btn'),
  burgerShopBtnEl: document.querySelector('.js-burger-shop-btn'),
  signUpBtn: document.querySelector('.js-sign-up-btn'),
  logOutBtn: document.querySelector('.log-out-btn'),
  authModal: document.querySelector('.#'),
  authModalCloseBtn: document.querySelector('.btn-close'),
};

ref.signUpBtn.addEventListener('click', onSignUpBtnClick);
ref.authModalCloseBtn.addEventListener('click', onAuthModalCloseBtnClick);

const pathname = window.location.pathname;
const currentPath = pathname.split('/').splice(-1).join(' ').trim();

if (currentPath === 'shopping-list.html') {
  ref.homeBtnEl.classList.toggle('current');
  ref.shopBtnEl.classList.toggle('current');
  ref.burgerHomeBtnEl.classList.toggle('current');
  ref.burgerShopBtnEl.classList.toggle('current');
}

function onSignUpBtnClick() {
  const hasUserId = Storage.load('userData');
  if (!hasUserId) {
    ref.authModal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
  } else {
    ref.logOutBtn.classList.toggle('is-hidden');
  }
}

function onAuthModalCloseBtnClick() {
  ref.authModal.classList.add('is-hidden');
  document.body.style.overflow = 'auto';
}

let isLogOutBtnVisible = false;

ref.signUpBtn.addEventListener('click', event => {
  event.stopPropagation();

  const logOutBtn = ref.logOutBtn;
  const arrowDownElement = document.querySelector('.header-arrow-down');

  if (!isLogOutBtnVisible) {
    logOutBtn.classList.remove('is-hidden');
    arrowDownElement.classList.add('active-sign-up');
    isLogOutBtnVisible = true;
  } else {
    logOutBtn.classList.add('is-hidden');
    arrowDownElement.classList.remove('active-sign-up');
    isLogOutBtnVisible = false;
  }
});

window.addEventListener('click', () => {
  ref.logOutBtn.classList.add('is-hidden');
  document
    .querySelector('.header-arrow-down')
    .classList.remove('active-sign-up');
  isLogOutBtnVisible = false;
});
