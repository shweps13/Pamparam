import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import '../../styles/Modal.css';
import { GrClose } from 'react-icons/gr';
import CircularProgress from '@material-ui/core/CircularProgress';
import { db } from '../../materials/firebase.js';
import firebase from 'firebase';

import MessModalElem from './MessModalElem.js';

function ModalNewMessage({ setOpenedRoom, userID, modalMessageClick, setModalMessageClick, modalMessage, setModalMessage, modalStyle, classesStyle }) {

    // field that handle search field input
    const [userSearchField, setUserSearchField] = useState('');
    
    // function for closing and cleaning modal
    const closeMessageModal = () => {
        setUserSearchField('')
        setModalMessage(false)
        setModalMessageClick(false)
        cleanCheckBox()
    }
    
    // hooks and var for search feature
    const [userSearchLoading, setUserSearchLoading] = useState(false);
    const [userNewMessage, setUserNewMessage] = useState(false);
    const [userSearchData, setUserSearchData] = useState([]);
    const [arrayholder, setArrayholder] = useState([]);
    
    const [userCheckBox, setUserCheckBox] = useState({
        userId: '',
        userName: '',
        checked: false
    });
    
    const cleanCheckBox = () => {
        setUserCheckBox({
            userId: '',
            userName: '',
            checked: false
        })
    }

    // request function 
    const makeRequest = () => {
            setUserSearchLoading(true)
            db.collection("users").where("displayName", "!=", false).get()
                .then(function(querySnapshot) {
                    setUserSearchData(
                        querySnapshot.docs.map((user) => ({
                            id: user.id,
                            displayName: user.data().displayName,
                            fullName: user.data().fullName
                        }))
                    )      
                    setUserSearchLoading(false)
                })
          .catch(function(error) {
              console.log("Error getting users data: ", error);
          });
    }

    // request runner due to the modal opening
    useEffect(() => {
        if (modalMessageClick === true) {
            makeRequest()
        }
    }, [modalMessageClick])

    // filter function
    const searchFilter = (text) => {
        const newData = userSearchData.filter(item => {
            const itemData = `${item.displayName.toUpperCase()}`;

            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
        });
        setArrayholder(newData)
    }

    // implementation of livesearch
    useEffect(() => {
        searchFilter(userSearchField)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSearchField])

    // id generator
    const makeid = (length) => {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const newRoom = () => {
        const newId = makeid(20) // generating new id
        console.log('New room with ID [', newId, ']')
        setUserNewMessage(true) // hook data for 'user wait' effect rendering
        // creating new room
            db.collection("rooms").doc(newId).set({
                roomName: false,
                usersIn: [userID.uid, userCheckBox.userId],
                usersInNames: [userID.displayName, userCheckBox.userName]
            })
        // .then(function() {  
        // db.collection("rooms").doc('77777777').collection("messages").add({
        //         message: 'Ololo',
        //         name: userID.displayName,
        //         uid: userID.uid,
        //         timestamp: firebase.firestore.FieldValue.serverTimestamp()
        //     })
        // })

        // adding rooms to users profiles
        .then(function() {  
            db.collection("users").doc(userID.uid).update({
                chatRooms: firebase.firestore.FieldValue.arrayUnion(newId)
            })
        })
        .then(function() {  
            db.collection("users").doc(userCheckBox.userId).update({
                chatRooms: firebase.firestore.FieldValue.arrayUnion(newId)
            })
        })
        .then(function() {  
            setUserNewMessage(false) // hook for loader rendering
            closeMessageModal() 
            setOpenedRoom({
                opened: true,
                openedRoom: newId,
                usersIn: [userID.uid, userCheckBox.userId],
                usersInNames: [userID.displayName, userCheckBox.userName]
            }) // sending opened room data to parent component
        })
      .catch(function(error) {
          console.log("Error putting new chat data: ", error);
      });
    }

    return (
        <Modal open={modalMessage} onClose={() => closeMessageModal()}>
        <div style={modalStyle} className={classesStyle} >
            <div className="modalMessage__body">
                <div className="modalMessage__body__header">
                    <div className="modalMessage__body__header__close">
                        <GrClose size={20} onClick={() => closeMessageModal()} />
                    </div>      
                    <div className="modalMessage__body__header__title">
                        <h3>New Message</h3>
                    </div>      
                    <div className="modalMessage__body__header__next">
                        {userNewMessage === false ? (
                            <>
                                {userCheckBox.checked === true ? (
                                    <button className="modalMessage__body__header__next__activeBtn" onClick={() => newRoom()}>Next</button>
                                ) : (
                                    <button className="modalMessage__body__header__next__Btn">Next</button>
                                )}
                            </>
                        ):(
                            <>
                                <button className="modalMessage__body__header__next__Btn">
                                    <CircularProgress size={20} />
                                </button> 
                            </>
                        )}
                            
                    </div>      
                </div>      
                
                <div className="modalMessage__body__search">
                    <div className="modalMessage__body__search__field">
                        <div className="modalMessage__body__search__field__line">
                            <div className="modalMessage__body__search__field__line__to">
                                <h3>To:</h3>
                            </div>      
                            <div className="modalMessage__body__search__field__line__input">
                                {userCheckBox.checked === true ? (
                                    <div className="modalMessage__body__search__field__line__input__active">
                                        <div onClick={() => cleanCheckBox()}>
                                            <p>{userCheckBox.userName}</p>
                                        </div>
                                        <input 
                                            className="search__field__line__input__active"
                                            type="text"
                                            placeholder="Search..."
                                            value={userSearchField}
                                            onChange={(e) => setUserSearchField(e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <input 
                                            className="search__field__line__input"
                                            type="text"
                                            placeholder="Search..."
                                            value={userSearchField}
                                            onChange={(e) => setUserSearchField(e.target.value)}
                                        />
                                    </>
                                )}   
                                
                            </div>   
                        </div>      
                    </div>      
                    <div className="modalMessage__body__search__results">
                        { userSearchLoading === true ? (
                            <div className="modalMessage__loading">
                                <CircularProgress size={50} />
                            </div>
                        ):(
                            <>
                                { userSearchField === '' ? (
                                    <div className="modalMessage__mapContainer">
                                        {userSearchData.map((userData) => (
                                            <MessModalElem key={userData.id} id={userData.id} displayName={userData.displayName} fullName={userData.fullName} userCheckBox={userCheckBox} setUserCheckBox={setUserCheckBox} />
                                        ))}
                                    </div>
                                ):(
                                    <div className="modalMessage__mapContainer">
                                        {arrayholder.map((userData) => (
                                            <MessModalElem key={userData.id} id={userData.id} displayName={userData.displayName} fullName={userData.fullName} userCheckBox={userCheckBox} setUserCheckBox={setUserCheckBox} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>      

                </div>      

            </div>      
        </div>
      </Modal>
    )
}

export default ModalNewMessage
