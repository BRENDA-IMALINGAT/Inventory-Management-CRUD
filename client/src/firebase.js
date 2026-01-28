// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDobMgYuEWFplmjVLptFY7q-aEr4uIyc1g",
    authDomain: "crud-df8ea.firebaseapp.com",
    projectId: "crud-df8ea",
    storageBucket: "crud-df8ea.firebasestorage.app",
    messagingSenderId: "509492609418",
    appId: "1:509492609418:web:c4953f9f60afdd12634873",
    measurementId: "G-2NLXM6EKCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
