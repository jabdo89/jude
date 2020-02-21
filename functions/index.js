const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// , context
exports.recommendStudent = functions.https.onCall(data => {
  // let studentMap = [];
  // console.log(data.students);
  // console.log(data.offer);
  return data;
});

exports.setToken = functions.firestore.document('Usuarios/{usuarioId}').onCreate(doc => {
  const user = doc.data();
  return admin.auth().setCustomUserClaims(user.userID, {
    rol: user.rol
  });
});
