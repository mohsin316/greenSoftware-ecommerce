// styles
import "./ShortAbout.css";

import { motion as m } from "framer-motion";

// images
import HeadphoneManDesktop from "../assets/shared/desktop/image-best-gear.jpg";
import HeadphoneManTablet from "../assets/shared/tablet/image-best-gear.jpg";
import HeadphoneManMobile from "../assets/shared/mobile/image-best-gear.jpg";

export default function ShortAbout() {
  return (
    <m.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="short-about-section"
    >
      <div className="container">
        <div className="even-columns">
          <div className="short-about-image">
            <picture>
              <source media="(max-width: 700px)" srcSet={HeadphoneManMobile} />
              <source media="(max-width: 1000px)" srcSet={HeadphoneManTablet} />
              <img src={HeadphoneManDesktop} alt="speaker for desktop" />
            </picture>
          </div>
          <div className="short-about-details">
            <h2>
              Bringing you the <span>best</span> audio gear
            </h2>
            <p>
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>
        </div>
      </div>
    </m.section>
  );
}
