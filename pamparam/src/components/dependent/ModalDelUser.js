import React, { useState } from 'react'
import deleteImg from '../../materials/userDelete.jpg';
import Modal from '@material-ui/core/Modal';
import '../../styles/Modal.css';

import firebase from 'firebase';
import { auth, db } from '../../materials/firebase.js';


function ModalDelUser({ user, openDel, setOpenDel, modalStyle, classesStyle }) {

    const [passField, setPassfield] = useState('');
    const [passdiv, setPassdiv] = useState(false);

    const userDelete = (event) => {
        event.preventDefault();

        // check that all forms are filled
        if (passField === '') {
            alert('Fill password field first!');
            return false
        } else {
            // receiving credentials for reauthentication
            let credential = firebase.auth.EmailAuthProvider.credential(
                user.email, 
                passField
            );

            // asking server for reauthentication
            user.reauthenticateWithCredential(credential).then((res) => {
                // console.log('Thats works!', res);
                // old pass works => continue to change pass

                user.delete().then(() => {
                        // User deleted
                        console.log('Deleted')
                  }).catch(function(error) {
                        // An error happened.
                        // console.log('Error', error)
                        alert('Something wrong happened, please try again...');
                        return false
                  });
                
            }).catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    alert('Old password is incorrect. Please, try again!');
                    setPassfield('');
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

    return (
        <Modal open={openDel} onClose={() => setOpenDel(false)}>
        <div style={modalStyle} className={classesStyle}>
            <center>
                <img src={deleteImg} className="modal__deleteImg" alt="logo"/>
            </center>
            
            {passdiv ? (
                <div className="modal__body">
                    <h3>Type your password then</h3>
                        <input
                        placeholder="Password"
                        type="password"
                        value={passField}
                        onChange={(e) => setPassfield(e.target.value)}
                        />
                        <div className="modal__body__buttons">
                            <button className="secBtn" onClick={userDelete} >Delete</button>
                            <button className="thirdBtn" onClick={()=>{
                                setOpenDel(false);
                                setPassdiv(false);
                                setPassfield('');
                                }}>Cancel</button>
                        </div>
                </div>     
                    ):(
                    <div className="modal__body">
                        <h2>Are you sure?</h2>
                        <div className="modal__body__buttons">
                            <button className="secBtn" type="submit" onClick={()=>{setPassdiv(true)}}>Delete</button>
                            <button className="thirdBtn" onClick={()=>{setOpenDel(false)}}>Cancel</button>
                        </div>
                    </div>   
            )}
        
           
        </div>
      </Modal>
    )
}

export default ModalDelUser
