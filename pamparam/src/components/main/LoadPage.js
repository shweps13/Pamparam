import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import loginPic from '../../materials/loginPlease.jpg';
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
            <div className="loader_loginMessage"> 
                <img src={loginPic} className="loader_loginMessageCat" alt="Cat asking you to login"/>
                <h2>Login to post your pics</h2>
            </div>
        )}
    </div>
    )
}

export default LoadPage
