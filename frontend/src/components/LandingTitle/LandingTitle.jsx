import "./LandingTitle.css";
import { useRef } from "react";
import { useRevealAnimation, useSoftReveal } from "../../hooks/animations";

export default function LandingTitle({h1, p}) {


  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useRevealAnimation(titleRef);
  useSoftReveal(cardsRef, { stagger: 0.15 }, { delay: 0.15 });

  return (

    <div className="landing-tittle">
        <h1 ref={titleRef}>{h1}</h1>
        <p ref={cardsRef}>{p}</p>
    </div>

  );
}
