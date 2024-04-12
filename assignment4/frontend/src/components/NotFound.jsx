import { Player } from "@lottiefiles/react-lottie-player";
// import Cat from "../assets/shared/catNotFound.json";
import SadMan from "../assets/shared/sadNotFound.json";
import { Link } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found-section">
      <div className="container">
        <Player autoplay loop src={SadMan}></Player>
        <h1>Page not found :(</h1>
        <Link to="/">Back to home</Link>
      </div>
    </section>
  );
}
