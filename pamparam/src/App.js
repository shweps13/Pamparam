import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, NavLink, Switch } from "react-router-dom";
import { auth, db } from './materials/firebase';
import firebase from 'firebase';

import MenuNavLink from './components/dependent/MenuNavLink.js';
import Routes from './components/dependent/Routes.js'

import { getModalStyle, useStyles } from './materials/modalStyles.js';
import ModalSignup from './components/dependent/ModalSignup.js';
import ModalSignin from './components/dependent/ModalSignin.js';
import logo from './materials/logo.png';


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [local, setLocal] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in
        console.log(authUser)
        setUser(authUser);
      } else {
        // user logged out
        setUser(null);
      }
    })
    return () => {
      // cleanup actions
      unsubscribe();
    }
  }, [username, user]);

  // ====== auth functions ======
  const cleanAfterLog = () => {
    // function that removing user data from hooks after login/signup
    setEmail('')
    setPassword('')
    setUsername('')
  }

  const signUpDB = (userID, email, username) => {
    db.collection('users').doc(userID).set({
      userID: userID,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: username,
      photoURL: null,
      email: email,
    });
  }

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      // .then(signUpDB(userID, email))
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .then(() => {
        firebase.auth().onAuthStateChanged((authUser) => {
          if (authUser) {
            // Creating collection with user data in db
            signUpDB(authUser.uid, authUser.email, authUser.displayName)
          } 
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
    cleanAfterLog();
  }
  
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
    cleanAfterLog();
  }
  // === end of auth functions ===
  


  return (
    <Router>
      <div className="app">
  
        <div className="app__header">
        
          <ModalSignup open={open} setOpen={setOpen} modalStyle={modalStyle} classesStyle={classes.paper} username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} signUp={signUp} />
          <ModalSignin openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} modalStyle={modalStyle} classesStyle={classes.paper} email={email} setEmail={setEmail} password={password} setPassword={setPassword} signIn={signIn} />
          <img src={logo} className="app__headerImage" alt="logo"/>
          
          <MenuNavLink setOpenSignIn={setOpenSignIn} setOpen={setOpen} user={user} local={local} NavLink={NavLink} />
          
        </div>

        <Routes Switch={Switch} Route={Route} Redirect={Redirect} setLocal={setLocal} user={user} username={username} />
        
      </div>
    </Router>
  );
}

export default App;
