import { initializeApp, getApps, getApp } from "firebase/app"; 
import { getAuth, initializeAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native"; 
const firebaseConfig = {
    apiKey: "AIzaSyCrLffHzFJ-J7WhUNhj8ACFE8wxTnjJezs", 
    authDomain: "nutrition-manager-c79f0.firebaseapp.com", 
    projectId: "nutrition-manager-c79f0", 
    storageBucket: "nutrition-manager-c79f0.firebasestorage.app", 
    messagingSenderId: "984369316515", 
    appId: "1:984369316515:web:97ca736b3d36348d3d3516", 
    measurementId: "G-X4KKR3G72M" 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

