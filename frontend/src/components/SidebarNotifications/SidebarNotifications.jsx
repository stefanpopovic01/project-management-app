import "./SidebarNotifications.css";

const SidebarNotifications = () => {
  return (
    <div className="sn-container">

      <div className="sn-header">
        <h2>Notifications</h2>
      </div>

      <div className="sn-list">

        {/* PROJECT INVITE */}
        <div className="sn-item sn-invite">
          <div className="sn-avatar">
            <img src="#" alt="profile" />
          </div>

          <div className="sn-content">
            <p className="sn-title">
              <strong>Marko Petrović</strong> invited you to a project
            </p>
            <p className="sn-project">Mobile Banking App</p>
            <p className="sn-desc">
              Join the development team and collaborate on secure banking features.
            </p>

            <div className="sn-actions">
              <button className="sn-accept">Accept</button>
              <button className="sn-decline">Decline</button>
            </div>
          </div>
        </div>

        {/* TASK ASSIGNED */}
        <div className="sn-item">
          <div className="sn-avatar">
            <img src="#" alt="profile" />
          </div>

          <div className="sn-content">
            <p className="sn-title">
              <strong>Ana Jovanović</strong> assigned you a task
            </p>
            <p className="sn-project">Fix authentication bug</p>
            <p className="sn-desc">
              Resolve login issue related to token expiration.
            </p>
          </div>
        </div>

        {/* PROJECT INVITE */}
        <div className="sn-item sn-invite">
          <div className="sn-avatar">
            <img src="#" alt="profile" />
          </div>

          <div className="sn-content">
            <p className="sn-title">
              <strong>Nikola Ilić</strong> invited you to a project
            </p>
            <p className="sn-project">Analytics Dashboard</p>
            <p className="sn-desc">
              Help build real-time business intelligence metrics.
            </p>

            <div className="sn-actions">
              <button className="sn-accept">Accept</button>
              <button className="sn-decline">Decline</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SidebarNotifications;
