import React from 'react'
import logo from '../../materials/logo.png';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
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
            <img src={logo} className="modal__modalImage" alt="logo"/>
          </center>
            <Button type="submit" onClick={delAction}>Sign In</Button>
        </div>
      </Modal>
    )
}

export default ModalDelUser
