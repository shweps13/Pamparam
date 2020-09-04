import React from 'react';
import './App.css';

import Main from './components/Main.js';
import Messenger from './components/Messenger.js';

function App() {

  return (
    <div className="app">
      <Messenger />
      
      <Main />
    </div>
  );
}

export default App;
