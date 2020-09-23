import React from 'react';

function DiscoverElement({ id, imageUrl, alt }) {


    return (
    <div className="discover__image">
        <div className="discover__sideCrop">
            <img src={imageUrl} alt={`${alt}'s post`} />
        </div>
    </div>
    )
}

export default DiscoverElement
