import React from 'react';
import logo from './logo.png'
import './App.css';
import Post from './Post.js';

function App() {
  return (
    <div className="app">

      <div className="app_header">
        <img src={logo} className="app_headerImage" alt='logo'/>
      </div>
      <Post />


    </div>
  );
}

export default App;
