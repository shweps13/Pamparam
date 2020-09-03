import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';

function Post({ username, caption, imageUrl }) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar" 
                    alt="Remy Sharp" 
                    src="/static/images/avatar/1.jpg" 
                />
                <h3>{username}</h3>
            </div>

            <img src={imageUrl} className="post__image" alt="Post" />
            
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

        </div>
    )
}

export default Post
