import "./Testimonials.css";
import { useRef } from "react";
import { useRevealAnimation, useSoftReveal } from "../../hooks/animations";

import LandingTitle from "../LandingTitle/LandingTitle";

export default function Testimonials() {

  const titleRef = useRef(null);

  useRevealAnimation(titleRef);

  return (
    <section className="tes-section" >
    <div className="tes-frame" ref={titleRef}>
        <LandingTitle h1={"For teams big and small"} p={"THear from start-ups and large enterprises that prefer Atlassian, Hear from start-ups and large enterprises that prefer Atlassian"}/>
        <div className="tes-trapez">
            <div className="tes-image"></div>
            <div className="tes-desc">
                <div>
                    <h3>“Jira makes life easier. We can spend time on adding value, not busywork.”</h3>
                    <p>Joe Cotant <br/> <span>Senior Technical Program Manage</span></p>
                </div>
            </div>

      </div>
        <img src="https://images.ctfassets.net/xjcz23wx147q/9dQCZAoPVyN1D4t0RIfkU/0465ebd11fd9fc20e9c779898c2aaf8f/Roblox_Joe_Cotant.png?fm=webp&w=900"/>
    </div>
    </section>
  );
}
