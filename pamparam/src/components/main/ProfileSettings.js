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
                <input
                placeholder="Username"
                type="text"
                value={newUsername}
                onChange={(e) => setNewusername(e.target.value)}
                />
            </Grid>

            <Grid className="profileSet__leftColumn" item xs={5}>
                <label>Full name</label>
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
                <input
                placeholder="Username"
                type="text"
                value={newUsername}
                onChange={(e) => setNewusername(e.target.value)}
                />
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
        </Grid>

    </div>
    )
}

export default ProfileSettings
