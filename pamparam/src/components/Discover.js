import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

function Discover({ setLocal }) {
    let location = useLocation()

    useEffect(
    () => {
        setLocal(location.pathname)  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
    <div className="discover">
        <h3>Discover feature under development</h3>
    </div>
    )
}

export default Discover
