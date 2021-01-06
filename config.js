import firebase from 'firebase';
require('@firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyDXOfOSj3fGg332dhYu2eFNV8q374xLdfg",
    authDomain: "booksanta-860a1.firebaseapp.com",
    projectId: "booksanta-860a1",
    storageBucket: "booksanta-860a1.appspot.com",
    messagingSenderId: "555692449665",
    appId: "1:555692449665:web:7e892956416c74f9471280"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore();