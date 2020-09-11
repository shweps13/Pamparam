import React from 'react';
import passDone from '../../materials/passDone.jpg';
import Modal from '@material-ui/core/Modal';
import '../../styles/Modal.css';


function ModalChangepass({ openChange, setOpenChange, modalStyle, classesStyle }) {


    return (
        <Modal open={openChange} onClose={() => setOpenChange(false)}>
        <div style={modalStyle} className={classesStyle}>
            <center>
                <img src={passDone} className="modal__deleteImg" alt="Are you sure?"/>
            </center>

            <div className="modal__body">
                <h2>Password changed successfully!</h2>
                <div className="modal__body__buttons">
                    <button className="mainBtnBig" onClick={()=>{setOpenChange(false)}}>Ok</button>
                </div>
            </div>   
        
           
        </div>
      </Modal>
    )
}

export default ModalChangepass
