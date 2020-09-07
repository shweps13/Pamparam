import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ImageUpload from './ImageUpload.js';

function LoadPage({ user, setLocal }) {
    let location = useLocation()

    useEffect(
        () => {
            setLocal(location.pathname)  
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    return (
    <div className="loader">
        {user?.displayName ? (
            <ImageUpload username={user.displayName} />
        ): (
            <h3>Login to upload</h3>
        )}
    </div>
    )
}

export default LoadPage
