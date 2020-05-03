import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC_O7Nbu-Z-__gazBJUQRo0NfAtnx5eCgo",
  authDomain: "npocore-8fbf6.firebaseapp.com",
  databaseURL: "https://npocore-8fbf6.firebaseio.com",
  projectId: "npocore-8fbf6",
  storageBucket: "npocore-8fbf6.appspot.com",
  messagingSenderId: "33661078257",
  appId: "1:33661078257:web:286dde125e81a71ac37750"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
