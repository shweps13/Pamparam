import React from 'react';

function DiscoverElement({ id, imageUrl, alt }) {

    const styles = {
        backgroundImage: `url(${imageUrl})`
      };

    return (
    <div className="discover__image">
        <div style={styles} className="discover__sideCrop">
            {/* <img src={imageUrl} alt={`${alt}'s post`} /> */}
        </div>
    </div>
    )
}

export default DiscoverElement
