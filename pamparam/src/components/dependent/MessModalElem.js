import React from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 

function MessModalElem({ displayName, fullName }) {

    return (
        <div className="MessModalElem">
            <div className="MessModalElem__Left">
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
            <label className="MessModalElem__checkbox__div">
                <input type="checkbox"></input>
                <span className="MessModalElem__checkmark"></span>
            </label>
        </div>
    )
}

export default MessModalElem
