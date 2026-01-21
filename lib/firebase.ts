// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";


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

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ✅ Next.js 서버 빌드/SSR에서 analytics 터지는 것 방지
export const analyticsPromise: Promise<Analytics | null> =
  typeof window === "undefined"
    ? Promise.resolve(null)
    : isSupported().then((ok) => (ok ? getAnalytics(app) : null));