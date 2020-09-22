import React, { Component } from 'react';
import '../../styles/ProfileMenu.css';
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
        {this.props.user === null ? (
                <>
                <CgProfile style={{cursor: "pointer"}} size={25} onClick={this.showMenu}/>
                </>
            ): (
                <img src={this.props.user.photoURL} onClick={this.showMenu} className="profileDropMenu__avatar" alt="User avatar"/>
        )}
        
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
                                    <this.props.NavLink 
                                        to="/profile">
                                        <div>
                                            <CgProfile size={20}/>
                                            Profile
                                        </div>
                                    </this.props.NavLink> 
                                    <this.props.NavLink 
                                        to="/profile">
                                        <div>
                                            <RiFlag2Line size={20}/>
                                            Saved
                                        </div>
                                    </this.props.NavLink> 
                                    <this.props.NavLink 
                                        to="/settings">
                                        <div>
                                            <RiSettings3Line size={20}/>
                                            Settings
                                        </div>
                                    </this.props.NavLink> 
                                <div onClick={() => {auth.signOut(); this.props.redirect();}}>
                                    Logout
                                </div>
                                
                            </div>
                        ):(
                        <div className="profileDropMenu__popLogged">
                            <div style={{cursor: "pointer"}} onClick={() => this.props.setOpenSignIn(true)}>Sign In</div>
                            <div style={{cursor: "pointer"}} onClick={() => this.props.setOpen(true)}>Sign Up</div>
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