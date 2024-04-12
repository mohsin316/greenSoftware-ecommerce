// imports
import { ScrollRestoration } from "react-router-dom";

// styles
import "./Headphones.css";

// RTKQ
import { useGetProductsQuery } from "../../features/productsApiSlice";

// componenets
import Category from "../../components/Category";
import ShortAbout from "../../components/ShortAbout";
import ProductList from "../../components/ProductList";
import ProductListLoader from "../../components/loaders/ProductListLoader";

export default function Headphones() {
  const { isSuccess, data, isLoading } = useGetProductsQuery("headphones");

  return (
    <>
      <ScrollRestoration />
      <section className="headphones-category">
        <div className="container">
          <h1>headphones</h1>
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
