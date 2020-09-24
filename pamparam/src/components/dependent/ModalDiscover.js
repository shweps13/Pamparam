import React, { useState } from 'react';
import '../../styles/Modal.css';
import Modal from '@material-ui/core/Modal';


function ModalDiscover({ openPost, setOpenPost, modalStyle, classesStyle }) {

    return (
    <Modal open={openPost} onClose={() => setOpenPost(false)}>
        <div style={modalStyle} className={classesStyle}>
            <h3>Azaza</h3>
        </div>
    </Modal>
    )
}

export default ModalDiscover
