import "./VerticalNavbar.css";
import { useState } from "react";

import SidebarNotifications from "../SidebarNotifications/SidebarNotifications";

const VerticalNavbar = () => {

const [notificationMenu, setNotificationMenu] = useState(false);
  return (
    <nav className="dh-sidebar">
      <div className="dh-sidebar-inner">

        <div className="dh-sidebar-group">
          <a href="#" className="dh-sidebar-link">
            <div className="dh-sidebar-left">
                <i class="fa-solid fa-circle-user"></i>
              <span>For You</span>
            </div>
            <i className="fa-solid fa-chevron-right dh-sidebar-arrow"></i>
          </a>

          <a href="#" className="dh-sidebar-link">
            <div className="dh-sidebar-left">
              <i className="fa-solid fa-diagram-project"></i>
              <span>Projects</span>
            </div>
            <i className="fa-solid fa-chevron-right dh-sidebar-arrow"></i>
          </a>

          <a href="#" className="dh-sidebar-link" onClick={() => setNotificationMenu(!notificationMenu)}>
            <div className="dh-sidebar-left">
              <i className="fa-solid fa-bell"></i>
              <span>Notifications</span>
            </div>
            <i className="fa-solid fa-chevron-right dh-sidebar-arrow"></i>
          </a>

            {notificationMenu && (<SidebarNotifications/> )}

          <a href="#" className="dh-sidebar-link">
            <div className="dh-sidebar-left">
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </div>
            <i className="fa-solid fa-chevron-right dh-sidebar-arrow"></i>
          </a>
        </div>

        <div className="dh-sidebar-divider"></div>

        <div className="dh-sidebar-create">
          <a href="#" className="dh-sidebar-create-btn">
            <i className="fa-solid fa-plus"></i>
            <span>Create Project</span>
          </a>
        </div>

        <div className="dh-sidebar-recent">
          <p className="dh-sidebar-section-title">Recent Project</p>

          <div className="dh-sidebar-project">
            <div className="dh-sidebar-project-icon">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div className="dh-sidebar-project-info">
              <span className="dh-sidebar-project-name">
                Mobile Banking App
              </span>
              <span className="dh-sidebar-project-meta">
                12 active tasks
              </span>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default VerticalNavbar;
