export default function MovieList({ movies, selectedMovie, onSelectMovie }) {
  return (
    <div className="movie-list">
      <h2 className="section-title">Now Showing</h2>
      {movies.length === 0 && (
        <p className="no-results">No movies match your search.</p>
      )}
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={`movie-card ${selectedMovie?.id === movie.id ? "selected" : ""}`}
          onClick={() => onSelectMovie(movie)}
        >
          <div className="movie-poster">{movie.poster}</div>
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-meta">
              <span className="badge genre">{movie.genre}</span>
              <span className="badge rating">{movie.rating}</span>
            </div>
            <p className="movie-duration">⏱ {movie.duration}</p>
            <p className="movie-price">₱{movie.price.toLocaleString()} / seat</p>
          </div>
          {selectedMovie?.id === movie.id && (
            <div className="selected-indicator">✓</div>
          )}
        </div>
      ))}
    </div>
  );
}