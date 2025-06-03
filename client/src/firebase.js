import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAa5FAO8rTZOhOO3BbmQOAt_GlDrdX-kmA",
  authDomain: "papertrading-a6c0a.firebaseapp.com",
  projectId: "papertrading-a6c0a",
  storageBucket: "papertrading-a6c0a.firebasestorage.app",
  messagingSenderId: "872200259125",
  appId: "1:872200259125:web:d0b492e5144cc47b05d37c",
  measurementId: "G-TH5CSGYRKZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };