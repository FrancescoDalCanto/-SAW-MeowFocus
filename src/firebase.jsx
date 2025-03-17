import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// Configurazione di Firebase
const firebaseConfig = {
  apiKey: "AIzaSyASBiiJxcz3_r9jZRCGY4qnn-EgPGf-ATU",
  authDomain: "studybreak-ea664.firebaseapp.com",
  projectId: "studybreak-ea664",
  storageBucket: "studybreak-ea664.firebasestorage.app",
  messagingSenderId: "625552373937",
  appId: "1:625552373937:web:1c5cb105cf1cee138f4a90",
  measurementId: "G-6GS50R6153"
};

// Inizializzazione di Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Ottieni l'autenticazione
const googleProvider = new GoogleAuthProvider(); // Provider per Google

// Esporta i metodi di autenticazione
export { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, createUserWithEmailAndPassword };
