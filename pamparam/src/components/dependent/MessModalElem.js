import React from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 

function MessModalElem({ displayName, fullName }) {

    return (
        <div className="MessModalElem">
            <img src={noAvatar} alt='user avatar' />
            <div className="MessModalElem__body">
                <strong>{displayName}</strong>
                <p>{fullName}</p>
            </div>
        </div>
    )
}

export default MessModalElem
