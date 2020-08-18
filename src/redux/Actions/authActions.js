// Sign in Both Student and Company
export const signIn = newUser => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        dispatch({ type: 'SIGNIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNIN_ERROR', err });
      });
  };
};

// SignOut
export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase.auth().signOut();
  };
};

// Student Sign Up
export const studentSignUp = newUser => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    let url;
    if (newUser.url === undefined) {
      url = '';
    } else {
      // eslint-disable-next-line prefer-destructuring
      url = newUser.url;
    }
    db.collection('Usuarios')
      .where('email', '==', newUser.email)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(resp => {
              return db
                .collection('Usuarios')
                .doc(resp.user.uid)
                .set({
                  profileImg: url,
                  resume: newUser.urlPDF,
                  location: newUser.location,
                  email: newUser.email,
                  school: newUser.school,
                  userID: resp.user.uid,
                  rol: 'Student',
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  major: newUser.mayor,
                  skills: [],
                  semester: newUser.semester,
                  description: newUser.description
                });
            })
            .then(() => {
              dispatch({ type: 'SIGNUP_SUCCESS' });
            })
            .catch(err => {
              dispatch({ type: 'SIGNUP_ERROR', err });
            });
        }
        snapshot.forEach(doc => {
          dispatch({ type: 'USER_ALREADY_EXISTS', doc });
        });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};

export const createCompany = newCompany => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    let url;
    if (newCompany.url === undefined) {
      url = '';
    } else {
      // eslint-disable-next-line prefer-destructuring
      url = newCompany.url;
    }
    db.collection('Usuarios')
      .where('email', '==', newCompany.email)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(newCompany.email, newCompany.password)
            .then(resp => {
              return db
                .collection('Usuarios')
                .doc(resp.user.uid)
                .set({
                  profileImg: url,
                  companyName: newCompany.companyName,
                  email: newCompany.email,
                  website: newCompany.website,
                  userID: resp.user.uid,
                  rol: 'Company',
                  description: newCompany.description
                });
            })
            .then(() => {
              dispatch({ type: 'SIGNUP_SUCCESS' });
            })
            .catch(err => {
              console.error(err);
              dispatch({ type: 'SIGNUP_ERROR', err });
            });
        }
        snapshot.forEach(doc => {
          dispatch({ type: 'USER_ALREADY_EXISTS', doc });
        });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};

export const updateProfilePic = (url, userID) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection('Usuarios')
      .doc(userID)
      .update({
        profileImg: url
      });
  };
};

export const updateCurriculum = (url, userID) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection('Usuarios')
      .doc(userID)
      .update({
        resume: url
      });
  };
};

export const companyChangePassword = email => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({ type: 'COMPANY_PASSWORD_CHANGE' });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: 'COMPANY_PASSWORD_ERR', err });
      });
  };
};

export const clearCompanyPassword = activity => {
  return dispatch => {
    dispatch({ type: 'COMPANY_PASSWORD_RESET', activity });
  };
};

export const clearEditProfile = activity => {
  return dispatch => {
    dispatch({ type: 'PROFILE_RESET', activity });
  };
};

export const forgotPassword = email => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({ type: 'FORGOT_PASSWORD_SENT' });
      })
      .catch(err => {
        dispatch({ type: 'FORGOT_PASSWORD_ERR', err });
      });
  };
};
