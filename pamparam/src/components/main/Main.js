import React, { useState, useEffect } from 'react';
import '../../styles/Main.css';
import Post from './Post.js';
import { db } from '../../materials/firebase';
import { useLocation } from 'react-router-dom';

function Main({ user, setLocal }) {

  const [page, setPage] = useState(3);
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeigth } = event.currentTarget;
    console.log('scrollTop', scrollTop)
    console.log('clientHeight', clientHeight)
    console.log('scrollHeigth', scrollHeigth)
    console.log('here!')
  }

  let location = useLocation();

  // Pool data from the Firebase DB
  useEffect(() => {
    setPostLoading(true);
    // sorting our images with .orderBy
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .limit(page)
      .get()
      .then(snapshot => {
        // receiving all data from 'posts' collection
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })));
      })

    setPostLoading(false);
  }, [page]);

  useEffect(
    () => {
      setLocal(location.pathname)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className="main">

      <div className="main__posts" onScroll={() => {handleScroll()}} >
        {
          posts.map(({ id, post }, index) => {
            console.log(index)
            return <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} seconds={post} />
          })
        }
      </div>
    </div>
  );
}

export default Main;
