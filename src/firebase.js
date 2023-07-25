import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB1fg5QwyH2v5PPoMkMJD4G1BAnEgxR3Pc",
    authDomain: "filterpxproject.firebaseapp.com",
    projectId: "filterpxproject",
    storageBucket: "filterpxproject.appspot.com",
    messagingSenderId: "455848611611",
    appId: "1:455848611611:web:cb54b135eb429f39b2cdbe",
    measurementId: "G-XCPDC2RNNZ"
};

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = firebase.auth;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default app;

