import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Modal.css';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import noAvatar from '../../materials/noAvatar.jpg';
import dateFrom from '../../materials/dateFrom.js';     // function for checking posting date

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

    // focus feature for comment icon in modal block
    const postInput = useRef(null)
    const handleFocus = () => {
        postInput.current.focus()
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

                        <div id='modalHeader' className='discover__modalContent__header'>
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
                                    <FaRegComment size={23} onClick={handleFocus}/>
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
                        
                            {user && (
                            <div className='discover__modalContent__footer'>
                                <form className="post__commentBox">
                                    <input 
                                        className="post__input"
                                        type="text"
                                        placeholder="Add a comment"
                                        ref={postInput}
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
                            </div>
                            )}
                        
                    </div>
            </div>
         )}
            
            
        </div>
    </Modal>
    )
}

export default ModalDiscover
