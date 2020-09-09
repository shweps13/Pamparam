import React from 'react';

import { CgProfile } from 'react-icons/cg';
import { RiSendPlaneLine, RiSendPlaneFill } from 'react-icons/ri';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { AiOutlineHome, AiFillHome, AiOutlineHeart, AiFillHeart, AiOutlineCompass, AiFillCompass} from 'react-icons/ai';


function MenuNavLink({ local, NavLink }) {

    return (
        <div className="app__headerButtons">  
        <NavLink 
          className="navbar__link"
          to="/feed">
            {local === "/feed" ? (
                <AiFillHome size={25} />
              ): (
                <AiOutlineHome size={25} />
            )}
        </NavLink> 
        <NavLink 
          className="navbar__link"
          to="/post">
            {local === "/post" ? (
                <BsPlusCircleFill size={25} />
              ): (
                <BsPlusCircle size={25} />
            )}
        </NavLink> 
        <NavLink 
          className="navbar__link"
          to="/messenger">
            {local === "/messenger" ? (
                <RiSendPlaneFill size={25} />
              ): (
                <RiSendPlaneLine size={25} />
            )}
        
        </NavLink> 
        <NavLink 
          to="/discover"
          className="navbar__link">
            {local === "/discover" ? (
                <AiFillCompass size={25} />
              ): (
                <AiOutlineCompass size={25} />
            )}
        </NavLink> 
        
        <NavLink 
          to="/likes"
          className="navbar__link">
            {local === "/likes" ? (
                <AiFillHeart size={25} />
              ): (
                <AiOutlineHeart size={25} /> 
            )}
        </NavLink> 
        <CgProfile size={25} />
      </div>
    )
}

export default MenuNavLink
