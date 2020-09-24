import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../styles/Discover.css';
import DiscoverElement from '../dependent/DiscoverElement.js';

import ModalDiscover from '../dependent/ModalDiscover.js';
import { getModalStyle, useDiscoverStyles } from '../../materials/modalStyles.js';

import { db } from '../../materials/firebase';

// All next parts for [Discover] feature 
// ==> Post parts in modal
// ==> Ability to get render info and comments
// ==> Ability to add comments
// ==> Shuffle mixed styles alorithm
// ==> lazy load
// ==> mobile view / @media stylings


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


    const classes = useDiscoverStyles();
    const [modalStyle] = useState(getModalStyle);
    const [openPost, setOpenPost] = useState(false);
    const [modalID, setModalID] = useState({
        id: null,
        post: {
            caption: null,
            imageUrl: null,
            timestamp: null,
            username: null
        }
    });

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
                                <DiscoverElement setModalID={setModalID} setOpenPost={setOpenPost} key={id} id={id} post={post}/>
                            ))
                        }
                    </div>
                    <ModalDiscover modalID={modalID} openPost={openPost} setOpenPost={setOpenPost} modalStyle={modalStyle} classesStyle={classes.paper} />
                </>
        )}
    </div>
    )
}

export default Discover
