import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./Reducers/allReducers";
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider, getFirestore } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBWlMrr8wurY04dALTgZ7QGpCgkwJpbeOE",
  authDomain: "jude-8cd07.firebaseapp.com",
  databaseURL: "https://jude-8cd07.firebaseio.com",
  projectId: "jude-8cd07",
  storageBucket: "jude-8cd07.appspot.com",
  messagingSenderId: "686559516875",
  appId: "1:686559516875:web:b9eec0528716316db0a34e",
  measurementId: "G-5ZQ7E1R0CV"
};

const middlewares = [thunk.withExtraArgument(getFirebase, getFirestore)];

const store = createStore(
  allReducers,
  compose(applyMiddleware(...middlewares))
);

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfConfig = {
  userProfile: "Usuarios",
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
