export default function ProductLoader() {
  return (
    <>
      <section className="new headphone-product-section">
        <div className="container">
          <div className="even-columns">
            <div className="product-category-image-skeleton skeleton"></div>
            <div className="product-details-skeleton">
              <div>
                <div className="skeleton skeleton-header"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text skeleton-text-short"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text skeleton-text-short"></div>
                <div className="add-to-cart-container">
                  <div className="loading-button-skeleton skeleton"></div>
                  <div className="loading-button-skeleton skeleton"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="features-section">
        <div className="container">
          <div className="features">
            <div className="skeleton skeleton-header"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text skeleton-text-short"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text skeleton-text-short"></div>
          </div>
          <div>
            <div className="skeleton skeleton-header"></div>
            <ul>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
