import React, { useEffect } from 'react';
import '../../styles/Modal.css';
import Modal from '@material-ui/core/Modal';


function ModalDiscover({ openPost, setOpenPost, modalStyle, classesStyle, modalID }) {

    // useEffect(() => {
    //     console.log('modalID', modalID)
    // }, [modalID])

    return (
    <Modal open={openPost} onClose={() => setOpenPost(false)}>
        <div style={modalStyle} className={classesStyle}>
            <h3>Azaza</h3>
            <h3>Pew</h3>
            <h3>{modalID}</h3>
        </div>
    </Modal>
    )
}

export default ModalDiscover
