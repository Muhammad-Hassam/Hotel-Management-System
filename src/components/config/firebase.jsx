import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage';

  var firebaseConfig = {
    apiKey: "AIzaSyDQ9tnPGJfZK7nvPtpqKRywKxpclrKYJPU",
    authDomain: "hotel-management-system-38bd3.firebaseapp.com",
    projectId: "hotel-management-system-38bd3",
    storageBucket: "hotel-management-system-38bd3.appspot.com",
    messagingSenderId: "339980608223",
    appId: "1:339980608223:web:7a540d8cd7d16141b53f6a",
    measurementId: "G-1CXBRFDJFW"
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database=firebase.database();
  const Storage=firebase.storage();

export {auth,database,Storage};