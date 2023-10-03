// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk3_G7D1u10bmArLkCTTGSXz4QN3fBfos",
  authDomain: "quizz-app--db-auth.firebaseapp.com",
  databaseURL: "https://quizz-app--db-auth-default-rtdb.firebaseio.com",
  projectId: "quizz-app--db-auth",
  storageBucket: "quizz-app--db-auth.appspot.com",
  messagingSenderId: "992651437724",
  appId: "1:992651437724:web:47a2ceae7fc78c0cd16f59"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);