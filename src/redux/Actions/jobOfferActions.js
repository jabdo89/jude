const uuidv4 = require('uuid/v4');
// Create Job Offer
export const createJobOffer = jobOffer => {
  return (dispatch, getState, getFirebase) => {
    const state = getState();
    const { profile } = state.firebase;
    const authID = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection('JobOffers')
      .add({
        scheduleDesc: jobOffer.scheduleDesc,
        requirements: jobOffer.requirements,
        companyLogoUrl: profile.companyLogoUrl,
        name: jobOffer.name,
        budget: jobOffer.budget,
        description: jobOffer.description,
        createdDate: new Date(),
        company: authID,
        hired: 0,
        requested: 0,
        interviewing: 0
      })
      .then(() => {
        dispatch({ type: 'JOBOFFER_CREATED', jobOffer });
      })
      .catch(err => {
        dispatch({ type: 'JOBOFFER_ERROR', err });
      });
  };
};
export const createJobOfferyStudent = (jobOffer, user) => {
  return (dispatch, getState, getFirebase) => {
    const authID = getState().firebase.auth.uid;
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection('JobOffersyStudents')
      .where('jobOfferID', '==', jobOffer)
      .where('studentID', '==', user.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          db.collection('JobOffersyStudents')
            .add({
              comapanyID: authID,
              jobOfferID: jobOffer,
              studentID: user.id,
              status: 'requestedByCompany',
              lastMessage: '',
              lMessageTime: ''
            })
            .then(() => {
              dispatch({ type: 'JOBOFFER_REQUESTED', jobOffer });
            })
            .catch(err => {
              dispatch({ type: 'JOBOFFER_REQUEST_ERROR', err });
            });
        } else dispatch({ type: 'STUDENT_ALREADY_REQUESTED', jobOffer });
      });
  };
};
export const deleateJobOffer = jobOffer => {
  return (dispatch, getState, getFirebase) => {
    const { profile } = getState().firebase.profile;
    const firebase = getFirebase();
    const db = firebase.firestore();
    // Not Complete
    db.collection('JobOffers')
      .add({
        companyLogoUrl: profile.companyLogoUrl,
        name: jobOffer.name,
        budget: jobOffer.budget,
        desc: jobOffer.desc,
        wStart: jobOffer.wStart,
        wEnd: jobOffer.wEnd,
        from: jobOffer.from,
        to: jobOffer.to,
        createdDate: new Date()
      })
      .then(() => {
        dispatch({ type: 'JOBOFFER_CREATED', jobOffer });
      })
      .catch(err => {
        dispatch({ type: 'JOBOFFER_ERROR', err });
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
      .ref(`messages/${convID}`)
      .push({
        id: uuidv4(),
        message: message.message,
        timestamp: new Date().getTime(),
        sender: profile.email
      });
    db.collection('JobOffersyStudents')
      .doc(convID)
      .update({ lastMessage: message.message, lMessageTime: new Date().getTime() });
  };
};
export const getMessages = chatID => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const messages = [];
    const db = firebase
      .database()
      .ref(`/messages/${chatID}`)
      .limitToLast(10);
    db.once('value', snap => {
      snap.forEach(data => {
        const message = data.val();
        messages.push(message);
      });
    }).then(() => dispatch({ type: 'GET_MESSAGES', messages }));
  };
};
export const watchTaskAddedEvent = chatID => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase
      .database()
      .ref(`/messages/${chatID}`)
      .limitToLast(10);
    db.on('child_added', snap => {
      const added = snap.val();
      dispatch({ type: 'MESSAGE_ADDED_LISTENER', added });
    });
  };
};
export const watchTaskRemovedEvent = chatID => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase
      .database()
      .ref(`/messages/${chatID}`)
      .limitToLast(10);
    db.on('child_removed', snap => {
      const removed = snap.val();
      dispatch({ type: 'MESSAGE_REMOVED_LISTENER', removed });
    });
  };
};

// Action for Student Appling for JobOffers

// Action for Company Recomending StudentaJob

// Update Job Offer

// DeleteJobOffer
