// styles
import "./Footer.css";

// imports
import { Link } from "react-router-dom";

// images
import Facebook from "../assets/shared/desktop/icon-facebook.svg";
import Twitter from "../assets/shared/desktop/icon-twitter.svg";
import Instagram from "../assets/shared/desktop/icon-instagram.svg";
import Logo from "../assets/shared/desktop/logo.svg";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="even-columns">
          <div className="category-navigation">
            <img src={Logo} alt="logo" />
            <ul className="flow">
              <Link to="/">Home</Link>
              <Link to="headphones">Headphones</Link>
              <Link to="speakers">Speakers</Link>
              <Link to="earphones">Earphones</Link>
            </ul>
          </div>
          <div className="footer-description">
            <p>
              Audiophile is an all in one stop to fulfill your audio needs.
              We&apos;re a small team of music lovers and sound specialists who
              are devoted to helping you get the most out of personal audio.
              Come and visit our demo facility - we&apos;re open 7 days a week.
            </p>
          </div>
          <div className="copyright">
            <p>Copyright 2024. All Rights Reserved</p>
          </div>
          <div className="socials">
            <ul>
              <Link>
                <img src={Facebook} alt="facebook" />
              </Link>
              <Link>
                <img src={Twitter} alt="twitter" />
              </Link>
              <Link>
                <img src={Instagram} alt="instagram" />
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
