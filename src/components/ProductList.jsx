import ProductCard from "./ProductCard";

function ProductList({ title, products, isHighlighted }) {
  return (
    <section className="product-list">
      <h2 className="section-title">{title}</h2>
      <div className="product-list__grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isHighlighted={isHighlighted}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
