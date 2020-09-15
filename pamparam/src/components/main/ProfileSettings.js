import React, { useState, useEffect } from 'react';
import userPic from '../../materials/loginPlease.jpg';
import '../../styles/ProfileSettings.css';
import firebase from 'firebase';
import { auth, db } from '../../materials/firebase';
import { useLocation } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getModalStyle, useStyles } from '../../materials/modalStyles.js';
import ModalDelUser from '../../components/dependent/ModalDelUser.js';
import ModalChangepass from '../../components/dependent/ModalChangepass.js';

import { FaCheckCircle } from 'react-icons/fa';

// TODO next:
// Change picture function
//     => profile update
//     => db update
// Delete picture function
// drag`n`drop ??
// user avatar to menu

// change result action in passwd update

// forgot passwd feature

function ProfileSettings({ setLocal }) {
    let location = useLocation()

    useEffect(
        () => {
            setLocal(location.pathname)  
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    const [user, setUser] = useState(null)
    const [userDbData, setUserDbData] = useState(null)
    const [userDataUpdate, setUserDataUpdate] = useState(false)
    

    // taking auth and db user data
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

                    // import data to hooks
                        setNewusername(authUser.displayName)
                        setNewemail(authUser.email)

                    if (doc.data().fullName !== undefined) {
                        setNewfullname(doc.data().fullName)
                    }
                    if (doc.data().webpage !== undefined) {
                        setNewpage(doc.data().webpage)
                    }
                    if (doc.data().bio !== undefined) {
                        setNewbio(doc.data().bio)
                    }
                    if (doc.data().phoneNumber !== undefined) {
                        setNewphone(doc.data().phoneNumber)
                    }
                    if (doc.data().gender !== undefined) {
                        setNewgender(doc.data().gender)
                    }

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
      }, [userDataUpdate]);

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
    const [changingProfile, setChangingProfile] = useState(false);
    const [profileDone, setProfileDone] = useState(false);

    const changeProfile = (event) => {
        event.preventDefault();
        setChangingProfile(true);

        // checking difference between new and old data
        let oldData = [user.displayName, userDbData.fullName, userDbData.webpage, userDbData.bio, user.email, userDbData.phoneNumber, userDbData.gender];
        let newData = [newUsername, newfullname, newpage, newbio, newemail, newphone, newgender];
        const paramData = ['displayName', 'fullName', 'webpage', 'bio', 'email', 'phoneNumber', 'gender'];
        let objChange = {};
        let continueChange = false;

        var i;
        for (i = 0; i < newData.length; i++) {
            if (newData[i] === null || newData[i] === '') { 
                continue;
             } else {
                // push data to new array if so 
                objChange = {...objChange, ...Object.fromEntries([[paramData[i], newData[i]]]) } 
             }     
        }
        
        for (i = 0; i < newData.length; i++) {
            if (newData[i] !== oldData[i]) {
                continueChange = true;
            }
        }

        // if there is no data to change => stop function
        if (continueChange === false) {
            alert('There is no new data for a change! Fill something first!');
            setChangingProfile(false);
            return false
        }
        console.log(objChange)

        // [displayName, email] we need to jande not just in db, but on auth server
        // check if we need to work with auth server
        if (objChange.displayName !== undefined || objChange.email !== undefined) {
            // console.log('Working with auth')
            user.updateProfile(objChange).then(function() {
                // Update successful.
                console.log('Auth data was updated')
              }).catch(function(error) {
                // An error happened.
                console.log('Error with auth data updating', error)
              });
        }
        
        let closeDone = () => {
            setProfileDone(false)
        }

        // changing data in db now
        db.collection("users").doc(user.uid).set(objChange)
            .then(() => {
                console.log('Data in DB was updated')
                setChangingProfile(false)
                setProfileDone(true)
                setUserDataUpdate(!userDataUpdate)
                setTimeout(closeDone, 2000)

        })
            .catch((error) => {
                // console.error("Error removing document: ", error);
                alert('Something wrong happened, please try again...');
                return false
        });
    }       
    
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
                        setChangingPass(false);
                        return false
                    } else {
                        alert('Some trouble is happened. Please, try again later.');
                        setChangingPass(false);
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
                            {userDbData === null ? (
                                <input
                                placeholder="Username"
                                type="text"
                                value={newfullname}
                                onChange={(e) => setNewfullname(e.target.value)}
                                />
                            ): (
                                <input
                                placeholder={userDbData.fullName}
                                type="text"
                                value={newfullname}
                                onChange={(e) => setNewfullname(e.target.value)}
                                />
                            )}
                            <p>Help people discover your account by using the name you're known.</p>
                        </div>
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Webpage</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                            {userDbData === null ? (
                                <input
                                placeholder="Your personal page"
                                type="text"
                                value={newpage}
                                onChange={(e) => setNewpage(e.target.value)}
                                />
                            ): (
                                <input
                                placeholder={userDbData.webpage}
                                type="text"
                                value={newpage}
                                onChange={(e) => setNewpage(e.target.value)}
                                />
                            )}
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Bio</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <div className="profileSet__rightBlock">
                            {userDbData === null ? (
                                <textarea
                                placeholder="Few words about you"
                                type="text"
                                value={newbio}
                                onChange={(e) => setNewbio(e.target.value)}
                                rows="3"
                                />
                            ): (
                                <textarea
                                placeholder={userDbData.bio}
                                type="text"
                                value={newbio}
                                onChange={(e) => setNewbio(e.target.value)}
                                rows="3"
                                />
                            )}
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
                        {userDbData === null ? (
                            <input
                            placeholder="Your personal phone"
                            type="text"
                            value={newphone}
                            onChange={(e) => setNewphone(e.target.value)}
                            />
                        ): (
                            <input
                            placeholder={userDbData.phoneNumber}
                            type="text"
                            value={newphone}
                            onChange={(e) => setNewphone(e.target.value)}
                            />
                        )}
                    </Grid>

                    <Grid className="profileSet__leftColumn" item xs={5}>
                        <label>Gender</label>
                    </Grid>
                    <Grid className="profileSet__rightColumn" item xs={7}>     
                            {userDbData === null ? (
                                <input
                                placeholder="Any gender"
                                type="text"
                                value={newgender}
                                onChange={(e) => setNewgender(e.target.value)}
                                />
                            ): (
                                <input
                                placeholder={userDbData.gender}
                                type="text"
                                value={newgender}
                                onChange={(e) => setNewgender(e.target.value)}
                                />
                            )}
                    </Grid>
                    <Grid className="profileSet__leftColumn" item xs={5} />
                    <Grid className="profileSet__rightColumn" item xs={7}>
                        <div className='profileSet__changePass'>
                            {changingProfile ? (
                                <div className="profileSet__loaderChangePass">
                                    <CircularProgress size={20} />
                                </div>
                                ): (
                                    <button onClick={changeProfile} className="mainBtn">Submit</button>
                            )}
                            {profileDone ? (
                                <div className="profileSet__doneMessage">
                                    <FaCheckCircle  size={20}/>
                                    <strong>Data updated!</strong>
                                </div>    
                                ): (
                                <></>
                            )}
                        </div>
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
