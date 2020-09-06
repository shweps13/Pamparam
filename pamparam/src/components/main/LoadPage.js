import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';


function LoadPage({ setLocal }) {
    let location = useLocation()

    useEffect(
        () => {
            setLocal(location.pathname)  
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    return (
    <div className="loader">
        <h3>Loader feature under development</h3>
    </div>
    )
}

export default LoadPage
