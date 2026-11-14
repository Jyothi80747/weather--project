function SearchBar({
  city,
  setCity,
  onSearch,
  onLocation
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(city);
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        value={city}
        onChange={event => setCity(event.target.value)}
        placeholder="Search city..."
      />

      <button type="submit">Search</button>

      <button type="button" onClick={onLocation}>
        My Location
      </button>
    </form>
  );
}

export default SearchBar;