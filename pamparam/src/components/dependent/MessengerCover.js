import React from 'react';
import MessageCover from '../../materials/MessageCover.png'; 

function Cover() {

    return (
    <div className="messenger__window__rightColumn__cover">
        <div className="messenger__window__rightColumn__cover__content">
            <img src={MessageCover}></img>
            <h3>Your Messages</h3>
            <p>Send private photos and messages to a friend or group</p>
            <button>Send Message</button>
        </div>
    </div>
    )
}

export default Cover
