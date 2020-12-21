import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/storage'

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
const tweetStore = db.collection('tweets')
const auth = firebase.auth()
const analytics = firebase.analytics();
const storage = firebase.storage()

//Cloud storage References
const storageRef = storage.ref()
const imagesRef = storageRef.child('images')
const videosRef = storageRef.child('videos')
const avatarsRef = storageRef.child('avatars')

export {
  db,
  tweetStore,
  analytics,
  storage,
  storageRef,
  imagesRef,
  videosRef,
  avatarsRef
}