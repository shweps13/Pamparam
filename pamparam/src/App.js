import React, { useState, useEffect } from 'react';
import logo from './materials/logo.png'
import './App.css';
import Post from './components/Post.js';
import { db, auth } from './materials/firebase'
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { getModalStyle, useStyles } from './materials/modalStyles.js';


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
    db.collection('posts').onSnapshot(snapshot => {
      // pull data everytime when new post was added to the DB
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

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
  }
  
  const signIn = (event) => {
    event.preventDefault();
    
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }


  return (
    <div className="app">

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img src={logo} className="app__modalImage" alt="logo"/>
          </center>
          <form className="app__signup">
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img src={logo} className="app__modalImage" alt="logo"/>
          </center>
          <form className="app__signup">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>
      </div>
      
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ):(
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}

      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }


      

    </div>
  );
}

export default App;
