import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseKey } from "./provider/baseURLs";

const firebaseConfig = {
    apiKey: firebaseKey,
    authDomain: "movieapp-65e6f.firebaseapp.com",
    projectId: "movieapp-65e6f",
    storageBucket: "movieapp-65e6f.firebasestorage.app",
    messagingSenderId: "479833378037",
    appId: "1:479833378037:web:a6916739e372a531ef49bc",
    measurementId: "G-31P3027F2C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();