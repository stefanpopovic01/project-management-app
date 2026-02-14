import { React, useState} from 'react';
import { Link } from "react-router-dom";
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
              <Link to="/">Home</Link>
              <a href="#">Product</a>
              <a href="#">Docs</a>
              <a href="#">Contact</a>
            </div>

            <div className="nav-right">
              <button className="btn-text"><Link to="/login">Login</Link></button>
              <button className="btn-accent"><Link to="/register">Sing Up</Link></button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar;
