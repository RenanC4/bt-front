const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyDE6--9sotvMpNZXglucLjGGZUAvEvl1j8",
    authDomain: "busca-time-a4de1.firebaseapp.com",
    databaseURL: "https://busca-time-a4de1.firebaseio.com",
    projectId: "busca-time-a4de1",
    storageBucket: "busca-time-a4de1.appspot.com",
    messagingSenderId: "804217091781",
    appId: "1:804217091781:web:fad66e567f53120b"
  };

  firebase.initializeApp(firebaseConfig)
  export default firebase