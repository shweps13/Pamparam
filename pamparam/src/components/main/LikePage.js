import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import '../../styles/LikePage.css';
import inDev from '../../materials/inDev.png';

function LikePage({ setLocal }) {
    let location = useLocation()

    useEffect(
        () => {
            setLocal(location.pathname)  
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    return (
    <div className="likes">
        <img src={inDev} className='likes__ico' alt="Page in development"/>
        <h3>Likes feature under development...</h3>
    </div>
    )
}

export default LikePage
