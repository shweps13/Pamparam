import React, { useEffect, useState } from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 

function MessModalElem({ id, displayName, fullName, userCheckBox, setUserCheckBox }) {

    const checkValueToHook = () => {
        if (userCheckBox.checked === false || userCheckBox.checked === true && userCheckBox.userId !== id){
            setUserCheckBox({
                userId: id,
                checked: true
            })
        } else if (userCheckBox.checked === true && userCheckBox.userId === id) {
            setUserCheckBox({
                userId: '',
                checked: false
            })
        }
    }
    
    const [checkState, setCheckState] = useState(false);
    
    useEffect(() => {
        console.log()
        if (userCheckBox.userId === id) {
            if (userCheckBox.checked === true) {
                setCheckState(true)
            } else {
                setCheckState(false)
            }
        } else {
            setCheckState(false)
        }
    }, [userCheckBox])

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
                <input 
                    type="checkbox" 
                    checked={checkState}
                    onChange={checkValueToHook} />
                <span className="MessModalElem__checkmark"></span>
            </label>
        </div>
    )
}

export default MessModalElem
