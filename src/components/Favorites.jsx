function Favorites({ favorites, onSelect }) {
  return (
    <section>
      <h2>Favorite Cities</h2>

      <div className="favorite-list">
        {favorites.map(item => (
          <button
            key={`${item.name}-${item.latitude}`}
            onClick={() => onSelect(item)}
          >
            {item.name}
          </button>
        ))}

        {favorites.length === 0 && (
          <p>No favorite cities yet.</p>
        )}
      </div>
    </section>
  );
}

export default Favorites;