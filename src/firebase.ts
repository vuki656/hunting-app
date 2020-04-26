import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyArzuibti0yra8ayCEmTJ1V4pQKJNEzMQA",
    authDomain: "mobileappfinal-d0fe1.firebaseapp.com",
    databaseURL: "https://mobileappfinal-d0fe1.firebaseio.com",
    projectId: "mobileappfinal-d0fe1",
    storageBucket: "mobileappfinal-d0fe1.appspot.com",
    messagingSenderId: "559400458770",
    appId: "1:559400458770:web:b2ee3c6c0968cab27c56cb"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
