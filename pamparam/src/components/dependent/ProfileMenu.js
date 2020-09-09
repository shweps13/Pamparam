import React, { Component } from 'react';
import { CgProfile } from 'react-icons/cg';
import '../../styles/ProfileMenu.css';
import { Button } from '@material-ui/core';
import { auth } from '../../materials/firebase';



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
                    <div className="profileDropMenu__popCorner"></div> 
                        <div> 
                            {this.props.user ? (
                                <Button onClick={() => auth.signOut()}>Logout</Button>
                            ):(
                            <div className="main__loginContainer">
                                <Button onClick={() => this.props.setOpenSignIn(true)}>Sign In</Button>
                                <Button onClick={() => this.props.setOpen(true)}>Sign Up</Button>
                            </div>
                            )}
                        <p>Menu item 1</p>
                        <p>Menu item 2</p>
                        <p>Menu item 3</p> 
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