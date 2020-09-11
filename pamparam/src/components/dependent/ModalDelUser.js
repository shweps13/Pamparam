import React, { useState } from 'react'
import deleteImg from '../../materials/userDelete.jpg';
import Modal from '@material-ui/core/Modal';
import '../../styles/Modal.css';


function ModalDelUser({ openDel, setOpenDel, modalStyle, classesStyle }) {

    const [passField, setPassfield] = useState('');
    const [passdiv, setPassdiv] = useState(false);

    return (
        <Modal open={openDel} onClose={() => setOpenDel(false)}>
        <div style={modalStyle} className={classesStyle}>
            <center>
                <img src={deleteImg} className="modal__deleteImg" alt="logo"/>
            </center>
            
            {passdiv ? (
                    <div className="modal__body">
                        <h2>Are you sure?</h2>
                        <form className="modal__signup">
                            <input
                            placeholder="Password"
                            type="password"
                            value={passField}
                            onChange={(e) => setPassfield(e.target.value)}
                            />
                            <button type="submit">Delete</button>
                            <button className="thirdBtn" onClick={()=>{setOpenDel(false);
                                setPassdiv(false);}}>Cancel</button>
                        </form>
                    </div>     
                        ):(
                        <div className="modal__body">
                            <h2>Are you sure?</h2>
                            <div className="modal__body__buttons">
                                <button className="secBtn" type="submit" onClick={()=>{setPassdiv(true)}}>Delete</button>
                                <button className="thirdBtn" onClick={()=>{setOpenDel(false)}}>Cancel</button>
                            </div>
                        </div>   
                        )}
            
           
        </div>
      </Modal>
    )
}

export default ModalDelUser
