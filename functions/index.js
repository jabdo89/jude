const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.recommendStudent = functions.https.onCall(data => {
  const students = data.students.filter(usuario => usuario.rol === 'Student');

  // eslint-disable-next-line prefer-destructuring
  const requirements = data.offer.requirements;

  const unsortedStudents = [];
  for (let i = 0; i < students.length; i++) {
    let rank = 0;
    for (let j = 0; j < data.reqLength; j++) {
      for (let k = 0; k < students[i].skills.length; k++) {
        if (requirements[j] === students[i].skills[k]) {
          rank += 1;
        }
      }
    }
    const newStudent = { userID: students[i], rank: (rank / requirements.length) * 100 };
    unsortedStudents.push(newStudent);
  }

  const sortedStudents = unsortedStudents.slice().sort((a, b) => b.rank - a.rank);
  return sortedStudents;
});

exports.setToken = functions.firestore.document('Usuarios/{usuarioId}').onCreate(doc => {
  const user = doc.data();
  return admin.auth().setCustomUserClaims(user.userID, {
    rol: user.rol
  });
});
