// styles
import "./InitialLoaderPage.css";

// imports
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../../assets/shared/loadingText.json";
import Headphone from "../../assets/shared/headphone.json";

export default function InitialLoaderPage() {
  return (
    <div className="loader-page">
      <Player
        className="headphone-loader"
        autoplay
        loop
        src={Headphone}
      ></Player>
      <Player className="loading-text" autoplay loop src={Loader}></Player>
    </div>
  );
}
