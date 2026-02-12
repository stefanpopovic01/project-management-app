import "./RecognitionSection.css";
import r1 from '../../assets/rec1.png'

export default function RecognitionSection() {
  return (
    <section className="recognition-section">
        <div className="recognition-frame">
            <div className="rec-image"><img src={r1}/></div>
            <div className="rec-desc">
                <h2>Atlassian named a Leader in the 2024 Gartner® Magic Quadrant</h2>
                <p>The best work management solution for all teams - Atlassian is the only platform to be recognized as a Leader for both Marketing and DevOps</p>
            </div>
        </div>

    </section>
  );
}
