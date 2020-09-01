import React from 'react';
import logo from './logo.png'
import './App.css';
import Post from './Post.js';

function App() {
  return (
    <div className="app">

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>
      </div>
      <Post />


    </div>
  );
}

export default App;
