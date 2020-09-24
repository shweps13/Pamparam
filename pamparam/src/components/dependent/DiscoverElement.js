import React, { useState } from 'react';

import { getModalStyle, useStyles } from '../../materials/modalStyles.js';
import ModalDiscover from '../dependent/ModalDiscover.js';

function DiscoverElement({ id, imageUrl, alt }) {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [openPost, setOpenPost] = useState(false);

    const styles = {
        backgroundImage: `url(${imageUrl})`
      };

    return (
    <div className="discover__image">
        <div style={styles} className="discover__sideCrop" onClick={() => {setOpenPost(true)}}>
            {/* <img src={imageUrl} alt={`${alt}'s post`} /> */}
            <ModalDiscover openPost={openPost} setOpenPost={setOpenPost} modalStyle={modalStyle} classesStyle={classes.paper} />
        </div>
    </div>
    )
}

export default DiscoverElement
