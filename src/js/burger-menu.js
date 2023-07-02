const modal = document.getElementById('mobile-menu-modal');
const openButton = document.getElementById('open-menu-burger');
const closeButton = document.getElementById('close-mobile-modal-btn');
const burgerSignUpBtn = document.querySelector('.js-burger-sign-up-btn');
// const authModal = document.querySelector('.auth-backdrop');

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
// burgerSignUpBtn.addEventListener('click', openAuthModal);

function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    openButton.classList.add('hidden');
    closeButton.classList.remove('hidden');
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
    closeButton.classList.add('hidden');
    openButton.classList.remove('hidden');
}

// function openAuthModal() {
//     authModal.classList.remove('is-hidden');
//     burgerSignUpBtn.removeEventListener('click', openAuthModal);
// }

window.addEventListener('DOMContentLoaded', function () {
    closeButton.classList.add('hidden');
});

// function onSignUpBtnClick() {
//   const hasUserId = Storage.load('userId');
//   if (!hasUserId) {
//     ref.authModal.classList.remove('is-hidden');
//     document.body.style.overflow = 'hidden';
//   } else {
//     ref.logOutBtn.classList.toggle('is-hidden');
//   }
// }
