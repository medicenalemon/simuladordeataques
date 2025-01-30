// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCah0_VAXUD1-f9vhNS_16YTV32uicoloA",
  authDomain: "simuladordeataques.firebaseapp.com",
  projectId: "simuladordeataques",
  storageBucket: "simuladordeataques.firebasestorage.app",
  messagingSenderId: "710508494106",
  appId: "1:710508494106:web:52f0ccd5538fd6e1b6c0a3",
  measurementId: "G-1G8V8LGNEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);