// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCuaK5xv9F7YN9a7Mq5X89boDmnQH3qESA",
    authDomain: "movieapp-65e6f.firebaseapp.com",
    projectId: "movieapp-65e6f",
    storageBucket: "movieapp-65e6f.firebasestorage.app",
    messagingSenderId: "479833378037",
    appId: "1:479833378037:web:a6916739e372a531ef49bc",
    measurementId: "G-31P3027F2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
