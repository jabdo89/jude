import firebase from "firebase";

const Config = {
  apiKey: "AIzaSyBWlMrr8wurY04dALTgZ7QGpCgkwJpbeOE",
  authDomain: "jude-8cd07.firebaseapp.com",
  databaseURL: "https://jude-8cd07.firebaseio.com",
  projectId: "jude-8cd07",
  storageBucket: "jude-8cd07.appspot.com",
  messagingSenderId: "686559516875",
  appId: "1:686559516875:web:b9eec0528716316db0a34e",
  measurementId: "G-5ZQ7E1R0CV"
};

const fire = firebase.initializeApp(Config);
export default fire;
