// imports
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../assets/shared/loader.json";
import CartEmpty from "../assets/shared/cartEmpty1.json";
import { motion as m } from "framer-motion";
import { useSelector } from "react-redux";
import { selectAll } from "../features/cartSlice";
import { selectCurrentUser } from "../features/authSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { usePostOrderMutation } from "../features/ordersApiSlice";
import { useEffect, useState } from "react";
import Basket from "../assets/shared/baskett.png";
import SuccessPage from "./SuccessPage";

// styles
import "./Checkout.css";

let USDollar = new Intl.NumberFormat("en-US", {
  currency: "USD",
});

const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be 2 or more characters." }),
  email: z.string().email().trim().toLowerCase(),
  phone: z
    .string()
    .length(10, { message: "Please enter a valid phone number" })
    .refine((value) => /^[0-9]+$/.test(value), "Only numbers are allowed"),
  address: z
    .string()
    .trim()
    .min(5, { message: "Please enter a valid address." }),
  zip: z
    .string()
    .length(6, { message: "6 numbers are required" })
    .refine(
      (value) => /^[1-9][0-9]{5}$/.test(value),
      "Please enter a valid zip"
    ),
  city: z
    .string()
    .trim()
    .min(2, { message: "Please enter a valid city name." }),
  country: z
    .string()
    .trim()
    .min(3, { message: "Please enter a valid country name." }),
  paymentMethod: z.string(),
  cardNumber: z.nullable(
    z
      .string()
      .length(16, { message: "Please enter a valid card number." })
      .refine(
        (value) => /^[0-9]+$/.test(value),
        "Please enter a valid card number."
      )
  ),
  pin: z.nullable(
    z
      .string()
      .length(4, { message: "Please enter a valid pin." })
      .refine(
        (value) => /^[0-9]+$/.test(value),
        "Please enter a valid card number."
      )
  ),
});

