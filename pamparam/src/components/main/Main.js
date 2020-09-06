import React, { useState, useEffect } from 'react';
import '../../styles/Main.css';
import Post from './Post.js';
import { db } from '../../materials/firebase'
import ImageUpload from './ImageUpload.js';
import { useLocation } from 'react-router-dom';

function Main({ user, setLocal }) {
  const [posts, setPosts] = useState([]);
  let location = useLocation()

  // Pool data from the Firebase DB
  useEffect(() => {
    // sorting our images with .orderBy
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // pull data everytime when new post was added to the DB
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);


  useEffect(
    () => {
      setLocal(location.pathname)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className="main">

      <div className="main__posts">
        {
          posts.map(({ id, post }) => (
            <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>
      
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Login to upload</h3>
      )}


    </div>
  );
}

export default Main;
