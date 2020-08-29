import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyC2VEzsmiSrdSKQN-AvlRqCtu-Olmd5NMM",
  authDomain: "test-react-44a96.firebaseapp.com",
  databaseURL: "https://test-react-44a96.firebaseio.com",
  projectId: "test-react-44a96",
  storageBucket: "test-react-44a96.appspot.com",
  messagingSenderId: "152562650679",
  appId: "1:152562650679:web:a01a469fc9d3a4d06079b2",
};
const firebaseApp = firebase.initializeApp(config);
const firestore = firebaseApp.firestore();

firestore.enablePersistence({ synchronizeTabs: true });

export const fbSignUp = async (email, password) => {
  const res = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  if (res && res.user) {
    return res.user.uid;
  }
  return false;
};

export const fbLogin = async (email, password) => {
  const res = await firebase.auth().signInWithEmailAndPassword(email, password);
  if (res && res.user) {
    return res.user.uid;
  }
  return false;
};

const collection = "knowleadge";
const knowRef = firestore.collection(collection).doc("store");

export const knowDB = {
  get: () => knowRef.get().then((s) => (s.exists ? s.data().store : [])),
  create: (know) => {
    return knowRef
      .update({
        store: firebase.firestore.FieldValue.arrayUnion(know),
      })
      .catch((e) => console.error(e));
  },
};
