// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQn2eS5TomaLeR0XhgIEZuHIUVP8RrS74",
  authDomain: "cart-app-b469e.firebaseapp.com",
  projectId: "cart-app-b469e",
  storageBucket: "cart-app-b469e.appspot.com",
  messagingSenderId: "244256981586",
  appId: "1:244256981586:web:18cb0242c13e98dd56558b",
  measurementId: "G-BD8ZCRZTXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore (app);
export const storage = getStorage(app);