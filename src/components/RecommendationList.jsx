import ProductCard from "./ProductCard";

function RecommendationList({ recommendations, hasSearched }) {
  if (!hasSearched) return null;

  if (recommendations.length === 0) {
    return (
      <section className="recommendation-list recommendation-list--empty">
        <h2 className="section-title">Results</h2>
        <div className="empty-state">
          <p className="empty-state__title">No products found</p>
          <p className="empty-state__text">
            None of the products in the list match your preference. Try a
            different budget or category, or add a new product above.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="recommendation-list">
      <h2 className="section-title">
        Results
        <span className="result-count">{recommendations.length} match{recommendations.length > 1 ? "es" : ""}</span>
      </h2>
      <div className="product-list__grid">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} isHighlighted={true} />
        ))}
      </div>
    </section>
  );
}

export default RecommendationList;
