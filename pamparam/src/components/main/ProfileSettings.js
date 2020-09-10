import React, {useState} from 'react';
import userPic from '../../materials/loginPlease.jpg';
import '../../styles/ProfileSettings.css';
import firebase from 'firebase';
import { auth, db } from '../../materials/firebase.js';


import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


function ProfileSettings({user}) {
    const [newUsername, setNewusername] = useState('')
    
    const [oldpass, setOldpass] = useState('')
    const [newpass, setNewpass] = useState('')
    const [checkNewpass, setCheckNewpass] = useState('')


    console.log(user)

    // function for repeat auth with pass
    const reauthentication = (event) => {
        event.preventDefault();

        // receiving credentials for reauthentication
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email, 
            oldpass
        );
        
        // asking server for reauthentication
        user.reauthenticateWithCredential(credential).then((res) => {
            // console.log('Thats works!', res)
            return true
        }).catch((error) => {
            // console.log('Some error', error)
            return false
        });
    }

    return (
    <div className="profileSet">

        {user === null ? (
                <div className="profileSet__comments">
                    <CircularProgress size={100} />
                </div>
            ): (
                <Grid container spacing={2}>
                    <Grid className="profileSet__header" item xs={12}>
                        <img src={userPic} className="profileSet__userImage" alt="logo"/>
                        <div>
                            <h2>{user.displayName}</h2>
                            <p>Change user avatar</p>
                        </div>
                    </Grid>
                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>User name</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <div className="profileSet__rightBlock">
                            <input
                            placeholder="Username"
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewusername(e.target.value)}
                            />
                        </div>
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Full name</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <div className="profileSet__rightBlock">
                            <input
                            placeholder="Username"
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewusername(e.target.value)}
                            />
                            <p>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                        </div>
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Webpage</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <input
                        placeholder="Username"
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewusername(e.target.value)}
                        />
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Bio</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <div className="profileSet__rightBlock">
                            <textarea
                            placeholder="Username"
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewusername(e.target.value)}
                            rows="3"
                            />
                            <strong>Personal Information</strong>
                        </div>
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Email</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <input
                        placeholder="Username"
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewusername(e.target.value)}
                        />
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Phone number</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <input
                        placeholder="Username"
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewusername(e.target.value)}
                        />
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Gender</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <input
                        placeholder="Username"
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewusername(e.target.value)}
                        />
                    </Grid>
                    <Grid className="profileSet__leftColumn" item xs={5} />
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <button>Submit</button>   
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Old password</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <input
                        type="password"
                        value={oldpass}
                        onChange={(e) => setOldpass(e.target.value)}
                        />
                    </Grid>
                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>New password</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <input
                        type="password"
                        value={newpass}
                        onChange={(e) => setNewpass(e.target.value)}
                        />
                    </Grid>
                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Confirm new password</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <input
                        type="password"
                        value={checkNewpass}
                        onChange={(e) => setCheckNewpass(e.target.value)}
                        />
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5} />
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <div className="profileSet__changePass">
                            <button onClick={reauthentication}>Change</button>   
                            <button>Forgot password?</button>   
                        </div>
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <div className="profileSet__rightBlock">
                            <strong>Account removal</strong>
                            <p>You can delete it and nobody will get your personal data anymore.</p>
                        </div>
                    </Grid>
                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Delete your account</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <button>Delete</button>   
                    </Grid>

                </Grid>
            )}

        
        
    </div>
    )
}

export default ProfileSettings
