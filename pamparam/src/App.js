import React, { useState, useEffect } from 'react';
import logo from './logo.png'
import './App.css';
import Post from './Post.js';
import { db } from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

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



  return (
    <div className="app">

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img src={logo} className="app__modalImage" alt="logo"/>
          </center>
        </div>
      </Modal>

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>
      </div>
      
      <Button onClick={() => setOpen(true)}>Sign Up</Button>

      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }


      

    </div>
  );
}

export default App;
