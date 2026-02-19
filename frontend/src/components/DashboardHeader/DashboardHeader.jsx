import { React, useState} from 'react';
import './DashboardHeader.css'

import logo from '../../assets/logo.png'
import CreateProjectModal from '../CreateProjectModal/CreateProjectModal';

function DashboardHeader() {

const [activeDropdown, setActiveDropdown] = useState(null);

const toggleDropdown = (name) => {
  setActiveDropdown((prev) => (prev === name ? null : name));
};

const handleSearchChange = (e) => {
  const value = e.target.value;

  if (value.trim().length > 0) {
    setActiveDropdown("search");
  } else {
    setActiveDropdown(null);
  }
};

const [createProject, setCreateProject] = useState(false);

const onClose = () => {
  setCreateProject(!createProject);
}

  return (
    <div className="dashboard-h-container">
                 {createProject && (<CreateProjectModal onClose={onClose}/>)}
        <div className='dashboard-h-frame'>
            <div className='dashboard-h-logo'>
                <img src={logo} alt='logo'/>
            </div>
            <div className='dashboard-h-search'>
                <input type='text' placeholder='Search' onChange={handleSearchChange}></input>
                <button onClick={onClose}><i class="fa-solid fa-plus"></i> Create</button>
                <i class="fa-brands fa-sistrix"></i>

            {activeDropdown === "search" && (
            <div className='db-search-dropdown'>
                <div className="db-search-container">

                    <div className="db-search-user">
                    <div className="db-search-avatar">
                        <img src="#" alt="profile" />
                    </div>
                    <div className="db-search-info">
                        <span className="db-search-name">Marko Petrović</span>
                        <span className="db-search-username">@markop</span>
                    </div>
                    </div>

                    <div className="db-search-user">
                    <div className="db-search-avatar">
                        <img src="#" alt="profile" />
                    </div>
                    <div className="db-search-info">
                        <span className="db-search-name">Ana Jovanović</span>
                        <span className="db-search-username">@anaj</span>
                    </div>
                    </div>

                    <div className="db-search-user">
                    <div className="db-search-avatar">
                        <img src="#" alt="profile" />
                    </div>
                    <div className="db-search-info">
                        <span className="db-search-name">Nikola Ilić</span>
                        <span className="db-search-username">@nikolai</span>
                    </div>
                    </div>

                    <div className="db-search-user">
                    <div className="db-search-avatar">
                        <img src="#" alt="profile" />
                    </div>
                    <div className="db-search-info">
                        <span className="db-search-name">Jelena Marković</span>
                        <span className="db-search-username">@jelena.m</span>
                    </div>
                    </div>

                    <div className="db-search-user">
                    <div className="db-search-avatar">
                        <img src="#" alt="profile" />
                    </div>
                    <div className="db-search-info">
                        <span className="db-search-name">Stefan Kovačević</span>
                        <span className="db-search-username">@stefank</span>
                    </div>
                    </div>

                    <div className="db-search-user">
                    <div className="db-search-avatar">
                        <img src="#" alt="profile" />
                    </div>
                    <div className="db-search-info">
                        <span className="db-search-name">Milica Stojanović</span>
                        <span className="db-search-username">@milica_s</span>
                    </div>
                    </div>
                </div>
            </div>
            )}
            </div>
            <div className='dashboard-h-profile'>
                <i class="fa-regular fa-bell" onClick={() => toggleDropdown("notifications")}></i>
                {activeDropdown === "notifications" && (
                <div className="dh-notif-container">
                    <div className="dh-notif-header">
                        <span>Notifications</span>
                        <i className="fa-solid fa-bell"></i>
                    </div>
                    <div className="dh-notif-list">
                        <div className="dh-notif-item">
                        <div className="dh-notif-avatar">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="dh-notif-content">
                            <p className="dh-notif-text">
                            <strong>Marko Petrović</strong> assigned you a task
                            </p>
                            <span className="dh-notif-desc">
                            Design dashboard wireframes
                            </span>
                        </div>
                        </div>
                        <div className="dh-notif-item">
                        <div className="dh-notif-avatar">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="dh-notif-content">
                            <p className="dh-notif-text">
                            <strong>Ana Jovanović</strong> invited you to a project
                            </p>
                            <span className="dh-notif-desc">
                            Project: Mobile Banking App
                            </span>
                        </div>
                        </div>
                        <div className="dh-notif-item">
                        <div className="dh-notif-avatar">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="dh-notif-content">
                            <p className="dh-notif-text">
                            <strong>Nikola Ilić</strong> assigned you a task
                            </p>
                            <span className="dh-notif-desc">
                            Fix authentication bug
                            </span>
                        </div>
                        </div>
                        <div className="dh-notif-item">
                        <div className="dh-notif-avatar">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="dh-notif-content">
                            <p className="dh-notif-text">
                            <strong>Jelena Marković</strong> invited you to a project
                            </p>
                            <span className="dh-notif-desc">
                            Project: CRM Redesign
                            </span>
                        </div>
                        </div>
                    </div>
                    <div className="dh-notif-footer">
                        <a href="#">View all notifications</a>
                    </div>
                </div>
                )}

                <i class="fa-regular fa-circle-question" onClick={() => toggleDropdown("help")}></i>
                {activeDropdown === "help" && (
                <div className="dh-help-container">
                <div className="dh-help-header">
                    <span>Help & Support</span>
                    <i className="fa-solid fa-circle-question"></i>
                </div>

                <div className="dh-help-content">

                    <div className="dh-help-section">
                    <div className="dh-help-icon">
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="dh-help-text">
                        <p className="dh-help-title">Need help?</p>
                        <span className="dh-help-desc">
                        If you have any questions or issues, feel free to contact us at
                        <a href="mailto:email@example.com"> email@example.com</a>
                        </span>
                    </div>
                    </div>

                    <div className="dh-help-section">
                    <div className="dh-help-icon">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div className="dh-help-text">
                        <p className="dh-help-title">Having trouble?</p>
                        <span className="dh-help-desc">
                        If something isn’t working as expected, try refreshing the page
                        or logging out and back in.
                        </span>
                    </div>
                    </div>

                    <div className="dh-help-section">
                    <div className="dh-help-icon">
                        <i className="fa-solid fa-book-open"></i>
                    </div>
                    <div className="dh-help-text">
                        <p className="dh-help-title">Getting started</p>
                        <span className="dh-help-desc">
                        Create projects, assign tasks, and collaborate with your team
                        in one simple workspace.
                        </span>
                    </div>
                    </div>

                </div>

                <div className="dh-help-footer">
                    <span>We usually reply within 24 hours</span>
                </div>
                </div>
                )}

                <i class="fa-solid fa-gear"></i>
                <div className='dh-profile-logo' onClick={() => toggleDropdown("profile")}></div>
                {activeDropdown === "profile" && (
                    <div className='dh-profile-dropdown'>
                        <div className='dh-dropdown-profile'>
                            <div className='dh-dropdown-profile-frame'>
                                <div className='dh-dropdown-img'></div>
                                <div className='dh-dropdown-desc'>
                                    <h3>Stefan Popovic</h3>
                                    <p>stefanpopovicnew@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className='dh-dropdown-profile-a'>
                            <i class="fa-regular fa-user"></i>
                            <p>Profile</p>
                        </div>
                        <div className='dh-dropdown-profile-a'>
                            <i class="fa-solid fa-gear"></i>
                            <p>Account settings</p>
                        </div>
                        <div className='dh-dropdown-profile-a'>
                            <i class="fa-solid fa-user"></i>
                            <p>Switch accouts</p>
                        </div>
                        <div className='dh-dropdown-profile-a  dh-topline'>
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                            <p>Logout</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
  )
}

export default DashboardHeader;
