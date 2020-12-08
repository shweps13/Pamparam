import React, { useState } from 'react';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { db, storage } from '../../materials/firebase.js';
import '../../styles/ImageUpload.css';
import previewHolder from '../../materials/previewHolder.png';
import { FaCheckCircle } from 'react-icons/fa';
import { useHistory } from "react-router-dom";

import ProgressBar from '../dependent/ProgressBar.js';


function ImageUpload({ username }) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    // redirect function to main component after image posting
    let history = useHistory();
    const redirect = () => {
        return history.push("/feed");
    }

    // file verification block
    const fileMaxSize = 25000000; // in bytes
    const fileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
    const fileTypesArr = fileTypes.split(',').map((type) => {return type.trim()});

    const verifyFile = (file) => {
        if (file) {
            if (file.size > fileMaxSize) {
                alert('This file is not allowed. ' + file.size + 'bytes is too large.')
                return false
            }
            if (!fileTypesArr.includes(file.type)) {
                alert('This file is not allowed. Only images are allowed.')
                return false
            }
            return true
        }
    }

    // get the first file that was selected and put in to the hook
    const handleChange = (e) => {

        if (verifyFile(e.target.files[0]) === false) {
            return false
        } else
        if (e.target.files[0]) {
            // change original name to unique (to avoid issues in storage)
            var fileType = e.target.files[0].name.split('.').map((type) => {return type.trim()}); // extracting name and type
            var newFileName = fileType[0] + '_' + Math.round(new Date().getTime()/1000); // adding timestamp to the old file name
            var blob = e.target.files[0].slice(0, e.target.files[0].size, `image/${fileType[1]}`);  // destruct old file
            var fileToUpload = new File([blob], `${newFileName}.${fileType[1]}`, {type: `image/${fileType[1]}`}); // new file with new name and the same type
            // console.log(fileToUpload)

            setImage(fileToUpload);
            // preview functions
            let reader = new FileReader()
            reader.addEventListener('load', () => {
                // console.log(reader.result)
                setPreview(reader.result)
            }, false)

            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleUpload = (e) => {
        if (image === null) {
            alert('You need to choose file before uploading.')
            return false
        } else
        if (caption === '') {
            alert('Do not leave caption field empty.')
            return false
        } else

        setLoading(true)
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
                    .then(() => {
                        setDone(true)
                    })

                        // cleaning load form after process
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                        setLoading(false);
                        setTimeout(redirect, 1500); // redirect func exec here
                    })
            }
        )

    };

    return (
        <div className='imageupload'>

            <h1>Post image</h1>

            
            {preview !== null ?
                <div className='imageupload__preview'>
                    <img src={preview} className='imageupload__previewPic' alt="Preview"/>
                </div>
                    : 
                <div className='imageupload__placeholder'>
                    <img src={previewHolder} className='imageupload__placeholderPic' alt="Place of preview"/>
                </div>}
            
            {loading === true ?
                <div className='imageupload__progress'>
                    <ProgressBar value={progress} />
                </div>
                    : ''}
            
            {done === true ?
                <div className='imageupload__done'>
                    <FaCheckCircle className='imageupload__doneIcon' size={40}/>
                    <h3>Picture uploaded!</h3>
                </div>
                    : ''}
            
            <div className='imageupload__bottomBlock'>
                <div className='imageupload__input'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Enter a caption"
                        multiline
                        fullWidth={true}
                        color='primary'
                        rowsMax={3}
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
                        <Button variant="contained" size="small" component="span">
                            Choose picture
                        </Button>
                    </label>
                </div>
            
                <Button color="primary" 
                    variant="contained" 
                    component="span" 
                    size="large"
                    onClick={handleUpload}>
                    Upload
                </Button>

            </div>



            
        </div>
    )
}

export default ImageUpload
