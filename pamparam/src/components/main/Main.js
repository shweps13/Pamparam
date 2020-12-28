import React, { useState, useEffect } from 'react';
import '../../styles/Main.css';
import Post from './Post.js';
import { db } from '../../materials/firebase';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

function Main({ user, setLocal }) {

  const [page, setPage] = useState(5);
  const [posts, setPosts] = useState([]);
  const [postCounter, setPostCounter] = useState(0);

  const [more, setMore] = useState(true);
  
  let location = useLocation();

  // Pool data from the Firebase DB
  useEffect(() => {
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
  }, [page]);

  useEffect(
    () => {
      // location operations
      setLocal(location.pathname)

      // getting count of posts from db
      db.collection('posts')
      .doc('counter')
      .get()
      .then(counter => {
        setPostCounter(counter.data().counter)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // InfiniteScroll parameters
    const nextPage = () => {
      let pagepage = page + 5
      setPage(pagepage)
      setMore(true)
    }

    const loadFunc = () => {
      setMore(false)
      if (posts.length < postCounter) {
        // console.log('posts', posts.length, 'counter', postCounter)
        nextPage()
      } else {
        setMore(false)
      }
    }
    // end of InfiniteScroll stuff

  return (
    <div className="main">
      <div className="main__posts">

      <InfiniteScroll
        dataLength={posts.length}
        next={loadFunc}
        hasMore={more}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        
        {posts.map(({ id, post }) => {
            return <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} seconds={post} />
        })} 
      
      </InfiniteScroll>        
      </div>
    </div>
  );
}

export default Main;
