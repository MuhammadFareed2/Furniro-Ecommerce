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
  apiKey: "AIzaSyC2LWfD0g8fO8rsE9_XxuIO0WuesYBfisY",
  authDomain: "furniro-ecommerce-8cbe4.firebaseapp.com",
  projectId: "furniro-ecommerce-8cbe4",
  storageBucket: "furniro-ecommerce-8cbe4.appspot.com",
  messagingSenderId: "481519328517",
  appId: "1:481519328517:web:fe48e3775fb20dbe67eb6c",
  measurementId: "G-QMB3WSG3CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const Auth = getAuth(app)
export const db = getFirestore(app)