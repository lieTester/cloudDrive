// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyCT0EkhL_vUyYgJwYU3utrR8TEt3Dymd-c",
   authDomain: "cloud-drive-4f182.firebaseapp.com",
   projectId: "cloud-drive-4f182",
   storageBucket: "cloud-drive-4f182.appspot.com",
   messagingSenderId: "231460604606",
   appId: "1:231460604606:web:186dc671ca094c46dbecef",
   measurementId: "G-67PQ3JTKSE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
