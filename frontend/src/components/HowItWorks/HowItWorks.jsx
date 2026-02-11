import "./HowItWorks.css";
import LandingTitle from "../LandingTitle/LandingTitle";

export default function HowItWorks() {
  return (
    <section className="hiw-section">
      <div className="hiw-frame">
        <LandingTitle h1={"How It Works"} p={"Track tasks, collaborate with your team, and move work through Planning, In Progress, and Completed stages effortlessly."}/>

        <div className="hiw-board">
          <div className="hiw-column hiw-planning">
            <h4>Planning</h4>
            <div className="hiw-task">Define scope</div>
            <div className="hiw-task">Set deadlines</div>
          </div>

          <div className="hiw-column hiw-inprogress">
            <h4>In Progress</h4>
            <div className="hiw-task">Develop features</div>
            <div className="hiw-task">Code review</div>
          </div>

          <div className="hiw-column hiw-completed">
            <h4>Completed</h4>
            <div className="hiw-task hiw-done">Project kickoff</div>
            <div className="hiw-task hiw-done">Initial setup</div>
          </div>
        </div>
      </div>
    </section>
  );
}
