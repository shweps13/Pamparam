import React from 'react'
import deleteImg from '../../materials/userDelete.jpg';
import Modal from '@material-ui/core/Modal';
import '../../styles/Modal.css'


function ModalDelUser({ openDel, setOpenDel, modalStyle, classesStyle }) {

    const delAction = (event) => {
        event.preventDefault();
        console.log('Deleting')
    }

    return (
        <Modal open={openDel} onClose={() => setOpenDel(false)}>
        <div style={modalStyle} className={classesStyle}>
            <center>
                <img src={deleteImg} className="modal__deleteImg" alt="logo"/>
            </center>
            <div className="modal__body">
                <h2>Are you sure?</h2>
                <div className="modal__body__buttons">
                    <button className="secBtn" type="submit" onClick={delAction}>Delete</button>
                    <button className="thirdBtn" onClick={()=>{setOpenDel(false)}}>Cancel</button>
                </div>
            </div>
        </div>
      </Modal>
    )
}

export default ModalDelUser
