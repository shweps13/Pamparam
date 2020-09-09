import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div>
        <button>
          Show menu
        </button>
        
        <div className="menu">
          <button> Menu item 1 </button>
          <button> Menu item 2 </button>
          <button> Menu item 3 </button>
        </div>
      </div>
    );
  }
}