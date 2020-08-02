const sgMail = require('@sendgrid/mail');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const API_KEY = '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';
sgMail.setApiKey(API_KEY);

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

exports.setEmail = functions.firestore.document('Notifications/{notificationId}').onCreate(doc => {
  const notification = doc.data();
  let user = notification;
  let student = notification;
  let company = notification;
  let jobOffer = notification;
  db.collection('Usuarios')
    .doc(notification.userID)
    .get()
    .then(snapshot => {
      user = snapshot.data();
      if (notification.type === 'New Request') {
        if (user.rol === 'Company') {
          db.collection('Usuarios')
            .doc(notification.studentID)
            .get()
            .then(snapshot2 => {
              student = snapshot2.data();
              const msg = {
                to: user.email,
                from: 'judeplatform@gmail.com',
                templateId: 'd-c0929752ba1247109abc4afff7e97960',
                dynamic_template_data: {
                  studentName: user.firstName,
                  image: student.profileImg,
                  major: student.major,
                  school: student.school,
                  semester: student.semester,
                  studentDesc: student.description
                }
              };
              sgMail
                .send(msg)
                .then(() => {
                  // eslint-disable-next-line no-console
                  return console.log('Email Sent');
                })
                .catch(err => {
                  // eslint-disable-next-line no-console
                  return console.log(err);
                });
            });
        } else {
          db.collection('JobOffers')
            .doc(notification.jobOfferId)
            .get()
            .then(snapshot2 => {
              jobOffer = snapshot2.data();
              db.collection('Usuarios')
                .doc(jobOffer.company)
                .get()
                .then(snapshot3 => {
                  company = snapshot3.data();
                  const msg = {
                    to: user.email,
                    from: 'judeplatform@gmail.com',
                    templateId: 'd-87a64fa79c3f4e31a13e50ac4dfdabb0',
                    dynamic_template_data: {
                      type: jobOffer.typeOfJob,
                      companyName: company.companyName,
                      budget: jobOffer.budget,
                      image: company.profileImg,
                      jobOfferDesc: jobOffer.description,
                      website: company.website
                    }
                  };
                  sgMail
                    .send(msg)
                    .then(() => {
                      // eslint-disable-next-line no-console
                      return console.log('Email Sent');
                    })
                    .catch(err => {
                      // eslint-disable-next-line no-console
                      return console.log(err);
                    });
                });
            });
        }
      }
      return null;
    });
  return null;
});

exports.newJobOffer = functions.firestore.document('JobOffers/{jobOfferId}').onCreate(doc => {
  const jobOffer = doc.data();
  let user = jobOffer;
  let company = jobOffer;
  db.collection('Usuarios')
    .doc(jobOffer.company)
    .get()
    .then(snapshot => {
      company = snapshot.data();
      db.collection('Usuarios')
        .where('major', 'in', jobOffer.major)
        .get()
        .then(snapshot2 => {
          if (snapshot2.empty) {
            return;
          }
          snapshot2.forEach(doc2 => {
            user = doc2.data();
            const msg = {
              to: user.email,
              from: 'judeplatform@gmail.com',
              templateId: 'd-a85b62b0375d41669245f1158e8ff716',
              dynamic_template_data: {
                subject: 'New Job Offer',
                name: user.firstName,
                type: jobOffer.typeOfJob,
                companyName: jobOffer.companyName,
                budget: jobOffer.budget,
                image: company.profileImg,
                jobOfferDesc: jobOffer.description,
                website: company.website
              }
            };
            return sgMail.send(msg);
          });
        });
    });
  return null;
});
