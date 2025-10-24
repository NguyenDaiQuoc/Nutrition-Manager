import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC1EXAMPLE",
    authDomain: "nutrition-manager.firebaseapp.com",
    projectId: "nutrition-manager",
    storageBucket: "nutrition-manager.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdefg123456",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
