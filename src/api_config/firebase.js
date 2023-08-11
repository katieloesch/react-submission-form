import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Initialize Firebase
const app = firebase.initializeApp({
    apiKey: "AIzaSyDb63HOWnBg33z3ZhlnGcyxGdVTD1xTT2o",
    authDomain: "react-submission-form.firebaseapp.com",
    projectId: "react-submission-form",
    storageBucket: "react-submission-form.appspot.com",
    messagingSenderId: "298543221305",
    appId: "1:298543221305:web:774158b8e14f6f7d7b9be8"
});

export const db = firebase.firestore();
