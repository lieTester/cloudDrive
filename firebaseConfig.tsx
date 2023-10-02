// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: process.env.FIREBASE_apiKey,
   authDomain: process.env.FIREBASE_authDomain,
   projectId: process.env.FIREBASE_projectId,
   storageBucket: process.env.FIREBASE_storageBucket,
   messagingSenderId: process.env.FIREBASE_messagingSenderId,
   appId: process.env.FIREBASE_appId,
   measurementId: process.env.FIREBASE_measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
