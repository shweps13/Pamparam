import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';

function Post() {
    return (
        <div className="post">
            <h3>Shweps</h3>

            <img src="https://i.pinimg.com/564x/d4/c5/f7/d4c5f7f131d36a447c8baec15b083a32.jpg" 
            className="post__image" 
            alt="Avatar" />
            
            <h4 className="post__text"><strong>Shweps</strong> Lorem ipsum dolor sit amet</h4>

        </div>
    )
}

export default Post
