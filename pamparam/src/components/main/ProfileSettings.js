import React from 'react';
import userPic from '../../materials/loginPlease.jpg';
import '../../styles/ProfileSettings.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


function ProfileSettings({user}) {
    
    console.log(user)

    return (
    <div className="profileSet">
        <Grid container spacing={1}>
            <Grid className="profileSet__header" item xs={12}>
                <img src={userPic} className="profileSet__userImage" alt="logo"/>
                <div>
                    <h2>barsik</h2>
                    <p>Change user avatar</p>
                </div>
            </Grid>
            <Grid item xs={4}>
                <Paper>xs=6</Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper>xs=6</Paper>
            </Grid>
        </Grid>
    </div>
    )
}

export default ProfileSettings
