import React, {useState} from 'react';
import userPic from '../../materials/loginPlease.jpg';
import '../../styles/ProfileSettings.css';

import Grid from '@material-ui/core/Grid';


function ProfileSettings({user}) {
    const [newUsername, setNewusername] = useState('')


    console.log(user)

    return (
    <div className="profileSet">
        <Grid container spacing={2}>
            <Grid className="profileSet__header" item xs={12}>
                <img src={userPic} className="profileSet__userImage" alt="logo"/>
                <div>
                    <h2>barsik</h2>
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
                    <p>No worries, there is a lot of free nicknames.</p>
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
                    <input
                    placeholder="Username"
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewusername(e.target.value)}
                    />
                    <strong>Personal Information</strong>
                    <p>I would not recommend you to provide it. But you still can, if you want.</p>
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
                placeholder="Username"
                type="text"
                value={newUsername}
                onChange={(e) => setNewusername(e.target.value)}
                />
            </Grid>
            <Grid className="profileSet__leftColumn" item xs={5}>
                <label>New password</label>
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
                <label>Confirm new password</label>
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
                <div className="profileSet__changePass">
                    <button>Change</button>   
                    <button>Forgot password?</button>   
                </div>
            </Grid>

            <Grid className="profileSet__leftColumn" item xs={5}>
            </Grid>
            <Grid className="profileSet__rightColumn" item xs={7}>
                <div className="profileSet__rightBlock">
                    <strong>Account delete</strong>
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
        
    </div>
    )
}

export default ProfileSettings
