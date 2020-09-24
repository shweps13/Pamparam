import React from 'react'
import noAvatar from '../../materials/noAvatar.jpg';


function Comment({ dateFrom, username, text, comment }) {

    return (
    <div className='discover__modalContent__description'>
        <img src={noAvatar} alt='User avatar' />
        <div className='discover__modalContent__description__text'>
            <strong>{username}</strong>
            <p>{text}</p>
            <p>{dateFrom(comment.commentData.timestamp.seconds)}</p>
        </div>
    </div>
    )
}

export default Comment
