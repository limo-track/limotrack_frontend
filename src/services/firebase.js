import firebase from 'firebase/app';
import 'firebase/firestore';
// got from app settings on firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


//db.collection('tk303').get('9iEWXvacfPvFQuUHaQTD').then(x => console.log(x.doc.data()))

const carsCollection = db.collection('cars');
const tk303Collection = db.collection('TK303');
const tk103Collection = db.collection('TK103');

export {
  carsCollection,
  tk303Collection,
  tk103Collection
}