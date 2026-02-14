import { React, useState} from 'react';
import './DashboardHeader.css'

import logo from '../../assets/logo.png'

function DashboardHeader() {

  return (
    <div className="dashboard-h-container">
        <div className='dashboard-h-frame'>
            <div className='dashboard-h-logo'>
                <img src={logo} alt='logo'/>
            </div>
            <div className='dashboard-h-search'>
                <input type='text' placeholder='Search'></input>
                <button><i class="fa-solid fa-plus"></i> Create</button>
                <i class="fa-brands fa-sistrix"></i>
            </div>
            <div className='dashboard-h-profile'>
                <i class="fa-regular fa-bell"></i>
                <i class="fa-regular fa-circle-question"></i>
                <i class="fa-solid fa-gear"></i>
                <div className='dh-profile-logo'></div>
            </div>
        </div>
    </div>
  )
}

export default DashboardHeader;
