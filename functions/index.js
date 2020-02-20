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

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
