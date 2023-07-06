import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyB7evailmsEJR4mKlFMMcLI7CHNaGvJv4U",
  authDomain: "booking-my-doctor.firebaseapp.com",
  databaseURL: "https://booking-my-doctor-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "booking-my-doctor",
  storageBucket: "booking-my-doctor.appspot.com",
  messagingSenderId: "343910698601",
  appId: "1:343910698601:web:558d476ef6403fdfbf9cf8",
  measurementId: "G-JWSHYKRDNR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();


export { firestore, auth };
export default firebase;
