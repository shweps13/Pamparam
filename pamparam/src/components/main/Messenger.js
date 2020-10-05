import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Messenger.css';
import { BsPencilSquare } from 'react-icons/bs';

import Cover from '../dependent/MessengerCover.js';
import MessageElement from '../dependent/MessengerElement.js';


function Messenger({ setLocal }) {
  let location = useLocation()

  const [activeChat, setActiveChat] = useState(false);

  useEffect(
    () => {
      setLocal(location.pathname)
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className="messenger">
      <div className="messenger__window">
        <div className="messenger__window__leftColumn">
          <div className="messenger__window__leftColumn__header">
            <div className="messenger__window__leftColumn__header__content">
              <div/>
              <div>Direct</div>
              <BsPencilSquare size={26} onClick={() => {setActiveChat(!activeChat)}}/>
            </div>
          </div>
          <div className="messenger__window__leftColumn__chats">
            <MessageElement />
            <MessageElement />
            <MessageElement />
          </div>

        </div>
        <div className="messenger__window__rightColumn">
          { activeChat === false ? (
            <Cover setActiveChat={setActiveChat} />
          ):(
            <div>
              Ololo
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messenger;
