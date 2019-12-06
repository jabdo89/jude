import { combineReducers } from "redux";
import companyReducer from "./companyReducer.js";
import studentReducer from "./studentReducer.js";
import authReducer from "./authReducer.js";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const allReducers = combineReducers({
  company: companyReducer,
  auth: authReducer,
  student: studentReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default allReducers;
