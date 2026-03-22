import { useState } from "react";

function PosterImage({ src, fallback, alt }) {
  const [errored, setErrored] = useState(false);
  if (errored || !src) {
    return <div className="movie-poster-emoji">{fallback}</div>;
  }
  return (
    <img
      src={src}
      alt={alt}
      className="movie-poster-img"
      onError={() => setErrored(true)}
    />
  );
}

export default function MovieList({ movies, selectedMovie, onSelectMovie }) {
  return (
    <div className="movie-list">
      <p className="movie-list-count">
        {movies.length === 0
          ? "No results found"
          : `Showing ${movies.length} film${movies.length !== 1 ? "s" : ""}`}
      </p>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={`movie-card ${selectedMovie?.id === movie.id ? "selected" : ""}`}
          onClick={() => onSelectMovie(movie)}
        >
          <div className="movie-poster-wrap">
            <PosterImage
              src={movie.posterImg}
              fallback={movie.poster}
              alt={movie.title}
            />
          </div>
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-meta">
              <span className="badge genre">{movie.genre}</span>
              <span className="badge rating">{movie.rating}</span>
              <span className={`badge year-badge ${movie.year === 2025 ? "new" : ""}`}>{movie.year}</span>
            </div>
            <p className="movie-duration">⏱ {movie.duration}</p>
            <p className="movie-studio">🎬 {movie.studio}</p>
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