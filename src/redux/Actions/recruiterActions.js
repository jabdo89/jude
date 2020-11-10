const uuidv4 = require('uuid/v4');

export const chooseRecruiter = (recruiterID, profileID) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();

    db.collection('Usuarios')
      .doc(profileID)
      .update({ recruiterID });
    db.collection('RecruitersyStudents').add({
      lMessageTime: '',
      lastMessage: '',
      recruiterID,
      studentID: profileID
    });
  };
};

export const sendMessage = (message, convID) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const state = getState().firebase;
    const { profile } = state;
    firebase
      .database()
      .ref(`messagesRecruiter/${convID}`)
      .push({
        id: uuidv4(),
        message: message.message,
        timestamp: new Date().getTime(),
        sender: profile.userID
      });
    db.collection('RecruitersyStudents')
      .doc(convID)
      .update({ lastMessage: message.message, lMessageTime: new Date().getTime() });
  };
};

export const editProfile = newProfile => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const state = getState().firebase;
    const { profile } = state;
    db.collection('Usuarios')
      .doc(profile.userID)
      .update({
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        description: newProfile.description,
        areas: newProfile.areas
      })
      .then(() => {
        dispatch({ type: 'PROFILE_EDITED', newProfile });
      })
      .catch(err => {
        dispatch({ type: 'PROFILE_ERROR', err });
      });
  };
};

export const stopChatting = newProfile => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const state = getState().firebase;
    const { profile } = state;
    db.collection('Usuarios')
      .doc(profile.userID)
      .update({
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        description: newProfile.description
      })
      .then(() => {
        dispatch({ type: 'PROFILE_EDITED', newProfile });
      })
      .catch(err => {
        dispatch({ type: 'PROFILE_ERROR', err });
      });
  };
};

export const rejectRecruiter = (RecruiterStudentID, studentID) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection('RecruitersyStudents')
      .doc(RecruiterStudentID)
      .delete()
      .then(() =>
        firebase
          .database()
          .ref(`/messagesRecruiter/${RecruiterStudentID}`)
          .remove()
      );
    db.collection('Usuarios')
      .doc(studentID)
      .update({ recruiterID: '' });
  };
};
