import { React, useState} from 'react';
import './Navbar.css'
import logo from '../../assets/logo.png'

function Navbar() {
  
  return (
    <div className="navbar-container">
        <div className='navbar-frame'>
          <div className="nav">
            <div className="nav-left">
              <img src={logo} alt="logo" />
            </div>

            <div className="nav-center">
              <a href="#">Home</a>
              <a href="#">Product</a>
              <a href="#">Docs</a>
              <a href="#">Contact</a>
            </div>

            <div className="nav-right">
              <button className="btn-text">Login</button>
              <button className="btn-accent">Sign up</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar;
