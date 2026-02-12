import "./Hero.css";
import hero from '../../assets/hero1.png'

import { useRef } from "react";
import { useRevealAnimation, useSoftReveal } from "../../hooks/animations";

export default function Hero() {


  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  useSoftReveal(card1Ref, { delay: 0 });
  useSoftReveal(card2Ref, { delay: 0.15 });
  useSoftReveal(card3Ref, { delay: 0.3 });
  useSoftReveal(card4Ref, { delay: 0.45 });



  return (
    <section className="hero-section">
      <div className="frame">
        <div className="hero-content">
          <h1 ref={card1Ref}><span>Manage</span> projects.<br />Keep your <span>team</span> aligned.</h1>
          <p ref={card2Ref}>
            Plan work, assign tasks, and track progress with a clear, visual workflow.
          </p>
          <div className="hero-buttons">
            <button className="btn primary" ref={card3Ref}>Get Started</button>
            <button className="btn outline" ref={card4Ref}>Learn More</button>
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
        <img src={hero}/>
        <div className="hero-background-box"></div>
      </div>
    </section>
  );
}
