import Arrow from "../../assets/shared/right-arrow.png";
import { useRef, useState } from "react";
import generatePDF from "react-to-pdf";

import Logo from "../../assets/shared/desktop/logo.svg";

const options = {
  filename: "audiophile-invoice.pdf",
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true,
      scale: 5,
      windowWidth: 1920,
    },
  },
};
let USDollar = new Intl.NumberFormat("en-US", {
  currency: "USD",
});
export default function Order({ id, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const ref = useRef();

  const createPdf = () => {
    setShow(true);
    setTimeout(() => {
      generatePDF(ref, options);
      setShow(false);
    }, 200);
  };

  return (
    <div ref={ref} className="order">
      <div className="order-details">
        <div className="order-num">
          <small>Order #</small>
          <strong>{id.slice(0, 9)}</strong>
        </div>
        <div className="date">
          <small>Order Date</small>
          <strong>{data.entities[id].date.slice(0, 10)}</strong>
        </div>
        <div className="total">
          <small>Order Total</small>
          <strong>$ {USDollar.format(data.entities[id].totalAmount)}</strong>
        </div>
        <div className="dropdown-pdf-button">
          {show && <img className="image-pdf" src={Logo} />}
          {!show && (
            <>
              <button onClick={() => setIsOpen(!isOpen)}>
                <img
                  className={`${isOpen ? "rotate" : ""}`}
                  height={"15px"}
                  src={Arrow}
                  alt="arrow"
                />
              </button>
              {isOpen && (
                <button onClick={createPdf} className="button">
                  PDF
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div>
          <div className="personal-information">
            <div className="order-billing-details">
              <strong>Billing Details</strong>
              <small>{data.entities[id].name}</small>
              <small>{data.entities[id].email}</small>
              <small>{data.entities[id].phoneNumber}</small>
            </div>
            <div className="order-shipping-details">
              <strong>Shiping Details</strong>
              <small>{data.entities[id].address}</small>
              <small>{data.entities[id].zip}</small>
              <small>{data.entities[id].city}</small>
              <small>{data.entities[id].country}</small>
            </div>
            <div className="order-payment-details">
              <strong>Payment Details</strong>
              <small>{data.entities[id].paymentMethod}</small>
            </div>
          </div>

          <strong className="items">Items</strong>
          <div className="order-items">
            {data.entities[id].products.map((item) => (
              <div key={item.id}>
                <img src={item.imageURL} alt="image" />
                <div className="item-info">
                  <strong>{item.name}</strong>
                  <small className="order-price">
                    $ {USDollar.format(item.price)}
                  </small>
                </div>
                <small className="order-quantity">x{item.quantity}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
