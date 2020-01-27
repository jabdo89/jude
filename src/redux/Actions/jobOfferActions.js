// Create Job Offer
export const createJobOffer = jobOffer => {
  return (dispatch, getState, getFirebase) => {
    // const { profile } = getState().firebase.profile;
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection('JobOffers')
      .add({
        ...jobOffer.requirements,
        ...jobOffer.scheduleDesc,
        // companyLogoUrl: profile.companyLogoUrl,
        name: jobOffer.name,
        budget: jobOffer.budget,
        desc: jobOffer.description,
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

export const sendMessage = message => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const id = getState().firebase.profile.firstName;

    firebase
      .database()
      .ref('messages/' + 1)
      .set({
        id: 4,
        message: message.message,
        timestamp: new Date(),
        sender: 'abdo'
      });
  };
};
// Action for Student Appling for JobOffers

// Action for Company Recomending StudentaJob

// Update Job Offer

// DeleteJobOffer
