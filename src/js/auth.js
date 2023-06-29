const authBtnClose = document.querySelector('[data-close-auth]');
const authBackdrop = document.querySelector('.auth-backdrop');
const btnMenu = document.querySelector('.js-sign-up-btn');

btnMenu.addEventListener('click', onAuthModalOpen);

// Вікдрити модалку по кліку в хедері на SignUp
function onAuthModalOpen() {
    openAuthModal();

    // Закрити модалку при натисканні клавіші ESC
    document.addEventListener('keyup', keyPressEsc);
    // Закрити модалку по кліку по іконці хрестика
    authBtnClose.addEventListener('click', clickBtn);
    // Закрити модалку по кліку на backdrop
    authBackdrop.addEventListener('click', clickBackdrop);
}
// Закрити модалку при натисканні клавіші ESC
function keyPressEsc(e) {
    if (e.code === 'Escape') {
        closeAuthModal();
    }
}
// Закрити модалку по кліку по іконці хрестика
function clickBtn() {
    closeAuthModal();
}
// Закрити модалку по кліку на backdrop
function clickBackdrop(e) {
    if (e.target === e.currentTarget) closeAuthModal();
}

function openAuthModal() {
    // https://habr.com/ru/articles/459876/
    authBackdrop.classList.remove('is-hidden');

    document.body.style.top = `${window.scrollY}px`;
    document.body.style.position = 'fixed';
}
function closeAuthModal() {
    // document.body.style.scrollBehavior = 'auto';
    window.scrollTo(0, parseInt(document.body.style.top || '0'));

    document.body.style.position = '';
    document.body.style.top = '';
    // document.body.style.scrollBehavior = '';

    authBackdrop.classList.add('is-hidden');

    document.removeEventListener('keyup', keyPressEsc);
    authBtnClose.removeEventListener('click', clickBtn);
    authBackdrop.removeEventListener('click', clickBackdrop);
}
