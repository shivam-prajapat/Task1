function ProductCard({ product, isHighlighted }) {
  const cardClass = isHighlighted
    ? "product-card product-card--highlighted"
    : "product-card";

  return (
    <div className={cardClass}>
      <span className="product-card__badge">{product.category}</span>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">${product.price}</p>
      {isHighlighted && (
        <span className="product-card__ai-label">AI Recommended</span>
      )}
    </div>
  );
}

export default ProductCard;
