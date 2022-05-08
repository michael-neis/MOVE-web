// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv_pp_y5Nd2aRoZ5qX2d9rMQugFwScu8g",
  authDomain: "move-37ced.firebaseapp.com",
  projectId: "move-37ced",
  storageBucket: "move-37ced.appspot.com",
  messagingSenderId: "1072513630771",
  appId: "1:1072513630771:web:20fd062352c000ca169946",
  measurementId: "G-MMB766PBH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db}