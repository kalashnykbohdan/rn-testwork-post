import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLRNtV0nv1mmQHPcD0tOWGn7VHN1FYir0",
  authDomain: "rn-testwork.firebaseapp.com",
  projectId: "rn-testwork",
  storageBucket: "rn-testwork.appspot.com",
  messagingSenderId: "132639883938",
  appId: "1:132639883938:web:02f1b479f0d49e3dcf4dfb",
  measurementId: "G-TLQEF9N2P7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
