import React, { useState, useEffect } from 'react';
import '../../styles/Main.css';
import Post from './Post.js';
import { db } from '../../materials/firebase';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

function Main({ user, setLocal }) {

  const [page, setPage] = useState(5);
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  const [more, setMore] = useState(true);
  const [scrollerPage, setScrollerPage] = useState(0);

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

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
     
    async function someFunction() {
     await delay(1000);
     await nextPage();
    }

    const loadFunc = (localpage) => {
      setMore(false)
      console.log('localpage', localpage)
      someFunction()
      return
    }
    // end of InfiniteScroll stuff


  return (
    <div className="main">

      <div className="main__posts">

      <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={more}
          initialLoad={false}
          threshold={0}
          loader={<div className="loader" key={0}>Loading ...</div>}
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
