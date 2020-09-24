import React from 'react';


function DiscoverElement({ id, imageUrl, alt, setOpenPost, setModalID }) {

    const styles = {
        backgroundImage: `url(${imageUrl})`
      };

    const pushData = () => {
        setOpenPost(true);
        setModalID(id);
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
