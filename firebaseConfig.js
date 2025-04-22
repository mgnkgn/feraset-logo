import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7cNCnDStkGlk-iT8shyDzI1K50I1PHK8",
  authDomain: "feraset-logo-bb06e.firebaseapp.com",
  projectId: "feraset-logo-bb06e",
  storageBucket: "feraset-logo-bb06e.firebasestorage.app",
  messagingSenderId: "625185658651",
  appId: "1:625185658651:web:a7b2ee137de1d40f1465be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
