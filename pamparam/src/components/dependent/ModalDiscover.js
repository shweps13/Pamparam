import React, { useEffect } from 'react';
import '../../styles/Modal.css';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';


function ModalDiscover({ openPost, setOpenPost, modalStyle, classesStyle, modalID }) {

    useEffect(() => {
        console.log('modalID', modalID)
        console.log('modalID', modalID.id)
        console.log('modalID', modalID.post)
    }, [modalID])

    return (
    <Modal open={openPost} onClose={() => setOpenPost(false)}>
        <div style={modalStyle} className={classesStyle}>
        {modalID === null ? (
                <div className="discover__loading">
                    <CircularProgress size={100} />
                </div>
            ): (
                <div className='discover__modal'>
                <img src={modalID.post.imageUrl} className="discover__modalImage" alt={`${modalID.post.username}'s post`} />
                <div className='discover__modalContent'>
                    <h3>{modalID.post.username}</h3>
                </div>
            </div>
         )}
            
            
        </div>
    </Modal>
    )
}

export default ModalDiscover
