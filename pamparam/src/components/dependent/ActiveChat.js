import React from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 
import { AiOutlineInfoCircle } from 'react-icons/ai';

function ActiveChat() {

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
        Azazaz
    </div>
    )
}

export default ActiveChat
