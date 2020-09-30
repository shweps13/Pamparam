import React, { useState, useEffect } from 'react';
import '../../styles/Modal.css';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import noAvatar from '../../materials/noAvatar.jpg';

import CommentDiscover from '../dependent/CommentDiscover.js'
import { db } from '../../materials/firebase';
import firebase from 'firebase';

function ModalDiscover({ user, openPost, setOpenPost, modalStyle, classesStyle, modalID }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    // function for checking posting date
    const dateFrom = (seconds) => {
        let timeStamp = Math.floor(Date.now() / 1000);
        let result = timeStamp - seconds // in seconds

        let days = result/86400
        let hours = result/3600
        let minutes = result/60

        if (days > 1) {
            let showDays = Math.floor(days)
                if (showDays === 1) {
                    return (`${showDays} day ago`)
                } else {
                    return (`${showDays} days ago`)
                }
        } else 
        if (days < 1 && hours > 1) {
            let showHours = Math.floor(hours)
                if (showHours === 1) {
                    return (`${showHours} hour ago`)
                } else {
                    return (`${showHours} hours ago`)
                }
        } else 
        if (hours < 1 && minutes > 1){
            let showMinutes = Math.floor(minutes)
                if (showMinutes === 1) {
                    return (`${showMinutes} minute ago`)
                } else {
                    return (`${showMinutes} minutes ago`)
                }
        } else
        if (minutes < 1){
            return (`A few seconds ago`)
        }
    }

    useEffect(() => {
        if (modalID.id) {
            db.collection('posts')
                .doc(modalID.id)
                .collection('comments')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map(doc => ({
                        id: doc.id,
                        commentData: doc.data()
                      })))
                });
        }
    
    }, [modalID.id]);


    const postComment = (event) => {
        event.preventDefault();

        db.collection('posts').doc(modalID.id).collection('comments').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            text: comment,
            username: user.displayName
        });
        setComment('');
    }

    const modalClose = () => {
        setOpenPost(false);
        setComment('');
    }


    return (
    <Modal open={openPost} onClose={() => modalClose()}>
        <div style={modalStyle} className={classesStyle}>
        {modalID === null ? (
                <div className="discover__loading">
                    <CircularProgress size={100} />
                </div>
            ): (
                <div className='discover__modal'>
                    <div className="discover__modalItem">
                        <div className="discover__modalImage">
                            <img src={modalID.post.imageUrl} alt={`${modalID.post.username}'s post`} />
                        </div>
                    </div>
                    <div className='discover__modalContent'>

                        <div className='discover__modalContent__header'>
                            <div className='discover__modalContent__headerContent'>
                                <img src={noAvatar} alt='User avatar' />
                                <strong>{modalID.post.username}</strong>
                            </div>
                        </div>

                        <div className='discover__modalContent__comments'>
                            <CommentDiscover dateFrom={dateFrom} seconds={modalID.post.timestamp.seconds} username={modalID.post.username} text={modalID.post.caption} />
                            {comments.map((comment) => (
                                <CommentDiscover dateFrom={dateFrom} seconds={comment.commentData.timestamp.seconds} key={comment.id} username={comment.commentData.username} text={comment.commentData.text} />
                            ))}                        
                        </div>

                        <div className='discover__modalContent__buttons'>
                            <h3>{dateFrom(modalID.post.timestamp.seconds)}</h3>   
                        </div>
                        
                        <div className='discover__modalContent__footer'>
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
                        
                    </div>
            </div>
         )}
            
            
        </div>
    </Modal>
    )
}

export default ModalDiscover
