import React, { useState, useEffect } from 'react';
import logo from './logo.png'
import './App.css';
import Post from './Post.js';
import { db } from './firebase'

function App() {

  const [posts, setPosts] = useState([]);

  // Pool data from the Firebase DB
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      // pull data everytime when new post was added to the DB
      setPosts(snapshot.docs.map(doc => doc.data()));
    })
  }, []);

  return (
    <div className="app">

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>
      </div>
      
      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }


      

    </div>
  );
}

export default App;
