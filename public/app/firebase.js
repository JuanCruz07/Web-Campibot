// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-XVEue1PQtl2YeOzhQv2aJoO34OfrfQY",
  authDomain: "campibot-a2df0.firebaseapp.com",
  databaseURL: "https://campibot-a2df0-default-rtdb.firebaseio.com",
  projectId: "campibot-a2df0",
  storageBucket: "campibot-a2df0.appspot.com",
  messagingSenderId: "1093334389637",
  appId: "1:1093334389637:web:7aa1ff0b3be96664bb6aec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
