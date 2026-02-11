import React from "react";
import "./LandingPage.css";

import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import CTASection from "../../components/Cta/Cta";
import FeaturesSection from "../../components/Features/Features";

const LandingPage = () => {
  return (
    <div className="landing-container">
        <Hero/>
        <FeaturesSection/>
        <HowItWorks/>
        <CTASection/>

    </div>
  );
};

export default LandingPage;
