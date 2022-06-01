import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyAT4ho7o061vZcGJhlWcpBRVmcekr4ybU8",
  authDomain: "redesocial-73fce.firebaseapp.com",
  projectId: "redesocial-73fce",
  storageBucket: "redesocial-73fce.appspot.com",
  messagingSenderId: "14999192601",
  appId: "1:14999192601:web:c4667a5def664ddc609688",
  measurementId: "G-VVFL390BEQ"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;