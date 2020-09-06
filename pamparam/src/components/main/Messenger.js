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
      <h3>Here will be text</h3>
    </div>
  );
}

export default Messenger;
