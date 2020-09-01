import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';

function Post() {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar" 
                    alt="Remy Sharp" 
                    src="/static/images/avatar/1.jpg" 
                />
                <h3>Shweps</h3>
            </div>

            <img src="https://www.mcgilltribune.com/wp-content/uploads/2014/01/doge.washingonexaminer.biz_-1000x500.jpg" 
            className="post__image" 
            alt="Post" />
            
            <h4 className="post__text"><strong>Shweps</strong> Lorem ipsum dolor sit amet</h4>

        </div>
    )
}

export default Post
