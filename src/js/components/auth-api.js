import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAYZ4KaHAQFlOBxxSAy6WH1hxOFhKbK5fY',
    authDomain: 'priceless-brains.firebaseapp.com',
    projectId: 'priceless-brains',
    storageBucket: 'priceless-brains.appspot.com',
    messagingSenderId: '842519757633',
    appId: '1:842519757633:web:d56f79a5d2f91e3c52d7c0',
    databaseURL: 'https://priceless-brains-default-rtdb.firebaseio.com',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
