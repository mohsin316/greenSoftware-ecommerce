// imports
import {
  useParams,
  Link,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import { motion as m } from "framer-motion";

// RTKQ
import { useGetProductsQuery } from "../../features/productsApiSlice";

// styles
import "./HeadphoneProduct.css";

let USDollar = new Intl.NumberFormat("en-US", {
  currency: "USD",
});

// components
import Category from "../../components/Category";
import ShortAbout from "../../components/ShortAbout";
import ProductLoader from "../../components/loaders/ProductLoader";

export default function HeadphoneProduct() {
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/headphones";
  const navigate = useNavigate();

  const { id } = useParams();
  const [itemNumber, setItemNumber] = useState(1);
  const { product, isLoading } = useGetProductsQuery("headphones", {
    selectFromResult: ({ data, isLoading }) => ({
      product: data ? data.entities[id] : null,
      isLoading,
    }),
  });

  useEffect(() => {
    if (!isLoading && product === undefined) {
      navigate("/notfound");
    }
  }, [isLoading]);

  const handleCount = (operation) => {
    if (operation === "add") {
      setItemNumber((prevItemNumber) => prevItemNumber + 1);
    } else {
      setItemNumber((prevItemNumber) => {
        if (prevItemNumber <= 1) {
          return 1;
        } else {
          return prevItemNumber - 1;
        }
      });
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart(
        product.id,
        product.cartName,
        itemNumber,
        product.price,
        product.productImage[0].mobile
      )
    );
  };

  return (
    <>
      <ScrollRestoration />
      {product && (
        <>
          <section
            className={
              product.new
                ? "new headphone-product-section"
                : "not-new headphone-product-section"
            }
          >
            <div className="container">
              <div className="even-columns">
                <Link className="go-back-link" to={from}>
                  Go Back
                </Link>
                <div className="product-image">
                  <picture>
                    <source
                      media="(max-width: 700px)"
                      srcSet={`${product.productImage[0].mobile}`}
                    />
                    <source
                      media="(max-width: 1000px)"
                      srcSet={`${product.productImage[0].tablet}`}
                    />
                    <img
                      src={`${product.productImage[0].desktop}`}
                      alt="product image"
                    />
                  </picture>
                </div>
                <div className="product-details">
                  {product.new && <small className="new">NEW PRODUCT</small>}
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <strong>$ {USDollar.format(product.price)}</strong>
                  <div className="add-to-cart-container">
                    <div className="quantity-counter">
                      <m.button
                        whileHover={{ color: "red" }}
                        whileFocus={{ color: "red" }}
                        onClick={() => handleCount("subtract")}
                      >
                        -
                      </m.button>
                      <small>{itemNumber}</small>
                      <m.button
                        whileHover={{ color: "red" }}
                        whileFocus={{ color: "red" }}
                        onClick={() => handleCount("add")}
                      >
                        +
                      </m.button>
                    </div>
                    <m.button
                      whileHover={{ opacity: 0.8 }}
                      whileTap={{ opacity: 0.8, scale: 1.1 }}
                      whileFocus={{ opacity: 0.8, scale: 1.1 }}
                      className="add-to-cart-button"
                      onClick={handleAddToCart}
                    >
                      add to cart
                    </m.button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="features-section">
            <div className="container">
              <div className="features">
                <h3>features</h3>
                {product.features.split("\n").map((feature, index) => (
                  <p key={index}>{feature}</p>
                ))}
              </div>
              <div className="box-contents">
                <h3>in the box</h3>
                <ul className="flow">
                  {product.includes.map((item) => (
                    <li key={item.id}>
                      <span>{item.quantity}x</span>
                      <small>{item.item}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="gallery-section">
            <div className="container">
              <div className="gallery-image-one">
                <picture>
                  <source
                    media="(max-width: 700px)"
                    srcSet={`${product.gallery[0].mobile}`}
                  />
                  <source
                    media="(max-width: 1000px)"
                    srcSet={`${product.gallery[0].tablet}`}
                  />
                  <img
                    src={`${product.gallery[0].desktop}`}
                    alt="gallery image"
                  />
                </picture>
              </div>
              <div className="gallery-image-two">
                <picture>
                  <source
                    media="(max-width: 700px)"
                    srcSet={`${product.gallery[1].mobile}`}
                  />
                  <source
                    media="(max-width: 1000px)"
                    srcSet={`${product.gallery[1].tablet}`}
                  />
                  <img
                    src={`${product.gallery[1].desktop}`}
                    alt="gallery image"
                  />
                </picture>
              </div>
              <div className="gallery-image-three">
                <picture>
                  <source
                    media="(max-width: 700px)"
                    srcSet={`${product.gallery[2].mobile}`}
                  />
                  <source
                    media="(max-width: 1000px)"
                    srcSet={`${product.gallery[2].tablet}`}
                  />
                  <img
                    src={`${product.gallery[2].desktop}`}
                    alt="gallery image"
                  />
                </picture>
              </div>
            </div>
          </section>
          <m.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="suggestion-section"
          >
            <div className="container">
              <h3>you may also like</h3>
              <div className="suggestion-container">
                <div className="even-columns">
                  {product.others.map((product) => (
                    <div key={product.id} className="suggested-product">
                      <div className="product-image">
                        <picture>
                          <source
                            media="(max-width: 700px)"
                            srcSet={`${product.image[0].mobile}`}
                          />
                          <source
                            media="(max-width: 1000px)"
                            srcSet={`${product.image[0].tablet}`}
                          />
                          <img
                            src={`${product.image[0].desktop}`}
                            alt="product image"
                          />
                        </picture>
                      </div>
                      <h5>{product.name}</h5>
                      <Link
                        state={{ from: location }}
                        replace
                        to={`/${product.category}/${product.itemId}`}
                      >
                        see product
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </m.section>
        </>
      )}
      {isLoading && <ProductLoader />}

      <section className="category-section">
        <div className="container">
          <Category />
        </div>
      </section>
      <ShortAbout />
    </>
  );
}
