import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import '../../styles/Modal.css';
import { GrClose } from 'react-icons/gr';

import { db } from '../../materials/firebase.js';

function ModalNewMessage({ modalMessage, setModalMessage, modalStyle, classesStyle }) {

    // field that handle search field input
    const [userSearchField, setUserSearchField] = useState('');
    
    // function for closing and cleaning modal
    const closeMessageModal = () => {
        // setUserSearchField('')
        setModalMessage(false)
        makeRequest()
    }
    
    // hooks and var for search feature
    const [userSearchLoading, setUserSearchLoading] = useState(false);
    const [userSearchData, setUserSearchData] = useState([]);
    let arrayholder = [];
    
    // search function itself
    const makeRequest = () => {
        if (userSearchField !== '') {
            setUserSearchLoading(true)
            db.collection("users").where("displayName", "!=", false).get()
                .then(function(querySnapshot) {
                    setUserSearchData(
                        querySnapshot.docs.map((user) => ({
                            id: user.id,
                            displayName: user.data().displayName,
                            data: user.data(), 
                        }))
                    )
                })
          .catch(function(error) {
              console.log("Error getting active rooms with user: ", error);
          });

        } else {
            setUserSearchData([])
        }
    }

    useEffect(() => {
        console.log(userSearchData)
    }, [userSearchData])

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
                        <h3>Azaza</h3>
                        <h3>Azaza</h3>
                        <h3>Azaza</h3>
                    </div>      

                </div>      

            </div>      
        </div>
      </Modal>
    )
}

export default ModalNewMessage
