// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAFs2cIau1bvlKLCYE98M_RgWPmFkRsu4",
    authDomain: "react-app-fbase-login.firebaseapp.com",
    projectId: "react-app-fbase-login",
    storageBucket: "react-app-fbase-login.appspot.com",
    messagingSenderId: "1086955218882",
    appId: "1:1086955218882:web:6429d6059425066e31d85b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;