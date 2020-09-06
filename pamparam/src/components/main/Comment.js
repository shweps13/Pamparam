import React from 'react'


function Comment({ username, text }) {
    
    return (
    <p>
        <strong>{username}</strong> {text}
    </p>
    )
}

export default Comment
