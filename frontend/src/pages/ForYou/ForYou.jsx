import "./ForYou.css";

import bgimg from '../../assets/migration.svg';

const ForYou = () => {
  return (
    <div className="fy-container">

      <h1 className="fy-title">For You</h1>

      {/* ---------------- Recent Projects ---------------- */}

      <div className="fy-section">
        <div className="fy-section-header">
          <h2>Recent Projects</h2>
          <div className="fy-pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>10</button>
          </div>
        </div>

        <div className="fy-projects-grid">

          <div className="fy-project-card">
            <div className="fy-project-icon">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div className="fy-project-content">
              <h3>Mobile Banking App</h3>
              <p className="fy-project-creator">Created by Marko Petrović</p>
              <p className="fy-project-desc">
                Development of a secure and modern banking experience.
              </p>
            </div>
          </div>

          <div className="fy-project-card">
            <div className="fy-project-icon">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <div className="fy-project-content">
              <h3>Analytics Dashboard</h3>
              <p className="fy-project-creator">Created by Ana Jovanović</p>
              <p className="fy-project-desc">
                Business intelligence dashboard for real-time metrics.
              </p>
            </div>
          </div>

          <div className="fy-project-card">
            <div className="fy-project-icon">
              <i className="fa-solid fa-globe"></i>
            </div>
            <div className="fy-project-content">
              <h3>Company Website</h3>
              <p className="fy-project-creator">Created by Nikola Ilić</p>
              <p className="fy-project-desc">
                Redesign and modernization of the main website.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- Recent Tasks ---------------- */}

      <div className="fy-section">
        <div className="fy-section-header">
          <h2>Recent Tasks</h2>
          <div className="fy-pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>10</button>
          </div>
        </div>

        <div className="fy-tasks-grid">

          <div className="fy-task-card">
            <div className="fy-task-left">
              <i className="fa-solid fa-check-circle"></i>
              <div>
                <p className="fy-task-title">Fix authentication bug</p>
                <span className="fy-task-project">Mobile Banking App</span>
              </div>
            </div>
            <span className="fy-task-status">In Progress</span>
          </div>

          <div className="fy-task-card">
            <div className="fy-task-left">
              <i className="fa-solid fa-code"></i>
              <div>
                <p className="fy-task-title">Implement landing page</p>
                <span className="fy-task-project">Company Website</span>
              </div>
            </div>
            <span className="fy-task-status">Pending</span>
          </div>

          <div className="fy-task-card">
            <div className="fy-task-left">
              <i className="fa-solid fa-database"></i>
              <div>
                <p className="fy-task-title">Optimize database queries</p>
                <span className="fy-task-project">Analytics Dashboard</span>
              </div>
            </div>
            <span className="fy-task-status">Completed</span>
          </div>

        </div>
      </div>

      <img className='fy-img' src={bgimg} />

    </div>
  );
};

export default ForYou;
