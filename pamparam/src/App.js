import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";

import Main from './components/Main.js';
import Messenger from './components/Messenger.js';
import Discover from './components/Discover.js';
import LikePage from './components/LikePage.js';
import LoadPage from './components/LoadPage.js';
import NotFound from './components/NotFound.js';

import { Button } from '@material-ui/core';
import ModalSignup from './components/ModalSignup.js';
import ModalSignin from './components/ModalSignin.js';
import { getModalStyle, useStyles } from './materials/modalStyles.js';
import { auth } from './materials/firebase'
import logo from './materials/logo.png'


import { RiSendPlaneLine, RiSendPlaneFill } from 'react-icons/ri';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { AiOutlineHome, AiFillHome, AiOutlineHeart, AiFillHeart, AiOutlineCompass, AiFillCompass} from 'react-icons/ai';

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

  useEffect(
    () => {
      console.log('Active directory=>', local)
    },
    [local]
  )

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

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
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
          
          <div className="app__headerButtons">  
            <NavLink 
              className="navbar__link"
              to="/feed">
                {local === "/feed" ? (
                    <AiFillHome size={25} />
                  ): (
                    <AiOutlineHome size={25} />
                )}
            </NavLink> 
            <NavLink 
              className="navbar__link"
              to="/post">
                {local === "/post" ? (
                    <BsPlusCircleFill size={25} />
                  ): (
                    <BsPlusCircle size={25} />
                )}
            </NavLink> 
            <NavLink 
              className="navbar__link"
              to="/messenger">
                {local === "/messenger" ? (
                    <RiSendPlaneFill size={25} />
                  ): (
                    <RiSendPlaneLine size={25} />
                )}
            
            </NavLink> 
            <NavLink 
              to="/discover"
              className="navbar__link">
                {local === "/discover" ? (
                    <AiFillCompass size={25} />
                  ): (
                    <AiOutlineCompass size={25} />
                )}
            </NavLink> 
            
            <NavLink 
              to="/likes"
              className="navbar__link">
                {local === "/likes" ? (
                    <AiFillHeart size={25} />
                  ): (
                    <AiOutlineHeart size={25} /> 
                )}
            </NavLink> 
          </div>

        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ):(
          <div className="main__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
        </div>

        <Route exact path="/">
          <Redirect to="/feed" />
        </Route>
        <Route exact path="/feed"
            render={() => (
							<Main
                username={username} user={user} setLocal={setLocal}
							/>
						)} />
        <Route exact path="/post"
            render={() => (
							<LoadPage
                setLocal={setLocal}
							/>
						)} />

        <Route exact path="/messenger"
            render={() => (
							<Messenger
                setLocal={setLocal}
							/>
						)} />
        <Route exact path="/discover"
            render={() => (
              <Discover
                setLocal={setLocal}
              />
            )} />
        <Route exact path="/likes"
            render={() => (
              <LikePage
                setLocal={setLocal}
              />
            )} />

        

      </div>
    </Router>
  );
}

export default App;
