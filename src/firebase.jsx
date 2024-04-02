import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAHAM-JkFwBVTdc3xv3ciXC2y-m4g1VjiY",
    authDomain: "expense-tracker-262eb.firebaseapp.com",
    projectId: "expense-tracker-262eb",
    storageBucket: "expense-tracker-262eb.appspot.com",
    messagingSenderId: "51089308994",
    appId: "1:51089308994:web:fa9dd81be0cfa815e41cdb"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
