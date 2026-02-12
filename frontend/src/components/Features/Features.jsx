import "./Features.css";
import LandingTitle from "../LandingTitle/LandingTitle";

import one from '../../assets/1.png'
import two from '../../assets/2.png'
import three from '../../assets/3.png'
import four from '../../assets/4.png'
import five from '../../assets/5.png'
import six from '../../assets/6.png'
import f1 from '../../assets/f1.png'
import f2 from '../../assets/f2.png'
import f3 from '../../assets/f3.png'
import f4 from '../../assets/f4.png'
import f5 from '../../assets/f5.png'
import f6 from '../../assets/f6.png'

import { useRef } from "react";
import { useRevealAnimation, useSoftReveal } from "../../hooks/animations";

export default function FeaturesSection() {

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);
  const card6Ref = useRef(null);

  useSoftReveal(card1Ref, { delay: 0 });
  useSoftReveal(card2Ref, { delay: 0.15 });
  useSoftReveal(card3Ref, { delay: 0.3 });
  useSoftReveal(card4Ref, { delay: 0.45 });
  useSoftReveal(card5Ref, { delay: 0.6 });
  useSoftReveal(card6Ref, { delay: 0.75 });

  
  return (
    <section className="features-section">
      <div className="features-frame">
          <LandingTitle h1={"From Idea to Completion - Step by Step"} p={"Follow a clear workflow: create projects, collaborate with your team, assign tasks, and move work through Planning, In Progress, and Completed stages."}/>
          <div className="features-boxes">
            <div className="feature-box" ref={card1Ref}>
              <div className="f-b-image"><img src={f1}/></div>
              <div className="f-b-desc">
                  <div className="f-b-desc-number"><img src={one} alt="1"/></div>
                  <h2>Align work with goals</h2>
                  <p>Align strategic projects to goals so everyone can connect their work to company impact.</p>
              </div>
            </div>
            <div className="feature-box" ref={card2Ref}>
              <div className="f-b-image"><img src={f2}/></div>
              <div className="f-b-desc">
                  <div className="f-b-desc-number"><img src={two} alt="1"/></div>
                  <h2>Plan your project</h2>
                  <p>Go from the big picture to concrete tasks with Rovo AI to speed up your planning processes.</p>
              </div>
            </div>
            <div className="feature-box" ref={card3Ref}>
              <div className="f-b-image"><img src={f3}/></div>
              <div className="f-b-desc">
                  <div className="f-b-desc-number"><img src={three} alt="1"/></div>
                  <h2>Automate tedious tasks</h2>
                  <p>Stay focused on impact with powerful automations to update work status.</p>
              </div>
            </div>
            <div className="feature-box" ref={card4Ref}>
              <div className="f-b-image"><img src={f4}/></div>
              <div className="f-b-desc">
                  <div className="f-b-desc-number"><img src={four} alt="1"/></div>
                  <h2>Track the status</h2>
                  <p>Manage work across teams and let AI agents keep you updated on status and potential risks.</p>
              </div>
            </div>
            <div className="feature-box" ref={card5Ref}>
              <div className="f-b-image"><img src={f5}/></div>
              <div className="f-b-desc">
                  <div className="f-b-desc-number"><img src={five} alt="1"/></div>
                  <h2>Stay in sync</h2>
                  <p>Get caught up on context faster, and make smarter decisions using data that Rovo.</p>
              </div>
            </div>
            <div className="feature-box" ref={card6Ref}>
              <div className="f-b-image"><img src={f6}/></div>
              <div className="f-b-desc">
                  <div className="f-b-desc-number"><img src={six} alt="1"/></div>
                  <h2>Learn as you deliver</h2>
                  <p>Gain valuable insights on emerging trends from your projects, as you go.</p>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
