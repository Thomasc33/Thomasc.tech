// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6AyVwoofHgqDr8GMwfLD7iNu3qeXzFCc",
    authDomain: "thomasc.firebaseapp.com",
    projectId: "thomasc",
    storageBucket: "thomasc.appspot.com",
    messagingSenderId: "953945489671",
    appId: "1:953945489671:web:063976ae5da0abc20a05a2",
    measurementId: "G-1QBX6B20XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app