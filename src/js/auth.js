const btnAuthClose = document.querySelector('[data-close-auth]');
const authModal = document.querySelector('.auth-backdrop');

// document.body.style.overflow = 'hidden';

btnAuthClose.addEventListener('click', () => {
    authModal.classList.add('is-hidden');
    document.body.style.overflow = '';
});
