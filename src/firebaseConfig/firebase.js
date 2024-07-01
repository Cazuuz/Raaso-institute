// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6uY2UlNwU8GUFpO-OzhHCQKGf7mD9fCY",
  authDomain: "raaso-institute.firebaseapp.com",
  projectId: "raaso-institute",
  storageBucket: "raaso-institute.appspot.com",
  messagingSenderId: "283494994527",
  appId: "1:283494994527:web:f08cebd8d891e82fb601ea",
  measurementId: "G-C6TKBRH7B8",
};

const app = initializeApp(firebaseConfig);

export const studentsDateBase = getFirestore(app);
