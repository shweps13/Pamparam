import React, { useState, useEffect } from 'react';
import logo from './materials/logo.png'
import './App.css';
import Post from './components/Post.js';
import { db, auth } from './materials/firebase'
import { Button } from '@material-ui/core';
import { getModalStyle, useStyles } from './materials/modalStyles.js';
import ModalSignup from './components/ModalSignup.js'
import ModalSignin from './components/ModalSignin.js'
import ImageUpload from './components/ImageUpload.js'


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

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


  // Pool data from the Firebase DB
  useEffect(() => {
    // sorting our images with .orderBy
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // pull data everytime when new post was added to the DB
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

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
    <div className="app">

      <ModalSignup open={open} setOpen={setOpen} modalStyle={modalStyle} classesStyle={classes.paper} username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} signUp={signUp} />
      <ModalSignin openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} modalStyle={modalStyle} classesStyle={classes.paper} email={email} setEmail={setEmail} password={password} setPassword={setPassword} signIn={signIn} />

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ):(
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>
      
      <div className="app__posts">
        {
          posts.map(({ id, post }) => (
            <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>
      
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Login to upload</h3>
      )}

    </div>
  );
}

export default App;
