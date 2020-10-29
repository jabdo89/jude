const uuidv4 = require('uuid/v4');

export const chooseRecruiter = (recruiterID, profileID) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();

    db.collection('Usuarios')
      .doc(profileID)
      .update({ recruiterID });
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
