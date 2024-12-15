// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGCIQPkJQpXxyoQUHDsATPZrELIYRyJCA",
  authDomain: "cloud-react-ba4ef.firebaseapp.com",
  projectId: "cloud-react-ba4ef",
  storageBucket: "cloud-react-ba4ef.firebasestorage.app",
  messagingSenderId: "862981284028",
  appId: "1:862981284028:web:bdc1daade64ed6108330b9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get auth and firestore
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}