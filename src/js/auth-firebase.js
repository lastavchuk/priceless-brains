import { app } from './components/auth-api';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import Notiflix from 'notiflix';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

const sbmtSignIn = document.getElementById('js-auth-sign-in');
const authBackdrop = document.querySelector('.js-auth-backdrop');
const shoppingNav = document.querySelector('.js-shopping-nav');
const shoppingNavBurger = document.querySelector('.js-shopping-nav-burger');
const modalBtnAddToShopList = document.querySelector('.js-modal-add-shop-list');

const btnSignUp = document.querySelector('.js-sign-up-btn');
const btnLogOut = document.querySelector('.js-log-out-btn');
const btnSignUpBurger = document.querySelector('.js-burger-sign-up-btn');
const btnLogOutBurger = document.querySelector('.burger-log-out-btn');

sbmtSignIn.elements.name.addEventListener('blur', isValidName);
sbmtSignIn.elements.email.addEventListener('blur', onCheckValidEmail);
sbmtSignIn.elements.password.addEventListener(
    'blur',
    onCheckValidEmailPassword
);

sbmtSignIn.userName.value = 'User';
sbmtSignIn.userEmail.value = 'email@test.ua';
sbmtSignIn.userPassword.value = 'aRtyUio_90';

const newUser = {};

// Клік по кнопці реєстрації користувача
sbmtSignIn.addEventListener('submit', onClickSubmitSignIn);
// Клік по кнопці Авторизуватись
// Клік по кнопці Вийти

function onClickSubmitSignIn(e) {
    e.preventDefault();

    newUser.name = e.currentTarget.elements.name.value;
    newUser.email = e.currentTarget.elements.email.value;
    newUser.password = e.currentTarget.elements.password.value;
    // const {
    //     elements: { name, email, pass },
    // } = e.currentTarget;
    if (
        isValidName(newUser.name) &&
        isValidEmail(newUser.email) &&
        isValidPassword(newUser.password)
    ) {
        registerNewUser(newUser);
    }
}

function registerNewUser(user) {
    createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(userCredential => {
            user.id = userCredential.user.uid;
            saveNewUserToDatabase(user);

            Notiflix.Notify.success(
                `Hello ${user.name}, your registration was successful`
            );

            authBackdrop.classList.add('is-hidden');
            shoppingNav.classList.remove('is-hidden');
            shoppingNavBurger.classList.remove('is-hidden');
            modalBtnAddToShopList.classList.remove('is-hidden');

            btnSignUp.classList.add('is-hidden');
            btnLogOut.classList.remove('is-hidden');
            btnSignUpBurger.classList.add('is-hidden');
            btnLogOutBurger.classList.remove('is-hidden');
            btnLogOut.addEventListener('click', logOut);
            btnLogOutBurger.addEventListener('click', logOut);
        })
        .catch(error => {
            if (error.code === 'auth/email-already-exists') {
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
function saveNewUserToDatabase(user) {
    set(ref(db, 'users/' + user.id), {
        username: user.name,
        email: user.email,
        // profile_picture: imageUrl,
    }).catch(error => {
        Notiflix.Notify.failure(`Error code: ${error.code}`);
    });
}

//перевіряємо, чи єактивний User на сторінці
function checkUserAuth() {
    onAuthStateChanged(auth, user => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            // const uid = user.uid;

            //витягуємо із сховища ID поточного користувача та записуємо його ім'я в userBarBtnText
            /*
const userId = auth.currentUser.uid;
return onValue(ref(db, '/users/' + userId), (snapshot) => {
  const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            */
            const userNameRef = ref(db, 'users/' + user.uid);
            onValue(userNameRef, name => {
                const currentUserName = name.exportVal();

                // refs.userBarBtnText.innerHTML = currentUserName.username;
                // refs.userMobileBarBtnText.innerHTML = currentUserName.username;
            });
        }
    });
}

function logIn() {
    signInWithEmailAndPassword(auth, user.email, user.password)
        .then(userCredential => {
            Notiflix.Notify.success(`Hello ${user}, glad to see you again`);
            // const user = userCredential.user;
        })
        .catch(error => {
            if (error.code === 'auth/invalid-password') {
                Notiflix.Notify.failure(
                    'Your password is invalid, please try again'
                );
            }
            if (error.code === 'auth/user-not-found') {
                Notiflix.Notify.failure('User not found, please try again');
            }
            Notiflix.Notify.failure(`Error code: ${error.code}`);
        });
}

function logOut() {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('user');
        })
        .catch(error => {
            Notiflix.Notify.failure(`Error code: ${error.code}`);
        });
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
