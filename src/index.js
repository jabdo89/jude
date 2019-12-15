import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { Provider, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  ReactReduxFirebaseProvider,
  getFirestore,
  getFirebase,
  isLoaded
} from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import allReducers from './Reducers/allReducers';
import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyBWlMrr8wurY04dALTgZ7QGpCgkwJpbeOE',
  authDomain: 'jude-8cd07.firebaseapp.com',
  databaseURL: 'https://jude-8cd07.firebaseio.com',
  projectId: 'jude-8cd07',
  storageBucket: 'jude-8cd07.appspot.com',
  messagingSenderId: '686559516875',
  appId: '1:686559516875:web:b9eec0528716316db0a34e',
  measurementId: 'G-5ZQ7E1R0CV'
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div></div>;
  return children;
}

const middlewares = [thunk.withExtraArgument(getFirebase, getFirestore)];

const store = createStore(allReducers, compose(applyMiddleware(...middlewares)));

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfConfig = {
  userProfile: 'Usuarios',
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
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
