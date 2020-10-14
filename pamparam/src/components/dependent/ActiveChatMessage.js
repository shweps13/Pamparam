import React from 'react';

function ActiveChatMessage({ message, userId, timestamp }) {

    return (
    <div className="activeChatMessage">
        <div className="activeChatMessage__content">
            <div/>
            <div>
                <p>{message}</p>
            </div>
        </div>
    </div>
    )
}

export default ActiveChatMessage
