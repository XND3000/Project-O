
  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC0M825l6L2O2EhVjOPzwD7AgD21Xaa72Y",
    authDomain: "thecloset-2-react.firebaseapp.com",
    databaseURL: "https://thecloset-2-react-default-rtdb.firebaseio.com",
    projectId: "thecloset-2-react",
    storageBucket: "thecloset-2-react.appspot.com",
    messagingSenderId: "293341757778",
    appId: "1:293341757778:web:cee59afb81d0f069cffa8b",
    measurementId: "G-KF1S3CKRM6"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};
