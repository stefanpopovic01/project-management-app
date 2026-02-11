import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="frame">
        <div className="hero-content">
          <h1>Manage projects.<br />Keep your team aligned.</h1>
          <p>
            Plan work, assign tasks, and track progress with a clear, visual workflow.
          </p>
          <div className="hero-buttons">
            <button className="btn primary">Get Started</button>
            <button className="btn outline">Learn More</button>
          </div>
        </div>

        <div className="hero-illustration">
          <div className="mock-board">
            <div className="column planning">
              <h4>Planning</h4>
              <div className="task">Define scope</div>
              <div className="task">Assign team</div>
            </div>
            <div className="column in-progress">
              <h4>In Progress</h4>
              <div className="task">Develop features</div>
              <div className="task">Code review</div>
            </div>
            <div className="column completed">
              <h4>Completed</h4>
              <div className="task done">Project kickoff</div>
              <div className="task done">Setup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
