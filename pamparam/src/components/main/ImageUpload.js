import React, { useState } from 'react';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { db, storage } from '../../materials/firebase.js';
import '../../styles/ImageUpload.css';

import ProgressBar from '../dependent/ProgressBar.js';


function ImageUpload({ username }) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    // get the first file that was selected and put in to the hook
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {
        // get reference from firebase and put there image
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // error function
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside the DB
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(), // take server's time, that's will help us to sort images later
                            caption: caption,
                            imageUrl: url,
                            username: username
                        })

                        // cleaning load form after process
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    })
            }
        )

    };

    return (
        <div className='imageupload'>
            <div className='imageupload__progress'>
                <ProgressBar value={progress} />
            </div>

            <div className='imageupload__input'>
                <TextField
                    id="outlined-multiline-static"
                    label="Enter a caption"
                    multiline
                    fullWidth={true}
                    color='primary'
                    rowsMax={5}
                    variant="outlined"
                    value={caption}
                    onChange={event => setCaption(event.target.value)} 
                />
            </div>
            
            <div className='imageupload__file'>
                <label htmlFor="upload-photo">
                    <input type="file" 
                        style={{ display: 'none' }}
                        id="upload-photo"  
                        accept="image/*" 
                        onChange={handleChange} 
                    />
                    <Button variant="contained" component="span">
                        Choose picture
                    </Button>
                </label>
            </div>


            <Button onClick={handleUpload}>Upload</Button>
            
        </div>
    )
}

export default ImageUpload
