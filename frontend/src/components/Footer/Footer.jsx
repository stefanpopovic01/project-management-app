import "./Footer.css";
import logo from '../../assets/logo.png'

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-frame">
        <div className="footer-inner">

          <div className="footer-left">
            <img src={logo} alt="Logo" />
            <p>Manage projects, tasks, and teams in one clear, focused workspace.</p>
          </div>

          <div className="footer-right">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Docs</a>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>

            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Flowly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