const totalPrice = (products) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity;
  }
  const tax = Math.floor(total * 0.2);
  const grandTotal = total + 50;
  return [total, tax, grandTotal];
};

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setFocus,
    reset,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "card" },
  });
  const [error, setError] = useState(false);
  const products = useSelector(selectAll);
  const { user } = useSelector(selectCurrentUser);
  const paymentByCard = watch("paymentMethod");
  const prices = totalPrice(products);
  const [postOrder, { isLoading, isSuccess }] = usePostOrderMutation();

  const onSubmit = async (data) => {
    setError(false);
    if (products.length === 0) {
      return;
    }
    if (
      data.paymentMethod === "card" &&
      (data.cardNumber === null || data.pin === null)
    ) {
      if (data.cardNumber === null) {
        setFocus("cardNumber");
        return;
      } else if (data.pin === null) {
        setFocus("pin");
        return;
      }
    }
    const total = totalPrice(products);

    // perform payment here
    const { address, city, country, email, name, paymentMethod, phone, zip } =
      data;
    const orderData = {
      address,
      city,
      country,
      email,
      paymentMethod,
      phone,
      name,
      zip,
      userId: user.id,
      totalAmount: parseFloat(total),
      products,
    };
    try {
      window.scrollTo(0, 0);
      const response = await postOrder({ ...orderData }).unwrap();
      reset();
    } catch (error) {
      setError(true);
    }
  };

  if (paymentByCard === "cod") {
    setValue("cardNumber", null);
    setValue("pin", null);
  }

  return (
    <section className="checkout-section">
      <div className="container">
        {products.length === 0 && (
          <div className="checkout-cart-empty">
            <Player
              className="CartEmpty"
              autoplay
              loop
              src={CartEmpty}
            ></Player>
            <strong>
              The cart&apos;s <span>empty!</span>
            </strong>
          </div>
        )}

        {products.length >= 1 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="even-columns">
              <div className="checkout-container">
                <Link className="go-back-link" to="/">
                  Go Home
                </Link>
                <h3>checkout</h3>
                <div className="billing-details">
                  <strong>billing details</strong>
                  <div className="flow">
                    <label htmlFor="name">
                      Name
                      <input
                        placeholder="Alexi Ward"
                        {...register("name")}
                        type="text"
                        id="name"
                      />
                      {errors.name && (
                        <small className="error">{errors.name.message}</small>
                      )}
                    </label>
                    <label htmlFor="email">
                      Email Address
                      <input
                        placeholder="alexei@mail.com"
                        {...register("email")}
                        type="email"
                        id="email"
                      />
                      {errors.email && (
                        <small className="error">{errors.email.message}</small>
                      )}
                    </label>
                    <label htmlFor="phone">
                      Phone Number
                      <input
                        placeholder="+91 202-555-0136"
                        {...register("phone")}
                        type="tel"
                        id="phone"
                      />
                      {errors.phone && (
                        <small className="error">{errors.phone.message}</small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="shipping-details">
                  <strong>shipping info</strong>
                  <div className="flow">
                    <label htmlFor="address">
                      Address
                      <input
                        placeholder="1137 Williams Avenue"
                        {...register("address")}
                        type="text"
                        id="address"
                      />
                      {errors.address && (
                        <small className="error">
                          {errors.address.message}
                        </small>
                      )}
                    </label>
                    <label htmlFor="zip">
                      Zip Code
                      <input
                        placeholder="100001"
                        {...register("zip")}
                        type="text"
                        id="zip"
                      />
                      {errors.zip && (
                        <small className="error">{errors.zip.message}</small>
                      )}
                    </label>
                    <label htmlFor="city">
                      City
                      <input
                        placeholder="New York"
                        {...register("city")}
                        type="text"
                        id="city"
                      />
                      {errors.city && (
                        <small className="error">{errors.city.message}</small>
                      )}
                    </label>
                    <label htmlFor="country">
                      Country
                      <input
                        placeholder="United States"
                        {...register("country")}
                        type="text"
                        id="country"
                      />
                      {errors.country && (
                        <small className="error">
                          {errors.country.message}
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="payment-details">
                  <strong>payment details</strong>
                  <div className="flow">
                    <strong>Payment Method</strong>
                    <label className="form-control" htmlFor="card">
                      <input
                        {...register("paymentMethod")}
                        id="card"
                        value="card"
                        type="radio"
                      />
                      e-Money
                    </label>
                    <label className="form-control" htmlFor="cod">
                      <input
                        {...register("paymentMethod")}
                        id="cod"
                        value="cod"
                        type="radio"
                      />
                      Cash on Delivery
                    </label>
                    {paymentByCard === "card" && (
                      <>
                        <label htmlFor="cardNumber">
                          e-Money Number
                          <input
                            placeholder="238521993..."
                            {...register("cardNumber")}
                            type="text"
                            id="cardNumber"
                          />
                          {errors.cardNumber && (
                            <small className="error">
                              {errors.cardNumber.message}
                            </small>
                          )}
                        </label>
                        <label htmlFor="pin">
                          e-Money Pin
                          <input
                            placeholder="6891"
                            {...register("pin")}
                            type="text"
                            id="pin"
                          />
                          {errors.pin && (
                            <small className="error">
                              {errors.pin.message}
                            </small>
                          )}
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="summary-container">
                <strong>summary</strong>
                {products.map((product) => (
                  <div className="order-item" key={product.id}>
                    <div className="item-image">
                      <img
                        width={"64px"}
                        src={product.imageURL}
                        alt="cart-item-image"
                      />
                    </div>
                    <div className="content">
                      <strong>{product.name}</strong>
                      <strong>$ {USDollar.format(product.price)}</strong>
                    </div>
                    <small>x{product.quantity}</small>
                  </div>
                ))}
                <div className="checkout-total">
                  <small>total</small>
                  <strong>$ {USDollar.format(prices[0])}</strong>
                </div>
                <div className="checkout-shipping">
                  <small>shipping</small>
                  <strong>$ 50</strong>
                </div>
                <div className="checkout-vat">
                  <small>vat (included)</small>
                  <strong>$ {USDollar.format(prices[1])}</strong>
                </div>
                <div className="checkout-grand-total">
                  <small>grand total</small>
                  <strong>$ {USDollar.format(prices[2])}</strong>
                </div>
                <m.button
                  whileHover={{ opacity: 0.8 }}
                  whileTap={{ opacity: 0.8, scale: 1.1 }}
                  whileFocus={{ opacity: 0.8, scale: 1.1 }}
                  disabled={products.length === 0 || isLoading}
                >
                  continue & pay
                </m.button>
                {error && (
                  <small className="error">
                    Something went wrong while processing your payment. Please
                    try again.
                  </small>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
      {isLoading && (
        <div className="backdrop">
          <Player autoplay loop src={Loader}></Player>
        </div>
      )}
      {isSuccess && <SuccessPage />}
    </section>
  );
}
