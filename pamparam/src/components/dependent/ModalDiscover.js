import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Modal.css';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import noAvatar from '../../materials/noAvatar.jpg';

import CommentDiscover from '../dependent/CommentDiscover.js'
import { db } from '../../materials/firebase';
import firebase from 'firebase';

import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiFlag2Line, RiSendPlaneLine } from 'react-icons/ri';


function ModalDiscover({ user, openPost, setOpenPost, modalStyle, classesStyle, modalID }) {

    // hook that allows to scroll to the last comment
    var bottomComment = document.getElementById("commentBlock");
    const scrollToRef = (ref) => bottomComment.scrollTo(0, ref.current.offsetTop)  
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)
    
    // hooks with all comments from db and new comment
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    // function for checking posting date
    const dateFrom = (seconds) => {
        let localTimeStamp = Math.floor(Date.now() / 1000);
        let result
        if (seconds.timestamp) {
            result = localTimeStamp - seconds.timestamp.seconds // in seconds
        } else {
            return null
        }

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

    // receiving all new comments from DB by snapshot and put into the hook
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

    // post comment, clean comment field, scroll to the fresh comment
    const postComment = (event) => {
        event.preventDefault();

        db.collection('posts').doc(modalID.id).collection('comments').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            text: comment,
            username: user.displayName
        });
        setComment('');
        setTimeout(executeScroll, 200);
    }

    // cleaning feature
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

                        <div id='commentBlock' className='discover__modalContent__comments'>
                            <CommentDiscover dateFrom={dateFrom} seconds={modalID.post} username={modalID.post.username} text={modalID.post.caption} />
                            {comments.map((newComment) => (
                                <CommentDiscover dateFrom={dateFrom} seconds={newComment.commentData} key={newComment.id} username={newComment.commentData.username} text={newComment.commentData.text} />
                            ))}        
                            <div ref={myRef} /> 
                        </div>

                        <div className='discover__modalContent__buttons'>
                            <div className='discover__modalContent__buttons__line'>
                                <div className='discover__modalContent__buttons__left'>
                                    <AiOutlineHeart size={25}/>
                                    <FaRegComment size={23}/>
                                    <RiSendPlaneLine size={25}/>
                                </div>
                                <div className='discover__modalContent__buttons__right'>
                                    <RiFlag2Line size={24}/>
                                </div>
                            </div>
                            
                            <div className='discover__modalContent__buttons__posted'>
                                <p>Posted {dateFrom(modalID.post)}</p>   
                            </div>
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
