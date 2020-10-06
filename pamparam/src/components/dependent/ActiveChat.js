import React from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 
import { AiOutlineInfoCircle, AiOutlineHeart } from 'react-icons/ai';
import { VscSmiley } from 'react-icons/vsc';

function ActiveChat({ messageText, setMessageTest }) {

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('Send...', messageText)
    }

    return (
    <div className="messenger__window__rightColumn__activeChat">
        <div className="messenger__window__rightColumn__activeChat__header">
            <div className="messenger__window__rightColumn__activeChat__header__content">
                <div>
                    <img src={noAvatar} alt='user avatar' />
                    <p>someusername777</p>
                </div>
                <AiOutlineInfoCircle size={24} />
            </div>
        </div>

        <div>

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
