import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

function Messenger({ setLocal }) {
  let location = useLocation()

  useEffect(
    () => {
      setLocal(location.pathname)
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className="messenger">
      <div className="messenger__leftColumn">
        <div className="messenger__leftColumn__header">
          <h3>Direct</h3>
        </div>
        <div className="messenger__leftColumn__chats">
        
        </div>

      </div>
      <div className="messenger__rightColumn">
        <div className="messenger__rightColumn">
          <h3>Your Messages</h3>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
