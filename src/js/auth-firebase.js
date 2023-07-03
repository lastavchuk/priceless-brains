import { app } from './components/auth-api';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { closeAuthModal } from './auth';
import Notiflix from 'notiflix';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

const sbmtSignIn = document.getElementById('js-auth-sign-in');
const sbmtSignUp = document.getElementById('js-auth-sign-up');
const shoppingNav = document.querySelector('.js-shopping-nav');
const shoppingNavBurger = document.querySelector('.js-shopping-nav-burger');
const modalBtnAddToShopList = document.querySelector('.js-modal-add-shop-list');

const btnSignUp = document.querySelector('.js-sign-up-btn');
const btnLogOut = document.querySelector('.js-log-out-btn');
const btnSignUpBurger = document.querySelector('.js-burger-sign-up-btn');
const btnLogOutBurger = document.querySelector('.burger-log-out-btn');

// Перемикання форм
const btnFormsReplace = document.querySelector('.auth-btn-group');
btnFormsReplace.firstElementChild.addEventListener('click', showSignUpForm);
btnFormsReplace.lastElementChild.addEventListener('click', showSignInForm);

// Слухачі на валідність введеного в поля
sbmtSignUp.elements.name.addEventListener('blur', isValidName);
sbmtSignUp.elements.email.addEventListener('blur', onCheckValidEmail);
sbmtSignUp.elements.password.addEventListener(
    'blur',
    onCheckValidEmailPassword
);

// sbmtSignUp.userName.value = 'User';
// sbmtSignUp.userEmail.value = 'email@test.ua';
// sbmtSignUp.userPassword.value = 'aRtyUio_90';

const newUser = {};
newUser.name = localStorage.getItem('user');
if (!!newUser.name) {
    logInAfther();
}

// Клік по кнопці реєстрації користувача
sbmtSignUp.addEventListener('submit', onClickSubmitSignUp);
// Клік по кнопці Авторизуватись
sbmtSignIn.addEventListener('submit', onClickSubmitSignIn);

checkUserAuth();

// Реєстрація
function onClickSubmitSignUp(e) {
    e.preventDefault();

    newUser.name = e.currentTarget.elements.name.value;
    newUser.email = e.currentTarget.elements.email.value;
    newUser.password = e.currentTarget.elements.password.value;
    if (
        isValidName(newUser.name) &&
        isValidEmail(newUser.email) &&
        isValidPassword(newUser.password)
    ) {
        registerNewUser(newUser);
    }
}

// Вхід
function onClickSubmitSignIn(e) {
    e.preventDefault();

    // newUser.name = e.currentTarget.elements.name.value;
    newUser.email = e.currentTarget.elements.email.value;
    newUser.password = e.currentTarget.elements.password.value;

    if (isValidEmail(newUser.email) && isValidPassword(newUser.password)) {
        logIn(newUser);
    }
}

function registerNewUser(newUser) {
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then(userCredential => {
            newUser.id = userCredential.user.uid;

            saveNewUserToDatabase(newUser);

            Notiflix.Notify.success(
                `Hello ${newUser.name}, your registration was successful`
            );

            localStorage.setItem('user', newUser.name);
            logInAfther();
            closeAuthModal();
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                Notiflix.Notify.failure(
                    'A user with this email address is already registered'
                );
                return;
            }
            if (error.code === 'auth/invalid-email') {
                Notiflix.Notify.failure(
                    'Your Email is invalid, please try again'
                );
                return;
            }
            Notiflix.Notify.failure(`Error code: ${error.code}`);
        });
}

//записуємо у сховище Database облікові дані користувача
function saveNewUserToDatabase(newUser) {
    set(ref(db, 'users/' + newUser.id), {
        username: newUser.name,
        email: newUser.email,
        // profile_picture: imageUrl,
    }).catch(error => {
        Notiflix.Notify.failure(`Error code: ${error.code}`);
    });
}

//перевіряємо, чи є активний user на сторінці
function checkUserAuth() {
    onAuthStateChanged(auth, user => {
        if (user) {
            const userNameRef = ref(db, 'users/' + user.uid);
            onValue(userNameRef, name => {
                newUser.name = name.exportVal().username;
            });
        }
    });
}

