// styles
import Category from "../../components/Category";
import "./Home.css";

// components
import ShortAbout from "../../components/ShortAbout";

// imports
import { Link, useLocation, ScrollRestoration } from "react-router-dom";
import { motion as m } from "framer-motion";

//images
import Circles from "../../assets/home/desktop/pattern-circles.svg";
import SpeakerDesktop from "../../assets/home/desktop/image-speaker-zx9.png";
import SpeakerTablet from "../../assets/home/tablet/image-speaker-zx9.png";
import SpeakerMobile from "../../assets/home/mobile/image-speaker-zx9.png";
import EarphoneDesktop from "../../assets/home/desktop/image-earphones-yx1.jpg";
import EarphoneTablet from "../../assets/home/tablet/image-earphones-yx1.jpg";
import EarphoneMobile from "../../assets/home/mobile/image-earphones-yx1.jpg";

export default function Home() {
  const location = useLocation();

  return (
    <>
      <ScrollRestoration />

      <section className="hero-section">
        <div className="container">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="hero-introduction"
          >
            <strong>NEW PRODUCT</strong>
            <h1>XX99 Mark II Headphones</h1>
            <p>
              Experience natural, life like audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Link
              state={{ from: location }}
              replace
              to="headphones/9bcda8fc-6f13-45b9-a341-d79e9f7150d6"
            >
              see product
            </Link>
          </m.div>
          <div className="hero-image"></div>
        </div>
      </section>
      <section className="category-section">
        <div className="container">
          <Category />
        </div>
      </section>
      <m.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", duration: 0.65 }}
        className="latest-product-section-one"
      >
        <div
          className="container"
          style={{ backgroundImage: `url(${Circles})` }}
        >
          <div className="even-columns">
            <div className="latest-speaker-one-image">
              <picture>
                <source media="(max-width: 700px)" srcSet={SpeakerMobile} />
                <source media="(max-width: 1000px)" srcSet={SpeakerTablet} />
                <img src={SpeakerDesktop} alt="speaker for desktop" />
              </picture>
            </div>
            <div className="latest-speaker-one-details">
              <h1>ZX9 SPEAKER</h1>
              <p>
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Link
                state={{ from: location }}
                replace
                to="speakers/50403f4d-7b64-42bf-9c49-fc41110386d2"
              >
                see product
              </Link>
            </div>
          </div>
        </div>
      </m.section>
      <m.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", duration: 0.65 }}
        className="latest-product-section-two"
      >
        <div className="container">
          <div className="even-columns">
            <div className="latest-speaker-two-details">
              <h5>ZX7 SPEAKER</h5>
              <Link
                state={{ from: location }}
                replace
                to="speakers/3b739e23-9939-4ddf-b833-5e56832f6d66"
              >
                see product
              </Link>
            </div>
          </div>
        </div>
      </m.section>
      <m.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", duration: 0.65 }}
        className="latest-product-section-three"
      >
        <div className="container">
          <div className="even-columns">
            <div className="latest-earphone-three-image">
              <picture>
                <source media="(max-width: 700px)" srcSet={EarphoneMobile} />
                <source media="(max-width: 1000px)" srcSet={EarphoneTablet} />
                <img src={EarphoneDesktop} alt="speaker for desktop" />
              </picture>
            </div>
            <div className="latest-earphone-three-details">
              <h5>YX1 EARPHONES</h5>
              <Link
                state={{ from: location }}
                replace
                to="earphones/0ceb99cb-b192-4048-b6b2-eb7fe10067e8"
              >
                see product
              </Link>
            </div>
          </div>
        </div>
      </m.section>
      <ShortAbout />
    </>
  );
}
