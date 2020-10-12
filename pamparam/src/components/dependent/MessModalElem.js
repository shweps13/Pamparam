import React from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 

function MessModalElem({ displayName, fullName }) {

    return (
        <div className="MessModalElem">
            <img src={noAvatar} alt='user avatar' />

            {fullName ? (
                <div className="MessModalElem__body">
                    <strong>{displayName.toLowerCase()}</strong>
                    <p>{fullName}</p>
                </div>
            ):(
                <div className="MessModalElem__body__noFull">
                    <strong>{displayName.toLowerCase()}</strong>
                </div>
            )}

            
        </div>
    )
}

export default MessModalElem
