import "./Cta.css";
import cta from '../../assets/cta.png'

import { useRef } from "react";
import { useRevealAnimation, useSoftReveal } from "../../hooks/animations";

export default function CTASection() {

  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useRevealAnimation(titleRef);
  useSoftReveal(cardsRef, { stagger: 0.15 }, { delay: 0.15 });
  
  return (
    <section className="cta-section">
      <div className="cta-trapez">
        <div className="cta-frame" ref={titleRef}>
            <div className="cta-tittle">
                    <h1>No matter what you’re trying to dream up, we help you get it done</h1>
                    <button>Get Flowly Free</button>
            </div>
            <div className="cta-image">
                <img src={cta}/>
            </div>
        </div>

      </div>
    </section>
  );
}
