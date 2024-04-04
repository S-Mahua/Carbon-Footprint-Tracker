// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAdr1-bAA2mF0CPkfFQw2MwncJRgkaJ34",
  authDomain: "carbonfootx.firebaseapp.com",
  projectId: "carbonfootx",
  storageBucket: "carbonfootx.appspot.com",
  messagingSenderId: "422345539639",
  appId: "1:422345539639:web:0a35150e21a3bd15f3bfb2",
  measurementId: "G-DE6LQC4YRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export  {db}