import React, { useState } from 'react'
import { Button } from '@material-ui/core'

function ImageUpload() {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {
        
    }

    return (
        <div>
            <h3>Loading will be here</h3>

            <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
            
        </div>
    )
}

export default ImageUpload
