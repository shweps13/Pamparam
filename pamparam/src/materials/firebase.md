You should have here your parameters for Firebase access in firebase.js [my parameters in gitignore rules]

config should looks like =>

=======
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "qwdqwdqwd",
    authDomain: "yourapp.firebaseapp.com",
    databaseURL: "https://yourapp.firebaseio.com",
    projectId: "yourapp",
    storageBucket: "yourapp.appspot.com",
    messagingSenderId: "asdasdasdasd",
    appId: "1:qwd:web:qwdqwd",
    measurementId: "G-qwdqwd"
  };);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();


export { db, auth, storage };
=======

Receiving data from DB, based on snapshot condition:

useEffect(() => {
  // sorting our images with .orderBy
  db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    // pull data everytime when new post was added to the DB
    console.log('Here!!!')
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })));
  })
}, []);