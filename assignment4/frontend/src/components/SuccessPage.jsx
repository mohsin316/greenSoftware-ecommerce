// styles
import { useEffect, useState } from "react";
import "./SuccessPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAll } from "../features/cartSlice";
import { emptyCart } from "../features/cartSlice";
import { motion as m } from "framer-motion";

// images
import OrderConfirmation from "../assets/checkout/icon-order-confirmation.svg";

const totalPrice = (products) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity;
  }
  const grandTotal = total + 50;
  return grandTotal;
};

export default function SuccessPage() {
  const cartItems = useSelector(selectAll);
  const [showOrders, setShowOrders] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = (location) => {
    document.body.style.overflow = "unset";
    dispatch(emptyCart());
    if (location === "home") {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      <div className="backdrop">
        {/* <button
          className="backdrop-button "
          onClick={() => setIsModelOpen(!isModelOpen)}
        ></button> */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="success-container"
        >
          <img src={OrderConfirmation} alt="OrderConfirmation" />
          <h3>thank you for you order</h3>
          <p>You will receive an email confirmation shortly.</p>
          <div className="successful-orders">
            <div className="successful-order-items flow">
              <div className="order-item">
                <div className="item-image">
                  <img
                    width={"64px"}
                    src={cartItems[0].imageURL}
                    alt="cart-item-image"
                  />
                </div>
                <div className="content">
                  <strong>{cartItems[0].name}</strong>
                  <strong>$ {cartItems[0].price}</strong>
                </div>
                <small>x{cartItems[0].quantity}</small>
              </div>
              {showOrders &&
                cartItems.map((product, index) => (
                  <div
                    key={product.id}
                    className={`${index === 0 ? "hide" : "order-item"}`}
                  >
                    <div className="item-image">
                      <img
                        width={"64px"}
                        src={product.imageURL}
                        alt="cart-item-image"
                      />
                    </div>
                    <div className="content">
                      <strong>{product.name}</strong>
                      <strong>$ {product.price}</strong>
                    </div>
                    <small>x{product.quantity}</small>
                  </div>
                ))}
              <button
                className={`${cartItems.length === 1 ? "hide" : " "}`}
                type="button"
                onClick={() => setShowOrders(!showOrders)}
              >
                {!showOrders && `and ${cartItems.length - 1} other items(s)`}
                {showOrders && `View less`}
              </button>
            </div>
            <div
              className={`${
                cartItems.length === 1
                  ? "successful-grand-total reduce-padding"
                  : "successful-grand-total"
              }`}
            >
              <small>grand total</small>
              <strong>$ {totalPrice(cartItems)}</strong>
            </div>
          </div>
          <div className="success-container-buttons">
            <button
              type="button"
              className="back-to-home"
              onClick={() => handleCheckout("home")}
            >
              Back to home
            </button>
            <button
              type="button"
              className="go-to-dashboard"
              onClick={() => handleCheckout("dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        </m.div>
      </div>
      ;
    </>
  );
}
