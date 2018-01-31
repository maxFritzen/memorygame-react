import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCKffMIsUvxHnOc3ZYtbXmQOLVqFLHzTDU",
    authDomain: "memorygame-42d56.firebaseapp.com",
    databaseURL: "https://memorygame-42d56.firebaseio.com",
    projectId: "memorygame-42d56",
    storageBucket: "memorygame-42d56.appspot.com",
    messagingSenderId: "1084493223065"
  };

firebase.initializeApp(config);

const database = firebase.database();


export { firebase, database as default }

// // child_removed
// database.ref('Expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });
//
// // child_changed
// database.ref('Expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });
//
// // child_added
// database.ref('Expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });
// database.ref('Expenses')
//   .on('value', (snapshot) => {
//     const expenses = [];
//
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
//   });

// database.ref('Expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];
//
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
//   });

// database.ref('Expenses').push({
//   description: 'This is the best description',
//   note: '',
//   amount: 2500,
//   createdAt: 19500
// });

//database.ref('notes/-KzZDvwRh0uZ5FwCvx1C').remove();

// database.ref('notes').push({
//   title: 'Course Topics',
//   body: 'React, angular, python'
// });

// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// }, (e) => {
//   console.log('Error with data fetching', e);
// });

// const onValueChange = database.ref().on('value', (snapshot) => {
//   console.log(snapshot.val());
// }, (e) => {
//   console.log('Error with data fetching', e);
// });
//
// setTimeout(() => {
//   database.ref('age').set(29);
// }, 3500);
//
// setTimeout(() => {
//   database.ref().off(onValueChange);
// }, 7000);
//
// setTimeout(() => {
//   database.ref('age').set(30);
// }, 10500);

// database.ref('location/city')
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((e) => {
//     console.log('Error fetching data', e);
//   });

//database.ref('age').set(null);

// database.ref('isSingle')
//   .remove()
//   .then(() => {
//     console.log('Remove succeeded');
//   })
//   .catch((e) => {
//     console.log('Remove failed, error: ', e);
//   });

// database.ref().set({
//   name: 'Max Fritzén',
//   age: 25,
//   stressLevel: 6,
//   job: {
//     title: 'Software developer',
//     company: 'Google'
//   },
//   location: {
//     city: 'Göteborg',
//     country: 'Sweden'
//   }
// }).then(() => {
//   console.log('Data is saved');
// }).catch((e) => {
//   console.log('This failed.', e)
// });
//
// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// });
//
// //database.ref().set('This is my data.');
// // database.ref('age').set(27);
// // database.ref('location/city').set('Skövde');
//
// database.ref('attributes').set({
//     height: 1.86,
//     weight: 80
// }).then(() => {
//   console.log('Second set worked');
// }).catch((e) => {
//   console.log('Second failed', e)
// });

console.log('I made a request to change the data.');
