// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFJMekSTS580r7Mm27HtNFz4eCydoG-gA",
  authDomain: "cheermeuplife.firebaseapp.com",
  projectId: "cheermeuplife",
  storageBucket: "cheermeuplife.firebasestorage.app",
  messagingSenderId: "37973921470",
  appId: "1:37973921470:web:74e63c7cd1811538eed8ef",
  measurementId: "G-XYCD9H6Y5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);