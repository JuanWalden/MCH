// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHHdHf6E0mm4IbzAE4Fdxs3XlLwyGI6Xw",
  authDomain: "mchtaller-f29c8.firebaseapp.com",
  projectId: "mchtaller-f29c8",
  storageBucket: "mchtaller-f29c8.firebasestorage.app",
  messagingSenderId: "383402635816",
  appId: "1:383402635816:web:96c5a9e8529fb2a415fb1d",
  measurementId: "G-EC9XKBML07"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };