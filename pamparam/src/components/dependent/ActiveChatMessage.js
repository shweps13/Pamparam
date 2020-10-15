import React from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 

import { BsFillHeartFill } from 'react-icons/bs';

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
                {message === '<3' ? (
                    <div className="activeChatMessage__heart">
                        <BsFillHeartFill size={50} />
                    </div>
                ):(
                    <div>
                        <p>{message}</p>
                    </div>
                )}
            </div>
        ):(
            <div className="activeChatMessage__content__remoteUser">
                <img src={noAvatar} alt='user avatar' />
                <div/>
                {message === '<3' ? (
                    <div className="activeChatMessage__heart__remoteUser">
                        <BsFillHeartFill size={50}/>
                    </div>
                ):(
                    <div>
                        <p>{message}</p>
                    </div>
                )}
            </div>
        )}
    </div>
    )
}

export default ActiveChatMessage
