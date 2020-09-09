import firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyChBYMDFiGd_E-G_zE1Q0HAWWA43UaccTY",
    authDomain: "twitter-app-8a4f8.firebaseapp.com",
    databaseURL: "https://twitter-app-8a4f8.firebaseio.com",
    projectId: "twitter-app-8a4f8",
    storageBucket: "twitter-app-8a4f8.appspot.com",
    messagingSenderId: "590719431235",
    appId: "1:590719431235:web:b8e502909d61d055cb5af6",
    measurementId: "G-84S8LE5MX1"
  };


  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;