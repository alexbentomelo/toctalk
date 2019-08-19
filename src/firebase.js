
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";



 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyD1gT2f6TezM8T_Vu4Fp1uYKiSOJfCsNzg",
    authDomain: "react-slack-clone-df725.firebaseapp.com",
    databaseURL: "https://react-slack-clone-df725.firebaseio.com",
    projectId: "react-slack-clone-df725",
    storageBucket: "react-slack-clone-df725.appspot.com",
    messagingSenderId: "22109239962",
    appId: "1:22109239962:web:40b2f9dfbe2c62fa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;