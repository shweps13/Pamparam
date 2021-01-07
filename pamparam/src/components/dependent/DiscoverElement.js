import React from 'react';


function DiscoverElement({ id, post, setOpenPost, setModalID }) {

    const styles = {
        backgroundImage: `url(${post.imageUrl})`
      };

    const pushData = () => {
        setOpenPost(true);
        setModalID({
            id: id,
            post: post
        });
    }

    return (
    <div className="discover__image">
        <div style={styles} className="discover__sideCrop" onClick={() => {pushData()}}>
            {/* <img src={imageUrl} alt={`${alt}'s post`} /> */}
        </div>
    </div>
    )
}

export default DiscoverElement
