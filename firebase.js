import firebase from '@react-native-firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyC-iLB1vz12fknScRcYLbr4i5mCnWKciWM",
    authDomain: "khappa-a8424.firebaseapp.com",
    databaseURL: "https://khappa-a8424.firebaseio.com",
    projectId: "khappa-a8424",
    storageBucket: "khappa-a8424.appspot.com",
    messagingSenderId: "930061023426",
    appId: "1:930061023426:web:e5f5a038052a885ff8235b",
    measurementId: "G-NSGYG6BM1B",
  };
    console.log("succesfully connected to firebase")

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
export default db;