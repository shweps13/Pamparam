import React, { useState, useEffect } from 'react'
import '../../styles/Post.css'
import Avatar from '@material-ui/core/Avatar';
import { db } from '../../materials/firebase';
import noAvatar from '../../materials/noAvatar.jpg';
import firebase from 'firebase';
import Comment from './Comment.js'

function Post({ postId, username, user, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map(doc => ({
                        id: doc.id,
                        commentData: doc.data()
                      })))
                });
        }
    
        return () => {
            unsubscribe();
        };
    
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            text: comment,
            username: user.displayName
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar" 
                    alt="User avatar" 
                    src={noAvatar} 
                />
                <h3>{username}</h3>
            </div>

            <img src={imageUrl} className="post__image" alt="Post" />
            
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

        {comments.length === 0 ? (
            <div></div>
        ): (
            <div className="post__comments">
                {comments.map((comment) => (
                    <Comment key={comment.id} username={comment.commentData.username} text={comment.commentData.text} />
                ))}
            </div>
        )}

        {user && (
        <form className="post__commentBox">
            <input 
                className="post__input"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button 
                className="post__button"
                type="submit"
                disabled={!comment}
                onClick={postComment}
            >Post</button>
        </form>
        )}


        </div>
    )
}

export default Post
