import React, { useEffect, useState } from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 
import { AiOutlineInfoCircle, AiOutlineHeart } from 'react-icons/ai';
import { VscSmiley } from 'react-icons/vsc';
import { db } from '../../materials/firebase.js';

import Message from '../dependent/ActiveChatMessage.js';


function ActiveChat({ user, openedRoom, messageText, setMessageTest }) {

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('Send...', messageText)
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

    useEffect(() => {
        console.log('roomMessages', roomMessages)
    }, [roomMessages])

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

        <div className="messenger__window__rightColumn__activeChat__chatField">
            <div className="messenger__window__rightColumn__activeChat__chatField__content">
                {roomMessages.length === 0 ? (
                    <div className="messenger__window__rightColumn__activeChat__chatField__content__noMessages">
                        <p>You have no messages yet...</p>
                    </div>
                ):(
                    <>
                        {roomMessages.map((messageData) => (
                            <Message key={messageData.timestamp.seconds} timestamp={messageData.timestamp} message={messageData.message} userId={messageData.userId} />
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
                    <form className="post__message">
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
                                    onClick={sendMessage}
                                >Send</button>
                            </div>
                        )}
                    </form>
                        {messageText === '' ? (
                            <div className="messenger__window__rightColumn__activeChat__footer__line__heart">
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
