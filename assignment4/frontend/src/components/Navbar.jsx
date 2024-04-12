// styles
import "./Navbar.css";

// images
import Logo from "../assets/shared/desktop/logo.svg";
import CartImage from "../assets/shared/desktop/icon-cart.svg";
import Hamburger from "../assets/shared/tablet/icon-hamburger.svg";
import Headphone from "../assets/shared/desktop/image-category-thumbnail-headphones.png";
import Speaker from "../assets/shared/desktop/image-category-thumbnail-speakers.png";
import Earphone from "../assets/shared/desktop/image-category-thumbnail-earphones.png";
import Arrow from "../assets/shared/desktop/icon-arrow-right.svg";
import Avatar from "../assets/shared/user2.png";

// imports
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAll } from "../features/cartSlice";

// components
import Cart from "./Cart";
import UserLoginSignup from "./UserLoginSignup";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const cartItems = useSelector(selectAll);

  return (
    <>
      <header>
        <div className="container">
          <button
            className="hamburger"
            onClick={() => {
              setIsOpen(!isOpen);
              setIsCartOpen(false);
              setIsAvatarOpen(false);
            }}
          >
            <img src={Hamburger} alt="hamburger-menu" />
          </button>
          <Link className="logo-link" to="/">
            <img className="logo" src={Logo} alt="logo" />
          </Link>
          <nav className={`primary-navigation ${isOpen ? "open" : "close"}`}>
            <ul className="flow spacer">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <img src={Headphone} alt="headphone-navigation" />
                <Link onClick={() => setIsOpen(!isOpen)} to="headphones">
                  Headphones
                </Link>
                <Link
                  onClick={() => setIsOpen(!isOpen)}
                  className="mobile-only"
                  to="headphones"
                >
                  SHOP
                  <div
                    style={{ backgroundImage: `url(${Arrow})` }}
                    className="mobile-only-arrow"
                  ></div>
                </Link>
              </li>
              <li>
                <img src={Speaker} alt="speaker-navigation" />
                <Link onClick={() => setIsOpen(!isOpen)} to="speakers">
                  Speakers
                </Link>
                <Link
                  onClick={() => setIsOpen(!isOpen)}
                  className="mobile-only"
                  to="speakers"
                >
                  SHOP
                  <div
                    style={{ backgroundImage: `url(${Arrow})` }}
                    className="mobile-only-arrow"
                  ></div>
                </Link>
              </li>
              <li>
                <img src={Earphone} alt="earphone-navigation" />
                <Link onClick={() => setIsOpen(!isOpen)} to="earphones">
                  Earphones
                </Link>
                <Link
                  onClick={() => setIsOpen(!isOpen)}
                  className="mobile-only"
                  to="earphones"
                >
                  SHOP
                  <div
                    style={{ backgroundImage: `url(${Arrow})` }}
                    className="mobile-only-arrow"
                  ></div>
                </Link>
                {/* <br />
                <Link to="/welcome">welcome</Link> */}
              </li>
            </ul>
          </nav>
          <div className="cart-auth">
            <button
              className="cart"
              onClick={() => {
                setIsCartOpen(!isCartOpen);
                setIsOpen(false);
                setIsAvatarOpen(false);
              }}
            >
              {cartItems.length >= 1 && <div>{cartItems.length}</div>}
              <img src={CartImage} alt="cart" />
            </button>
            {isCartOpen && (
              <Cart products={cartItems} setIsCartOpen={setIsCartOpen} />
            )}
            <button
              className="userLoginSignup"
              onClick={() => {
                setIsAvatarOpen(!isAvatarOpen);
                setIsCartOpen(false);
                setIsOpen(false);
              }}
            >
              <img src={Avatar} alt="Avatar" />
            </button>
            {isAvatarOpen && (
              <UserLoginSignup setIsAvatarOpen={setIsAvatarOpen} />
            )}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
