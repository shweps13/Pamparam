import React from 'react';
import usrPic from '../../materials/noAvatar.jpg'; 

function MessageElement({ id, usersIn, roomName }) {

    // ==> ability to get username of second user to show

    return (
    <div className="messenger__window__leftColumn__chats__element">
        <img src={usrPic} alt='user profile logo'></img>
        <div>
            <p>{roomName}</p>
            <p>Some last message</p>
        </div>
    </div>
    )
}

export default MessageElement
