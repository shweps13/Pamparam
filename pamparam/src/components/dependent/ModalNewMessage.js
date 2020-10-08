import React from 'react';
import Modal from '@material-ui/core/Modal';
import '../../styles/Modal.css';

import { GrClose } from 'react-icons/gr';


function ModalNewMessage({ modalMessage, setModalMessage, modalStyle, classesStyle }) {


    return (
        <Modal open={modalMessage} onClose={() => setModalMessage(false)}>
        <div style={modalStyle} className={classesStyle} >
            <div className="modalMessage__body">
                <div className="modalMessage__body__header">
                    <div className="modalMessage__body__header__close">
                        <GrClose size={20} onClick={() => setModalMessage(false)} />
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
