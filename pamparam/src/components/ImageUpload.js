import React, { useState } from 'react';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import { db, storage } from '../materials/firebase.js';

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
        <div>
            <h3>Loading will be here</h3>

            <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
            
        </div>
    )
}

export default ImageUpload
