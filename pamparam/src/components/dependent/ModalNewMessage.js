import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import '../../styles/Modal.css';

import { GrClose } from 'react-icons/gr';


function ModalNewMessage({ modalMessage, setModalMessage, modalStyle, classesStyle }) {

    const [userSearch, setUserSearch] = useState('');

    const closeMessageModal = () => {
        setUserSearch('')
        setModalMessage(false)
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
                                    value={userSearch}
                                    onChange={(e) => setUserSearch(e.target.value)}
                                />
                            </div>      
                        </div>      
                    </div>      
                    <div className="modalMessage__body__search__results">
                    </div>      

                </div>      

            </div>      
        </div>
      </Modal>
    )
}

export default ModalNewMessage
