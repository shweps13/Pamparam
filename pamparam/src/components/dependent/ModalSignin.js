import React from 'react'
import logo from '../../materials/logo.png'
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import '../../styles/Modal.css'


function ModalSignin({ openSignIn, setOpenSignIn, modalStyle, classesStyle, email, setEmail, password, setPassword, signIn }) {
    return (
        <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classesStyle}>
          <center>
            <img src={logo} className="modal__modalImage" alt="logo"/>
          </center>
          <form className="modal__signup">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
    )
}

export default ModalSignin
