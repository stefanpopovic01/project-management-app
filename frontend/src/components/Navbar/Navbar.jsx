import './Navbar.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'

function Navbar() {

    const [featuresDropdown, setFeaturesDropdown] = useState(false);

  return (
        <div className='navbar-containter'>
            <div className='navbar-utils'>
                <div className='navbar-logo-wrap'>
                    <img src={logo} alt='logo'/> 
                </div>
                <a onMouseEnter={() => setFeaturesDropdown(true)}  onMouseLeave={() => setFeaturesDropdown(false)}>Features <i class={ featuresDropdown ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i> </a>
                <a>Solutions</a>
                <a>Guide</a>
                <a>Templates</a>
                <a>Pricing</a>
            
                {featuresDropdown && ( <div className='features-dropdown' onMouseEnter={() => setFeaturesDropdown(true)} onMouseLeave={() => setFeaturesDropdown(false)}>
                    <a>All features</a>
                    <a>Rovo in Jira</a>
                </div>
                )};
            </div>

            <div className='navbar-login'>
                <button>Get it free</button>
                <i class="fa-solid fa-magnifying-glass"></i>
                <a>Sign in</a>
            </div>
        </div>
  )
}

export default Navbar
