// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  FacebookAuthProvider,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { signIn, stateSignIn } from "./features/users/usersSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwen1mRr58hMaVOD7YLog_EPxzxq8l_Qk",
  authDomain: "nextfit-28a80.firebaseapp.com",
  projectId: "nextfit-28a80",
  storageBucket: "nextfit-28a80.appspot.com",
  messagingSenderId: "952013972515",
  appId: "1:952013972515:web:95178bef9eacce38d0bd96",
  measurementId: "G-TKFN6X42X0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const providerGoogle = new GoogleAuthProvider();
export const providerFb = new FacebookAuthProvider();


