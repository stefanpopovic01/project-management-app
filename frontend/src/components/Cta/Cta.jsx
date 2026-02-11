import "./Cta.css";
import cta from '../../assets/cta.png'

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-trapez">
        <div className="cta-frame">
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
