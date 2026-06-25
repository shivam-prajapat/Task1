import { useState } from "react";
import "./App.css";

import { products as initialProducts } from "./data/products";
import { getRecommendations } from "./services/geminiService";
import { applyConstraints } from "./utils/filterUtils";

import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import RecommendationList from "./components/RecommendationList";
import AddProductForm from "./components/AddProductForm";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [nextId, setNextId] = useState(initialProducts.length + 1);

  const [userInput, setUserInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleAddProduct(newProduct) {
    const productWithId = { id: nextId, ...newProduct };
    setProducts((prev) => [...prev, productWithId]);
    setNextId((prev) => prev + 1);
  }

  async function handleGetRecommendations() {
    if (!userInput.trim()) {
      setError("Please describe what you are looking for.");
      return;
    }

    setError("");
    setLoading(true);
    setRecommendations([]);
    setHasSearched(false);

    try {
      const recommendedIds = await getRecommendations(userInput, products);

      const aiFiltered = products.filter((p) => recommendedIds.includes(p.id));


      const validated = applyConstraints(aiFiltered, userInput);

      setRecommendations(validated);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Product Recommendation</h1>
        <p className="app__subtitle">Describe what you need and get AI-powered suggestions from the list.</p>
      </header>

      <main className="app__main">
        <SearchBar
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onSubmit={handleGetRecommendations}
          loading={loading}
        />

        {error && (
          <div className="app__error" role="alert">
            {error}
          </div>
        )}

        <RecommendationList
          recommendations={recommendations}
          hasSearched={hasSearched}
        />

        <ProductList
          title={`All Products (${products.length})`}
          products={products}
          isHighlighted={false}
        />

        <AddProductForm onAddProduct={handleAddProduct} />
      </main>
    </div>
  );
}

export default App;
