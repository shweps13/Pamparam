import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

function Discover(props) {
    let location = useLocation()

    useEffect(
        () => {
        props.setLocal(location.pathname)
        },
        [location]
    )

    return (
    <div className="discover">
        <h3>Discover feature under development</h3>
    </div>
    )
}

export default Discover
