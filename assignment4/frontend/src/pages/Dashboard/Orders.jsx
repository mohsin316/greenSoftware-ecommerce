// styles
import "./Orders.css";

// imports
import { useGetOrdersQuery } from "../../features/ordersApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import { Player } from "@lottiefiles/react-lottie-player";
import CartEmpty from "../../assets/shared/cartEmpty1.json";
import Loader from "../../assets/shared/loader.json";
import Order from "./Order";

export default function Orders() {
  const { user } = useSelector(selectCurrentUser);
  const { data, isSuccess, isLoading } = useGetOrdersQuery(user.id);

  return (
    <section className="orders-section">
      <h1>Order History</h1>
      <div className="orders-details-container">
        {isLoading && (
          <Player className="loader" autoplay loop src={Loader}></Player>
        )}
        {isSuccess && data.ids.length === 0 && (
          <div className="no-orders-video-container">
            <Player
              className="no-orders-video"
              autoplay
              loop
              src={CartEmpty}
            ></Player>
            <strong>
              Uh oh... you have no <span>orders!</span>
            </strong>
          </div>
        )}
        {isSuccess &&
          data.ids.map((id) => <Order key={id} id={id} data={data} />)}
      </div>
    </section>
  );
}
