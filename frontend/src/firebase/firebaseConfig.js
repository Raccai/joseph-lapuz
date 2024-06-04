// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQI6ht3y6D4MxQF5C8FzU34CUzT5C1exw",
  authDomain: "josephlapuz-59444.firebaseapp.com",
  projectId: "josephlapuz-59444",
  storageBucket: "josephlapuz-59444.appspot.com",
  messagingSenderId: "536521912414",
  appId: "1:536521912414:web:f2a5704f831093afd144cf",
  measurementId: "G-SM596DFS60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };