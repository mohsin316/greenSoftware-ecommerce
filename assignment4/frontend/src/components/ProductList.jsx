// styles
import "./ProductList.css";

// imports
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";

export default function ProductList({ product }) {
  return (
    <m.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={product.new ? "new" : ""}
    >
      <div className="container">
        <div className="even-columns">
          <div className="product-category-image">
            <picture>
              <source
                media="(max-width: 700px)"
                srcSet={`${product.categoryImage[0].mobile}`}
              />
              <source
                media="(max-width: 1000px)"
                srcSet={`${product.categoryImage[0].tablet}`}
              />
              <img
                src={`${product.categoryImage[0].desktop}`}
                alt="product image"
              />
            </picture>
          </div>
          <div className="product-category-details">
            {product.new && <small>NEW PRODUCT</small>}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <Link to={product.id}>See product</Link>
          </div>
        </div>
      </div>
    </m.section>
  );
}
