// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq3sRuaghPVIOI0UX7R0Pfykf-F3K5_lQ",
  authDomain: "netflixgpt-998a1.firebaseapp.com",
  projectId: "netflixgpt-998a1",
  storageBucket: "netflixgpt-998a1.appspot.com",
  messagingSenderId: "854722604901",
  appId: "1:854722604901:web:c43d78d286258c8de87b8c",
  measurementId: "G-Q4XHCZ031Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
