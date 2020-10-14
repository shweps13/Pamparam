import React from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 
import { AiOutlineInfoCircle, AiOutlineHeart } from 'react-icons/ai';
import { VscSmiley } from 'react-icons/vsc';

import Message from '../dependent/ActiveChatMessage.js';


function ActiveChat({ user, openedRoom, messageText, setMessageTest }) {

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('Send...', messageText)
    }

    const opponentName = () => {
        // console.log({
        //     openedRoom: openedRoom.openedRoom,
        //     usersIn: openedRoom.usersIn,
        //     usersInNames: openedRoom.usersInNames
        // })
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
                <Message />
                <Message />
                <Message />
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
