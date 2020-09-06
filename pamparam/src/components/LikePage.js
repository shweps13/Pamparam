import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

function LikePage({ setLocal }) {
    let location = useLocation()

    useEffect(
        () => {
            setLocal(location.pathname)  
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    return (
    <div className="likes">
        <h3>Likes feature under development</h3>
    </div>
    )
}

export default LikePage
