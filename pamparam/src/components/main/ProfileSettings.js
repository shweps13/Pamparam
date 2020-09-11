import React, { useState, useEffect } from 'react';
import userPic from '../../materials/loginPlease.jpg';
import '../../styles/ProfileSettings.css';
import firebase from 'firebase';
import { auth, db } from '../../materials/firebase';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getModalStyle, useStyles } from '../../materials/modalStyles.js';
import ModalDelUser from '../../components/dependent/ModalDelUser.js';
import ModalChangepass from '../../components/dependent/ModalChangepass.js';



function ProfileSettings() {

    const [user, setUser] = useState(null)
    const [userDbData, setUserDbData] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            // user logged in
            console.log(authUser);
            setUser(authUser);
 
            db.collection('users').doc(authUser.uid).get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setUserDbData(doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });

          } else {
            // user logged out
            setUser(null);
          }
        })
        return () => {
          // cleanup actions
          unsubscribe();
        }
      }, []);

    const [newUsername, setNewusername] = useState('');
    const [newfullname, setNewfullname] = useState('');
    const [newpage, setNewpage] = useState('');
    const [newbio, setNewbio] = useState('');
    const [newemail, setNewemail] = useState('');
    const [newphone, setNewphone] = useState('');
    const [newgender, setNewgender] = useState('');

    const [oldpass, setOldpass] = useState('');
    const [newpass, setNewpass] = useState('');
    const [checkNewpass, setCheckNewpass] = useState('');

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [openDel, setOpenDel] = useState(false);
    
    const [changingPass, setChangingPass] = useState(false);
    const [openChange, setOpenChange] = useState(false);


            
    
    

    const cleanPass = () => {
        setOldpass('');
        setNewpass('');
        setCheckNewpass('');
    }

    const changePass = (event) => {
        event.preventDefault();

        // check that all forms are filled
        if (oldpass === '' || newpass === '' || checkNewpass === '') {
            alert('Fill all passwords first!');
        } else {
            setChangingPass(true);
            // check new passwords first
            if (newpass !== checkNewpass) {
                alert('New passwords are different. Please, retype it again!');
                setNewpass('');
                setCheckNewpass('');
                setChangingPass(false);
            } else {
                // checking reauthentication here (old password)

                // receiving credentials for reauthentication
                let credential = firebase.auth.EmailAuthProvider.credential(
                    user.email, 
                    oldpass
                );

                // asking server for reauthentication
                user.reauthenticateWithCredential(credential).then((res) => {
                    // console.log('Thats works!', res);
                    
                    // old pass works => continue to change pass
                    // console.log(user)
                    user.updatePassword(newpass).then(() => {
                        // Update successful.
                        console.log('Password chanched!');
                        cleanPass();
                        setChangingPass(false);
                        setOpenChange(true);
                      }).catch(function(error) {
                        console.log('Some error happened', error);
                        cleanPass()
                      });
                }).catch((error) => {
                    if (error.code === 'auth/wrong-password') {
                        alert('Old password is incorrect. Please, try again!');
                        setOldpass('');
                        return false
                    } else {
                        alert('Some trouble is happened. Please, try again later.');
                        // console.log(error)
                        return false   
                    }
                    // console.log('Some error', error);
                });
            }
        }
    }

    return (
    <div className="profileSet">

            {userDbData === null ? (
                <div>
                    <CircularProgress size={25} />
                </div>
            ): (
                <h3>{userDbData.email}</h3>
            )}

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
                            placeholder={user.displayName}
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
                            value={newfullname}
                            onChange={(e) => setNewfullname(e.target.value)}
                            />
                            <p>Help people discover your account by using the name you're known.</p>
                        </div>
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Webpage</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <input
                        placeholder="Username"
                        type="text"
                        value={newpage}
                        onChange={(e) => setNewpage(e.target.value)}
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
                            value={newbio}
                            onChange={(e) => setNewbio(e.target.value)}
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
                        placeholder={user.email}
                        type="email"
                        value={newemail}
                        onChange={(e) => setNewemail(e.target.value)}
                        />
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Phone number</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <input
                        placeholder={user.phoneNumber}
                        type="text"
                        value={newphone}
                        onChange={(e) => setNewphone(e.target.value)}
                        />
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Gender</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <input
                        placeholder="Username"
                        type="text"
                        value={newgender}
                        onChange={(e) => setNewgender(e.target.value)}
                        />
                    </Grid>
                    <Grid className="profileSet__leftColumn" item xs={5} />
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <button className="mainBtn">Submit</button>   
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

                        {changingPass ? (
                            <div className="profileSet__loaderChangePass">
                                <CircularProgress size={20} />
                            </div>
                            ): (
                            <button className="mainBtn" type="submit" onClick={changePass}>Change</button>   
                        )}

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
                        <button className="secBtn" onClick={() => {setOpenDel(true)}}>Delete</button>   
                    </Grid>

                    <ModalChangepass openChange={openChange} setOpenChange={setOpenChange} modalStyle={modalStyle} classesStyle={classes.paper} />
                    <ModalDelUser user={user} openDel={openDel} setOpenDel={setOpenDel} modalStyle={modalStyle} classesStyle={classes.paper} />
                </Grid>
            )}

        
        
    </div>
    )
}

export default ProfileSettings