function logIn(newUser) {
    signInWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then(userCredential => {
            newUser.id = userCredential.user.uid;

            saveNewUserToDatabase(newUser);

            localStorage.setItem('user', newUser.name);

            logInAfther();
            checkUserAuth();
            closeAuthModal();
        })
        .catch(error => {
            if (error.code === 'auth/invalid-password') {
                Notiflix.Notify.failure(
                    'Your password is invalid, please try again'
                );
                return;
            }
            if (error.code === 'auth/user-not-found') {
                Notiflix.Notify.failure('User not found, please try again');
                return;
            }
            Notiflix.Notify.failure(`Error code: ${error.code}`);
        });
}

function logOut() {
    signOut(auth)
        .then(() => {
            logOutAfther();
        })
        .catch(error => {
            Notiflix.Notify.failure(`Error code: ${error.code}`);
        });
}

function logInAfther() {
    shoppingNav.classList.remove('is-hidden');
    shoppingNavBurger.classList.remove('is-hidden');

    // Кнопка на модалцы додати книгу в шоппінг лист
    if (!!modalBtnAddToShopList) {
        modalBtnAddToShopList.classList.remove('is-hidden');
    }

    btnSignUp.classList.add('is-hidden');
    btnLogOut.classList.remove('is-hidden');
    btnSignUpBurger.classList.add('is-hidden');
    btnLogOutBurger.classList.remove('is-hidden');

    btnLogOut.addEventListener('click', logOut);
    btnLogOutBurger.addEventListener('click', logOut);
}
function logOutAfther() {
    shoppingNav.classList.add('is-hidden');
    shoppingNavBurger.classList.add('is-hidden');

    // Кнопка на модалцы додати книгу в шоппінг лист
    if (!!modalBtnAddToShopList) {
        modalBtnAddToShopList.classList.add('is-hidden');
    }

    btnSignUp.classList.remove('is-hidden');
    btnLogOut.classList.add('is-hidden');
    btnSignUpBurger.classList.remove('is-hidden');
    btnLogOutBurger.classList.add('is-hidden');

    btnLogOut.removeEventListener('click', logOut);
    btnLogOutBurger.removeEventListener('click', logOut);

    localStorage.removeItem('user');
    if (location.href === `${location.origin}/shopping-list.html`) {
        location.href = './';
    }
}

function onCheckValidEmail(e) {
    isValidEmail(e.currentTarget.value);
}
function onCheckValidEmailPassword(e) {
    isValidPassword(e.currentTarget.value);
}
function isValidEmail(email) {
    const reg = /^[a-zA-Z][0-9a-zA-Z._]{2,21}@[a-zA-Z]{2,12}\.[a-zA-Z]{2,12}/;
    if (reg.test(email)) return true;

    Notiflix.Notify.warning('Your Email is invalid, please try again');
    return false;
}

function isValidName(name) {
    if (name.length < 2) {
        Notiflix.Notify.warning('Name should be at least 3 characters');
        return false;
    }

    return true;
}

function isValidPassword(password) {
    if (password.length < 7) {
        Notiflix.Notify.warning('Password should be at least 8 characters');
        return false;
    }
    const reg =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+!@#$%^._*/|&-]).{8,}/;
    if (reg.test(password)) return true;

    Notiflix.Notify.warning(
        'The password must be at least <b>8 characters</b> long and contain:<ul style="padding-left: 15px;list-style-type: circle;"><li><b>at least 1 number;</b></li><li><b>at least one lowercase Latin letter;</b></li><li><b>at least one Latin letter in upper case;</b></li></ul>',
        {
            messageMaxLength: 300,
            plainText: false,
        }
    );
    return false;
}

// Показати форму реєстрації
function showSignUpForm() {
    sbmtSignUp.classList.remove('visually-hidden');
    sbmtSignIn.classList.add('visually-hidden');
}
// Показати форму входу
function showSignInForm() {
    sbmtSignUp.classList.add('visually-hidden');
    sbmtSignIn.classList.remove('visually-hidden');
}
