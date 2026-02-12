import "./HowItWorks.css";
import LandingTitle from "../LandingTitle/LandingTitle";

import { useRef } from "react";
import { useRevealAnimation, useSoftReveal } from "../../hooks/animations";

export default function HowItWorks() {

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  
  useSoftReveal(card1Ref, { delay: 0 });
  useSoftReveal(card2Ref, { delay: 0.15 });
  useSoftReveal(card3Ref, { delay: 0.3 });

  return (
    <section className="hiw-section">
      <div className="hiw-frame">
        <LandingTitle h1={"How It Works"} p={"Track tasks, collaborate with your team, and move work through Planning, In Progress, and Completed stages effortlessly."}/>

        <div className="hiw-board">
          <div className="hiw-column hiw-planning" ref={card1Ref}>
            <h4>Planning</h4>
            <div className="hiw-task">Define scope</div>
            <div className="hiw-task">Set deadlines</div>
          </div>

          <div className="hiw-column hiw-inprogress" ref={card2Ref}>
            <h4>In Progress</h4>
            <div className="hiw-task">Develop features</div>
            <div className="hiw-task">Code review</div>
          </div>

          <div className="hiw-column hiw-completed" ref={card3Ref}>
            <h4>Completed</h4>
            <div className="hiw-task hiw-done">Project kickoff</div>
            <div className="hiw-task hiw-done">Initial setup</div>
          </div>
        </div>
      </div>
    </section>
  );
}
