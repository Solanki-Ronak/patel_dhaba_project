// Import the functions you need from the SDKs you need


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk1R3IQjlYAo7y_kaUMDhKARJHWOvgu4E",
  authDomain: "react-groupproject.firebaseapp.com",
  databaseURL: "https://react-groupproject-default-rtdb.firebaseio.com",
  projectId: "react-groupproject",
  storageBucket: "react-groupproject.appspot.com",
  messagingSenderId: "798081788384",
  appId: "1:798081788384:web:1527877e20a9371e416385",
  measurementId: "G-YKRGM3LX14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore=getFirestore(app);

export default firestore;