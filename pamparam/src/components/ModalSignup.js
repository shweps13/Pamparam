import React from 'react'
import logo from '../materials/logo.png'
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function ModalSignup({ open, setOpen, modalStyle, classesStyle, username, setUsername, email, setEmail, password, setPassword, signUp }) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classesStyle}>
          <center>
            <img src={logo} className="app__modalImage" alt="logo"/>
          </center>
          <form className="app__signup">
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
              <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
    )
}

export default ModalSignup
