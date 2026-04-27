import { React, useState, useContext, useEffect } from 'react';
import './DashboardHeader.css'

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contex/authContext';
import { getNotifications } from '../../api/services/notificationServices';

import logo from '../../assets/logo.png'
import CreateProjectModal from '../CreateProjectModal/CreateProjectModal';
import { getUsers } from '../../api/services/userServices';

function DashboardHeader() {

const { user, logout } = useContext(AuthContext);

const id = user.id;

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

const navigate = useNavigate();

const navigateToProfile = () => {
    navigate(`/dashboard-profile/${id}`);
    setActiveDropdown(null);
}

const switchProfiles = () => {
    navigate("/login");
    logout();
}

const [notifications, setNotifications] = useState([]);
const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
const [loading, setLoading] = useState(false);

const handleSearchInput = (e) => {
  const value = e.target.value;
  setSearchTerm(value);

  if (value.trim().length > 0) {
    setActiveDropdown("search");
  } else {
    setActiveDropdown(null);
  }
};

useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
}, [searchTerm]);


const fetchNavbarData = async () => {
    try {
      setLoading(true);

      const [notificationRes, userRes] = await Promise.all([
        getNotifications(),
        getUsers(debouncedSearchTerm)
      ]);

      setNotifications(notificationRes.data);
      setUsers(userRes.data.users);

    } catch (err) {
      console.error("Error loading header data:", err);
    } finally {
      setLoading(false);
    }
};

useEffect(() => {
    if (id) {
      fetchNavbarData();
    }
}, [debouncedSearchTerm] );

const notificationDropdown = () => {
    toggleDropdown("notifications");
    fetchNavbarData();
};

  return (
    <div className="dashboard-h-container">
                 {createProject && (<CreateProjectModal onClose={onClose}/>)}
        <div className='dashboard-h-frame'>
            <div className='dashboard-h-logo'>
                <img src={logo} alt='logo' onClick={() => navigate("/")}/>
            </div>
            <div className='dashboard-h-search'>
                <input type='text' placeholder='Search' value={searchTerm} onChange={(e) => handleSearchInput(e)}></input>
                <button onClick={onClose}><i class="fa-solid fa-plus"></i> Create</button>
                <i class="fa-brands fa-sistrix"></i>

            {activeDropdown === "search" && (
            <div className='db-search-dropdown'>
                <div className="db-search-container">

            {users.map((userItem, index) => (
            <div className="db-search-user" key={index} onClick={() => {
                navigate(`/dashboard-profile/${userItem._id}`);
                setActiveDropdown(null);
                }}>
                <div className="db-search-avatar">
                {userItem.avatarUrl ? (
                    <img src={userItem.avatarUrl} alt="profile" />
                ) : (
                    <span className="header-initials hiSearch">
                    {(userItem.firstName?.[0].toUpperCase() || "") +
                        (userItem.lastName?.[0].toUpperCase() || "")}
                    </span>
                )}
                </div>

                <div className="db-search-info">
                <span className="db-search-name">
                    {(userItem.firstName || "") + " " + (userItem.lastName || "")}
                </span>
                <span className="db-search-username">
                    {userItem.email || ""}
                </span>
                </div>
            </div>
            ))}
                </div>
            </div>
            )}
            </div>
            <div className='dashboard-h-profile'>
                <i class="fa-regular fa-bell" onClick={() => notificationDropdown()}></i>
                {activeDropdown === "notifications" && (
                    <div className="dh-notif-container">
                    <div className="dh-notif-header">
                        <span>Recent notifications</span>
                        <i className="fa-solid fa-bell"></i>
                    </div>

                    <div className="dh-notif-list">
                        {notifications.slice(0, 10).map((notif, index) => (
                        <div className="dh-notif-item" key={index}>
                            <div className="dh-notif-avatar">
                            {notif.actor?.avatarUrl ? (
                                <img src={notif.actor.avatarUrl} alt="user-avatar" />
                            ) : (
                                <span className="header-initials">
                                {(notif.actor?.firstName?.[0].toUpperCase() || "") +
                                    (notif.actor?.lastName?.[0].toUpperCase() || "")}
                                </span>
                            )}
                            </div>

                            <div className="dh-notif-content">
                            <p className="dh-notif-text">
                                {notif.message}
                            </p>

                            </div>
                        </div>
                        ))}
                    </div>

                    <div className="dh-notif-footer">
                        {/* <a href="#">View all notifications</a> */}
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

                <i class="fa-solid fa-gear" onClick={() => navigate(`/dashboard-profile/${id}`)}></i>
                <div
                    className="dh-profile-logo"
                    onClick={() => toggleDropdown("profile")}
                    >
                    {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="user-logo" />
                    ) : (
                    <span className="header-initials">
                    {(user.firstName?.[0].toUpperCase() || "") + (user.lastName?.[0].toUpperCase() || "")}
                    </span>
                    )}
                </div>
                {activeDropdown === "profile" && (
                    <div className='dh-profile-dropdown'>
                        <div className='dh-dropdown-profile'>
                            <div className='dh-dropdown-profile-frame'>
                                <div className="dh-dropdown-img">
                                    {user.avatarUrl ? (
                                        <img src={user.avatarUrl} alt="user-logo" />
                                    ) : (
                                        <span className="header-initials hiLarger">
                                        {(user.firstName?.[0].toUpperCase() || "") + (user.lastName?.[0].toUpperCase() || "")}
                                        </span>
                                    )}
                                </div>
                                <div className='dh-dropdown-desc'>
                                    <h3>{user.firstName}{" "}{user.lastName}</h3>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className='dh-dropdown-profile-a' onClick={() => navigateToProfile()}>
                            <i class="fa-regular fa-user"></i>
                            <p>Profile</p>
                        </div>
                        <div className='dh-dropdown-profile-a' onClick={() => navigateToProfile()}>
                            <i class="fa-solid fa-gear"></i>
                            <p>Account settings</p>
                        </div>
                        <div className='dh-dropdown-profile-a' onClick={() => switchProfiles()}>
                            <i class="fa-solid fa-user"></i>
                            <p>Switch accouts</p>
                        </div>
                        <div className='dh-dropdown-profile-a  dh-topline' onClick={() => switchProfiles()}>
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
