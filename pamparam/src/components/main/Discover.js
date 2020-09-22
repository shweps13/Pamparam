import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../styles/Discover.css';

function Discover({ user, setLocal }) {
    let location = useLocation()

    useEffect(
    () => {
        setLocal(location.pathname)  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
    <div className="discover">
        {user === null ? (
                <div className="discover__loading">
                    <CircularProgress size={100} />
                </div>
            ): (
                <h3>Discover feature under development</h3>
        )}
    </div>
    )
}

export default Discover
