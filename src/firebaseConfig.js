// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'; // Import the firestore function

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb5byOh8mDWGcaoJFReTPwHCZ8ZstnRyI",
  authDomain: "typing-test-db.firebaseapp.com",
  projectId: "typing-test-db",
  storageBucket: "typing-test-db.appspot.com",
  messagingSenderId: "12732566517",
  appId: "1:12732566517:web:b37a6a45eb48c58353eebc",
  measurementId: "G-S4F7SRR8SH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Get the firestore instance

export { app, firestore }; // Export both the app and firestore instances