import React from 'react';
import logo from './logo.png'
import './App.css';
import Post from './Post.js';

function App() {
  return (
    <div className="app">

      <div className="app__header">
        <img src={logo} className="app__headerImage" alt="logo"/>
      </div>
      <Post username="Shweps" caption="Lorem ipsum dolor sit amet" imageUrl="https://www.mcgilltribune.com/wp-content/uploads/2014/01/doge.washingonexaminer.biz_-1000x500.jpg" />
      <Post username="Vasya" caption="Ololo pew pew" imageUrl="https://www.newshub.co.nz/home/lifestyle/2019/08/the-top-five-cat-memes-of-all-time-rated/_jcr_content/par/image_1133466757.dynimg.full.q75.jpg/v1565234703951/v2-REDDIT-dank-memes-sad-cat-video-games-embed-080819.jpg" />
      <Post username="Petya" caption="Delta compression using up to 4 threads" imageUrl="https://e3.365dm.com/20/04/2048x1152/skynews-cat-meme-coronavirus_4967171.jpg?bypass-service-worker&20200411142734" />


    </div>
  );
}

export default App;
