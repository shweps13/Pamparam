import React from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 


function ActiveChatMessage({ currentUser, message, userId, timestamp }) {

    const isLocalMessage = () => {
        if (userId === currentUser) {
            return true
        } else {
            return false
        }
    }

    return (
    <div className="activeChatMessage">
        {isLocalMessage() === true ? (
            <div className="activeChatMessage__content">
                <div/>
                <div>
                    <p>{message}</p>
                </div>
            </div>
        ):(
            <div className="activeChatMessage__content__remoteUser">
                <img src={noAvatar} alt='user avatar' />
                <div/>
                <div>
                    <p>{message}</p>
                </div>
            </div>
        )}
    </div>
    )
}

export default ActiveChatMessage
