import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Messenger.css';
import { BsPencilSquare } from 'react-icons/bs';

import Cover from '../dependent/MessengerCover.js';


function Messenger({ setLocal }) {
  let location = useLocation()

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
              <BsPencilSquare size={26} />
            </div>
          </div>
          <div className="messenger__window__leftColumn__chats">
          
          </div>

        </div>
        <div className="messenger__window__rightColumn">
          <Cover />
        </div>
      </div>
    </div>
  );
}

export default Messenger;
