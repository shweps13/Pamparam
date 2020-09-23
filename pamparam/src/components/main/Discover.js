import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../styles/Discover.css';

import { db } from '../../materials/firebase';


function Discover({ user, setLocal }) {
    let location = useLocation();
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState([]);

    // Fisher-Yates Algorithm
    const shuffle = (array) => {
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
            }
        return array;
    }
    
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

    useEffect(() => {
        // check this point in future lazy load
        setTotalPosts(totalPosts.concat(shuffle(posts)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[posts])


    return (
    <div className="discover">
        {totalPosts.length === 0 ? (
                <div className="discover__loading">
                    <CircularProgress size={100} />
                </div>
            ): (
                <>
                    <div className="discover__grid">
                        {
                            totalPosts.map(({ id, post }) => (
                                <div className="discover__image">
                                    <div className="discover__sideCrop">
                                        <img key={id} src={post.imageUrl} className="discover__image" alt={`${post.username}'s post`} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
        )}
    </div>
    )
}

export default Discover
