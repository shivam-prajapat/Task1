function SearchBar({ value, onChange, onSubmit, loading }) {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        className="search-input"
        placeholder='Try "phone under $500" or "cheap laptop"'
        value={value}
        onChange={onChange}
        aria-label="Product preference"
      />
      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? "Searching..." : "Get Recommendations"}
      </button>
    </form>
  );
}

export default SearchBar;
