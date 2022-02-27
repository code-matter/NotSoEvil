// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "notsoevil-6059a.firebaseapp.com",
  projectId: "notsoevil-6059a",
  storageBucket: "notsoevil-6059a.appspot.com",
  messagingSenderId: "433183303612",
  appId: "1:433183303612:web:afe451a4e0fd96ab04adb9",
  measurementId: "G-VZ7N861FFH",
};

// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore();
export const firebaseStorage = getStorage();

const analytics = getAnalytics(firebaseApp);
