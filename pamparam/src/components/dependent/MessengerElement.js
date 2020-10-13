import React from 'react';
import usrPic from '../../materials/noAvatar.jpg'; 

function MessageElement({ id, usersIn, roomName, user, usersNames }) {

    // ability to get username of second user to show
    const opponentName = () => {
        var i
        for (i=0; i < usersIn.length; i++) {
            if (usersIn[i] !== user.uid) {
                return usersNames[i]
            }
        }
    }

    return (
    <div className="messenger__window__leftColumn__chats__element">
        <img src={usrPic} alt='user profile logo'></img>
        {typeof roomName === 'string' ? (
            <div>
                <p>{roomName}</p>
                <p>Some last message</p>
            </div>
            ):(
            <div>
                <p>{opponentName()}</p>
                <p>Some last message</p>
            </div>
        )}
        
    </div>
    )
}

export default MessageElement
