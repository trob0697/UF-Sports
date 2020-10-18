var firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyCwORSWUNWpBSwA3cSVXnngqDNSAFuromM",
  authDomain: "uf-sports.firebaseapp.com",
  databaseURL: "https://uf-sports.firebaseio.com",
  projectId: "uf-sports",
  storageBucket: "uf-sports.appspot.com",
  messagingSenderId: "902136411839",
  appId: "1:902136411839:web:8a57ad0fd2751c308ab80a",
  measurementId: "G-2FBTZG88NH"
}

export default firebase.initializeApp(firebaseConfig)