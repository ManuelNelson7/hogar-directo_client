// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8niwsQJiOxqtht7zX0tqrOla4rQTOoAQ",
  authDomain: "ddirecto-llmn.firebaseapp.com",
  projectId: "ddirecto-llmn",
  storageBucket: "ddirecto-llmn.appspot.com",
  messagingSenderId: "323155847726",
  appId: "1:323155847726:web:e11c59dd0242d6fa5a0dbf",
  measurementId: "G-1KMLCB4N9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);-> Este si lo activas tira error "window is not defined" -> Ver que onda por que pasa eso
const auth = getAuth(app);
export {auth, createUserWithEmailAndPassword};