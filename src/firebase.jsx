import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

/**
 * Configurazione di Firebase
 * Contiene le credenziali per l'accesso all'API Firebase
 */
const firebaseConfig = {
  apiKey: "AIzaSyASBiiJxcz3_r9jZRCGY4qnn-EgPGf-ATU",
  authDomain: "studybreak-ea664.firebaseapp.com",
  projectId: "studybreak-ea664",
  storageBucket: "studybreak-ea664.firebasestorage.app",
  messagingSenderId: "625552373937",
  appId: "1:625552373937:web:1c5cb105cf1cee138f4a90",
  measurementId: "G-6GS50R6153"
};

// Inizializzazione dell'app Firebase
const app = initializeApp(firebaseConfig);
// Inizializzazione del servizio di autenticazione
const auth = getAuth(app);
// Creazione del provider Google per l'autenticazione
const googleProvider = new GoogleAuthProvider();

// Esportazione dei servizi e metodi di autenticazione
export { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, createUserWithEmailAndPassword };