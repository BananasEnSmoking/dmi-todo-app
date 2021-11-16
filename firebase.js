// Import firebase
import firebase from "firebase";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYbp3p1EwGXoeCV7eZlZsqI5rXdTPNhwE",
  authDomain: "proyecto-todos-dmi.firebaseapp.com",
  projectId: "proyecto-todos-dmi",
  storageBucket: "proyecto-todos-dmi.appspot.com",
  messagingSenderId: "823021800955",
  appId: "1:823021800955:web:103bbd7b15de66f45b8f5e",
  measurementId: "G-8607KD71R7"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  console.info({ firebase });
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const database = firebase.database()

export { auth, database };
