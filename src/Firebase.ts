import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const twitterProvider = new firebase.auth.TwitterAuthProvider();

const FirebaseFactory = () => {
  firebase.initializeApp(firebaseConfig);
  let auth = firebase.auth();

  return {
    auth() {
      return auth;
    },
    login() {
      return auth.signInWithPopup(twitterProvider);
    },
    logout() {
      return auth.signOut();
    }
  };
};
  
export default FirebaseFactory();
export const db = firebase.firestore();