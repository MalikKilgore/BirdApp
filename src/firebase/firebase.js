import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

// Firebase init - project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbFKjPZ0PyXb5bkfOz2tV1elnpMgIyHi8",
    authDomain: "maliks-birdapp.firebaseapp.com",
    projectId: "maliks-birdapp",
    storageBucket: "maliks-birdapp.appspot.com",
    messagingSenderId: "702034950371",
    appId: "1:702034950371:web:d3e5ee9021f72ff6826dd6",
    measurementId: "G-68KMQ1B36N"
  };

//Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Utils
const db = firebase.firestore()
const auth = firebase.auth()
const analytics = firebase.analytics();