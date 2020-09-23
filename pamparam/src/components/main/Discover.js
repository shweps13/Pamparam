import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../styles/Discover.css';

import { db } from '../../materials/firebase';


function Discover({ user, setLocal }) {
    let location = useLocation();
    const [posts, setPosts] = useState([]);

    useEffect(
    () => {
        setLocal(location.pathname)  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // receiving all pictures data
    useEffect(() => {
        db.collection('posts').get().then(snapshot => {
          setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
          })));
        })
    }, []);

    return (
    <div className="discover">
        {user === null ? (
                <div className="discover__loading">
                    <CircularProgress size={100} />
                </div>
            ): (
                <>
                    <div className="discover__grid">
                        {
                            posts.map(({ id, post }) => (
                                <div class="discover__sideCrop">
                                    <img key={id} src={post.imageUrl} className="discover__image" alt={`${post.username}'s post`} />
                                </div>
                            ))
                        }
                    </div>
                    {console.log('Posts', posts)}
                </>
        )}
    </div>
    )
}

export default Discover
