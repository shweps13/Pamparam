import React, { Component } from 'react';
import '../../styles/ProfileMenu.css';
import { Button } from '@material-ui/core';
import { auth } from '../../materials/firebase';

import { CgProfile } from 'react-icons/cg';
import { RiFlag2Line, RiSettings3Line } from 'react-icons/ri';


class Card extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    }
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }
  
  render() {
    return (
      <>
        <CgProfile size={25} onClick={this.showMenu}/>
        
        {
          this.state.showMenu
            ? (
              <div
                className="profileDropMenu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}> 
                <div className="profileDropMenu__pop">  
                <div className="profileDropMenu__popCorner" /> 
                    <div>
                        {this.props.user ? (
                            <div className="profileDropMenu__popLogged">
                                <div>
                                    <this.props.NavLink 
                                        to="/profile">
                                        <CgProfile size={20}/>
                                        Profile
                                    </this.props.NavLink> 
                                </div>
                                <div>
                                    <this.props.NavLink 
                                        to="/profile">
                                        <RiFlag2Line size={20}/>
                                        Saved
                                    </this.props.NavLink> 
                                </div>
                                <div>
                                    <this.props.NavLink 
                                        to="/profile">
                                        <RiSettings3Line size={20}/>
                                        Settings
                                    </this.props.NavLink> 
                                    </div>
                                <div>
                                <Button onClick={() => auth.signOut()}>Logout</Button>
                                </div>
                                
                            </div>
                        ):(
                        <div className="profileDropMenu__popNotLogged">
                            <Button onClick={() => this.props.setOpenSignIn(true)}>Sign In</Button>
                            <Button onClick={() => this.props.setOpen(true)}>Sign Up</Button>
                        </div>
                        )}
                    </div>
                </div>
              </div>
            )
            : (
              null
            )
        }
      </>
    );
  }
}

export default Card