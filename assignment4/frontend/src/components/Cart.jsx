// styles
import "./Cart.css";

//imports
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, emptyCart } from "../features/cartSlice";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import CartEmpty from "../assets/shared/cartEmpty2.json";
import { motion as m, AnimatePresence } from "framer-motion";

let USDollar = new Intl.NumberFormat("en-US", {
  currency: "USD",
});

const totalPrice = (products) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity;
  }
  return total;
};

export default function Cart({ products, setIsCartOpen }) {
  const dispatch = useDispatch();
  return (
    <m.div layout className="cart-container">
      {products.length == 0 && (
        <div className="cart-empty">
          <strong>
            The cart&apos;s <span>empty!</span>
          </strong>
          <Player className="cartEmpty" autoplay loop src={CartEmpty}></Player>
        </div>
      )}
      {products.length > 0 && (
        <>
          <m.div layout className="cart-heading">
            <strong>cart ({products.length})</strong>
            <m.button
              whileHover={{ color: "#D97E4A" }}
              whileFocus={{ color: "#D97E4A" }}
              onClick={() => dispatch(emptyCart())}
            >
              Remove all
            </m.button>
          </m.div>
          <m.div layout className="cart-items flow">
            <AnimatePresence>
              {products.map((product) => (
                <m.div
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  key={product.id}
                >
                  <div className="cart-item-image">
                    <img
                      width={"50px"}
                      src={product.imageURL}
                      alt="cart-item-image"
                    />
                  </div>
                  <div className="content">
                    <strong>{product.name}</strong>
                    <strong>$ {USDollar.format(product.price)}</strong>
                  </div>
                  <div className="quantity-counter">
                    <m.button
                      whileHover={{ color: "#D97E4A" }}
                      whileFocus={{ color: "#D97E4A" }}
                      onClick={() =>
                        dispatch(removeFromCart({ id: product.id }))
                      }
                    >
                      -
                    </m.button>
                    <small>{product.quantity}</small>
                    <m.button
                      whileHover={{ color: "#D97E4A" }}
                      whileFocus={{ color: "#D97E4A" }}
                      onClick={() =>
                        dispatch(
                          addToCart(
                            product.id,
                            product.name,
                            1,
                            product.price,
                            product.imageURL
                          )
                        )
                      }
                    >
                      +
                    </m.button>
                  </div>
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>

          <m.div layout className="total-price">
            <small>total</small>
            <strong>$ {USDollar.format(totalPrice(products))}</strong>
          </m.div>
          <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
            <m.button className="checkout-button">checkout</m.button>
          </Link>
        </>
      )}
    </m.div>
  );
}
