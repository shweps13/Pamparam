import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from './components/Main.js';
import Messenger from './components/Messenger.js';

function App() {

  const info = 'ololo'



  
  return (
    <Router>
      <div className="app">

        
        <Route exact path="/" component={Main} />
        <Route 
            exact 
            path="/messenger"
            render={() => (
							<Messenger
								info={info}
							/>
						)} />

      </div>
    </Router>
  );
}

export default App;
