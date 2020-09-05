import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';


function Messenger(props) {
  let location = useLocation()

  useEffect(
    () => {
      props.setLocal(location.pathname)
    },
    [location]
  )

  return (
    <div className="messenger">
      <h3>Here will be text</h3>
    </div>
  );
}

export default Messenger;
