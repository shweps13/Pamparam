import React from 'react';
import passDone from '../../materials/passDone.jpg';
import Modal from '@material-ui/core/Modal';
import '../../styles/Modal.css';


function ModalNewMessage({ modalMessage, setModalMessage, modalStyle, classesStyle }) {


    return (
        <Modal open={modalMessage} onClose={() => setModalMessage(false)}>
        <div style={modalStyle} className={classesStyle}>
            
            <center>
                <img src={passDone} className="modal__deleteImg" alt="Are you sure?"/>
            </center>

            <div className="modal__body">
                <h2>Lets find someone to text</h2>
                <div className="modal__body__buttons">
                    <button className="mainBtnBig" onClick={()=>{setModalMessage(false)}}>Ok</button>
                </div>
            </div>      
        </div>
      </Modal>
    )
}

export default ModalNewMessage
