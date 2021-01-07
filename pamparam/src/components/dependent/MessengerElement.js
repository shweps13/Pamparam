import React from 'react';
import usrPic from '../../materials/noAvatar.jpg'; 

function MessageElement({ openedRoom, setOpenedRoom, id, usersIn, user, room}) {

    // ability to get username of second user to show
    const opponentName = () => {
        var i
        for (i=0; i < usersIn.length; i++) {
            if (usersIn[i] !== user.uid) {
                return room.data.usersInNames[i]
            }
        }
    }

    const sendRoom = () => {
        if (openedRoom.openedRoom === id) {
            return null
        } else {
            if (room.data.roomName) {
                setOpenedRoom({
                    opened: true,
                    openedRoom: id,
                    usersIn: usersIn,
                    usersInNames: room.data.usersInNames,
                    roomName: room.data.roomName
                })
            } else {
                setOpenedRoom({
                    opened: true,
                    openedRoom: id,
                    usersIn: usersIn,
                    usersInNames: room.data.usersInNames
                })
            }
        }
    }

    return (
    <div className="messenger__window__leftColumn__chats__element" onClick={() => {sendRoom()}}>
        <img src={usrPic} alt='user profile logo'></img>
        {typeof room.data.roomName === 'string' ? (
            <div>
                <p>{room.data.roomName}</p>
                <p>✎...</p>
            </div>
            ):(
            <div>
                <p>{opponentName()}</p>
                <p>✎...</p>
            </div>
        )}
        
    </div>
    )
}

export default MessageElement
