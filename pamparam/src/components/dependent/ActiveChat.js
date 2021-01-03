import React, { useEffect, useState } from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 
import { AiOutlineInfoCircle, AiOutlineHeart } from 'react-icons/ai';
import { VscSmiley } from 'react-icons/vsc';

import { db } from '../../materials/firebase.js';
import firebase from 'firebase';

import Message from '../dependent/ActiveChatMessage.js';


function ActiveChat({ user, openedRoom, messageText, setMessageTest }) {

    // hook that allows to scroll to the last message
    var bottomMessage = document.getElementById("activeChatUnit");
    const scrollToRef = () => bottomMessage.scroll(0, 9999999)

    // id generator
    const makeid = (length) => {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // message sender
    const handleSubmit = (event) => {
        if (messageText && messageText !== '') {
            db.collection('rooms').doc(openedRoom.openedRoom).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: messageText,
                userId: user.uid,
                userName: user.displayName,
                localId: makeid(20),
                liked: false
            });
            setMessageTest('')
            setTimeout(scrollToRef, 200);
        } 
        event.preventDefault();
    }

    const sendHeart = () => {
        // user cannot send big heart twice in row
        if (roomMessages.length > 0) {
            if (roomMessages[roomMessages.length-1].message === '<3' && roomMessages[roomMessages.length-1].userId === user.uid) {
                console.log('here')
                return null
            } 
        }

        // user sending big heart
        if (openedRoom.openedRoom) {
            db.collection('rooms').doc(openedRoom.openedRoom).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: '<3',
                userId: user.uid,
                userName: user.displayName,
                localId: makeid(20),
                liked: false
            });
            setMessageTest('')
        } 
        
    }

    // function for opponent name rendering
    const opponentName = () => {
        if (openedRoom.usersIn.length > 0) {
            var i
            for (i=0; i < openedRoom.usersIn.length; i++) {
                if (openedRoom.usersIn[i] !== user.uid) {
                    if (openedRoom.usersInNames) {
                        return openedRoom.usersInNames[i]
                    } else 
                    if (openedRoom.roomName) {
                        return openedRoom.roomName
                    } else {
                        return openedRoom.usersIn[i]
                    }
                }
            }
        } else {
            return 'Chat room'
        }
    }

    // hooks for realtime messages receiving
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        if (openedRoom.openedRoom && openedRoom.openedRoom !== '') {
            // console.log(openedRoom.openedRoom)
            db.collection('rooms')
            .doc(openedRoom.openedRoom)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot(snapshot => (
                setRoomMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    }, [openedRoom])

    // useEffect(() => {
    //     console.log('roomMessages', roomMessages)
    // }, [roomMessages])

    return (
    <div className="messenger__window__rightColumn__activeChat">
        <div className="messenger__window__rightColumn__activeChat__header">
            <div className="messenger__window__rightColumn__activeChat__header__content">
                <div>
                    <img src={noAvatar} alt='user avatar' />
                    <p>{opponentName()}</p>
                </div>
                <AiOutlineInfoCircle size={24} />
            </div>
        </div>

        <div id='activeChatUnit' className="messenger__window__rightColumn__activeChat__chatField">
            <div className="messenger__window__rightColumn__activeChat__chatField__content">
                {roomMessages.length === 0 ? (
                    <div className="messenger__window__rightColumn__activeChat__chatField__content__noMessages">
                        <p>You have no messages yet...</p>
                    </div>
                ):(
                    <>
                        {roomMessages.map((messageData) => (
                            <Message openedRoom={openedRoom.openedRoom} currentUser={user.uid} localId={messageData.localId} key={messageData.localId} liked={messageData.liked} timestamp={messageData.timestamp} message={messageData.message} userId={messageData.userId} />
                        ))}
                    </>
                )}
            </div>
        </div>
        
        <div className="messenger__window__rightColumn__activeChat__footer">
            <div className="messenger__window__rightColumn__activeChat__footer__preline">
                <div className="messenger__window__rightColumn__activeChat__footer__line">
                    <div className="messenger__window__rightColumn__activeChat__footer__line__emoji">
                        <VscSmiley size={35} />
                    </div>
                    <form className="post__message" onSubmit={handleSubmit}>
                        <div className="messenger__window__rightColumn__activeChat__footer__line__field">
                            <input 
                                className="post__message__input"
                                type="text"
                                placeholder="Message..."
                                value={messageText}
                                onChange={(e) => setMessageTest(e.target.value)}
                            />
                        </div>
                        {messageText === '' ? (
                            <div style={{display: "none"}} />
                        ): (
                            <div className="messenger__window__rightColumn__activeChat__footer__line__button">
                                <button 
                                    className="post__message__button"
                                    type="submit"
                                    disabled={!messageText}
                                    onClick={handleSubmit}
                                >Send</button>
                            </div>
                        )}
                    </form>
                        {messageText === '' ? (
                            <div onClick={sendHeart} className="messenger__window__rightColumn__activeChat__footer__line__heart">
                                <AiOutlineHeart style={{display: "block"}} size={35} />
                            </div>
                        ): (
                            <div style={{display: "none"}} />
                        )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default ActiveChat
