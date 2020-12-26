import React, { useState, useEffect } from 'react';
import '../../styles/Main.css';
import Post from './Post.js';
import { db } from '../../materials/firebase';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

function Main({ user, setLocal }) {

  const [page, setPage] = useState(5);
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  const [more, setMore] = useState(true);
  const [scrollerPage, setScrollerPage] = useState(0);
  
  const [pageLen, setPageLen] = useState(page);
  const [localPage, setLocalPage] = useState(0);

  

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


    // InfiniteScroll parameters
    const nextPage = () => {
      let pagepage = page + 5
      setPage(pagepage)
      setMore(true)
    }

    const loadFunc = (localpage) => {
      setMore(false)
      if (scrollerPage <= 3) {
        console.log('localpage', localpage, 'posts', posts.length)
        nextPage()
        console.log("scrollerPage", scrollerPage)
        if (localpage !== localPage && pageLen === posts.length) {
          setScrollerPage(scrollerPage + 1)
        } else {
          setScrollerPage(1)
        }
        setLocalPage(localpage)
        setPageLen(posts.length)
        return
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
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        
        {
          posts.map(({ id, post }) => {
            return <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} seconds={post} />
          })
        } 
      
      </InfiniteScroll>        
      </div>
    </div>
  );
}

export default Main;
