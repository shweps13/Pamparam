import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

function Profile({ setLocal }) {
    let location = useLocation()

    useEffect(
        () => {
            setLocal(location.pathname)  
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    return (
    <div className="profile">
        <h3>Profile page under development</h3>
    </div>
    )
}

export default Profile
