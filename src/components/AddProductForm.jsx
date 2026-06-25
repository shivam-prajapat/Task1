import { useState } from "react";

const CATEGORIES = ["Phone", "Laptop", "Headphone", "Tablet", "Accessory"];

function AddProductForm({ onAddProduct }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Phone");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Product name is required.");
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      setError("Enter a valid price greater than 0.");
      return;
    }

    onAddProduct({
      name: name.trim(),
      category,
      price: Number(price),
    });

    setName("");
    setCategory("Phone");
    setPrice("");
  }

  return (
    <div className="add-form">
      <h2 className="section-title">Add a Product</h2>
      <form className="add-form__fields" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          className="form-input"
          type="number"
          placeholder="Price (USD)"
          value={price}
          min="1"
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="btn btn--primary" type="submit">
          Add Product
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default AddProductForm;
