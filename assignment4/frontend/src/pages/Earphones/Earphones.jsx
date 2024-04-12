// imports
import { ScrollRestoration } from "react-router-dom";

// styles
import "./Earphones.css";

// RTKQ
import { useGetProductsQuery } from "../../features/productsApiSlice";

// componenets
import Category from "../../components/Category";
import ShortAbout from "../../components/ShortAbout";
import ProductList from "../../components/ProductList";
import ProductListLoader from "../../components/loaders/ProductListLoader";

export default function Earphones() {
  const { isSuccess, data, isLoading } = useGetProductsQuery("earphones");

  return (
    <>
      <ScrollRestoration />
      <section className="earphones-category">
        <div className="container">
          <h1>earphones</h1>
        </div>
      </section>
      <section className="product-category-section flow product-category-section-spacer">
        {isSuccess &&
          data.ids.map((productId) => (
            <ProductList key={productId} product={data.entities[productId]} />
          ))}
        {isLoading && <ProductListLoader />}
      </section>
      <section className="category-section">
        <div className="container">
          <Category />
        </div>
      </section>
      <ShortAbout />
    </>
  );
}
