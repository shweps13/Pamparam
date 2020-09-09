import React, { Component } from 'react';
import { CgProfile } from 'react-icons/cg';
import '../../styles/ProfileMenu.css'

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
                    <div> <p>Menu item 1</p> </div>
                    <div> <p>Menu item 2</p> </div>
                    <div> <p>Menu item 3</p> </div>
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