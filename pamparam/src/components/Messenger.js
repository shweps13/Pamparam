import React from 'react';

function Messenger(props) {

  return (
    <div className="messenger">
      <h3>Here will be text</h3>
      <h3>{props.info}</h3>
    </div>
  );
}

export default Messenger;
