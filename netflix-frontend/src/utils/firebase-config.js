import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDTIwDVLq8d2Z3hPaT1dTQklxhPIuVEKaI",
  authDomain: "netflix-clone-79dc7.firebaseapp.com",
  projectId: "netflix-clone-79dc7",
  storageBucket: "netflix-clone-79dc7.appspot.com",
  messagingSenderId: "584183796408",
  appId: "1:584183796408:web:aace3c03f336820d8d1a4d",
  measurementId: "G-3XK6H9HL5Z"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
