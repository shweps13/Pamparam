import React, { useEffect } from 'react'
import noAvatar from '../../materials/noAvatar.jpg';


function Comment({ dateFrom, modalID, username, text, comment }) {

    useEffect(() => {
        console.log(comment)
    }, [comment])

    return (
    <div className='discover__modalContent__description'>
        <img src={noAvatar} alt='User avatar' />
        <div className='discover__modalContent__description__text'>
            <strong>{username}</strong>
            <p>{text}</p>
            <p>{dateFrom(modalID)}</p>
        </div>
    </div>
    )
}

export default Comment
