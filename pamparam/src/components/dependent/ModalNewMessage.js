import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import '../../styles/Modal.css';
import { GrClose } from 'react-icons/gr';
import CircularProgress from '@material-ui/core/CircularProgress';
import { db } from '../../materials/firebase.js';

import MessModalElem from './MessModalElem.js';

function ModalNewMessage({ modalMessageClick, setModalMessageClick, modalMessage, setModalMessage, modalStyle, classesStyle }) {

    // field that handle search field input
    const [userSearchField, setUserSearchField] = useState('');
    
    // function for closing and cleaning modal
    const closeMessageModal = () => {
        setUserSearchField('')
        setModalMessage(false)
        setModalMessageClick(false)
    }
    
    // hooks and var for search feature
    const [userSearchLoading, setUserSearchLoading] = useState(false);
    const [userSearchData, setUserSearchData] = useState([]);
    const [arrayholder, setArrayholder] = useState([]);
    
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

    useEffect(() => {
        console.log('arrayholder', arrayholder)
    }, [arrayholder])
    // useEffect(() => {
    //     console.log(userSearchData)
    // }, [userSearchData])
    useEffect(() => {
        searchFilter(userSearchField)
    }, [userSearchField])

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
                        <button>Next</button>
                    </div>      
                </div>      
                
                <div className="modalMessage__body__search">
                    <div className="modalMessage__body__search__field">
                        <div className="modalMessage__body__search__field__line">
                            <div className="modalMessage__body__search__field__line__to">
                                <h3>To:</h3>
                            </div>      
                            <div className="modalMessage__body__search__field__line__input">
                                <input 
                                    className="search__field__line__input"
                                    type="text"
                                    placeholder="Search..."
                                    value={userSearchField}
                                    onChange={(e) => setUserSearchField(e.target.value)}
                                />
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
                                {userSearchData.map((userData) => (
                                    <MessModalElem key={userData.id} id={userData.id} displayName={userData.displayName} />
                                ))}
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
