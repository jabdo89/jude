import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import companyReducer from './companyReducer';
import studentReducer from './studentReducer';
import authReducer from './authReducer';

const allReducers = combineReducers({
  company: companyReducer,
  auth: authReducer,
  student: studentReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default allReducers;
