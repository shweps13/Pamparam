import React, { useEffect, useState } from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 

function MessModalElem({ id, displayName, fullName, userCheckBox, setUserCheckBox }) {

    // logical operations for putting data to parental hook with selected user
    const checkValueToHook = () => {
        if (userCheckBox.checked === true && userCheckBox.userId === id) {
            setUserCheckBox({
                userId: '',
                userName: '',
                checked: false
        })} else if (userCheckBox.checked === false || userCheckBox.checked === true){
            setUserCheckBox({
                userId: id,
                userName: displayName.toLowerCase(),
                checked: true
            })
        }
    }
    
    // true/false statements for checkbox rendering
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
    // eslint-disable-next-line
    }, [userCheckBox])

    return (
        <div className="MessModalElem">
            <div className="MessModalElem__Left" onClick={() => {checkValueToHook()}}>
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
