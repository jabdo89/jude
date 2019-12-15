export const signIn = newUser => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        dispatch({ type: 'SIGNIN_SUCCESS' });
      })
      .catch(error => {
        dispatch({ type: 'SIGNIN_ERROR', error });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase.auth().signOut();
  };
};
