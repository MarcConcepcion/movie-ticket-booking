import { useState } from "react";

const COLS = 8;
const ROWS = ["A", "B", "C", "D", "E", "F"];

function HeroBanner({ movie }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="hero-banner">
      {/* blurred background layer */}
      {movie.posterImg && imgOk && (
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${movie.posterImg})` }}
        />
      )}
      {/* dark overlay so text stays readable */}
      <div className="hero-overlay" />

      {/* foreground content */}
      <div className="hero-content">
        <div className="hero-poster-wrap">
          {movie.posterImg && imgOk ? (
            <img
              src={movie.posterImg}
              alt={movie.title}
              className="hero-poster-img"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="hero-poster-emoji">{movie.poster}</div>
          )}
        </div>
        <div className="hero-info">
          <div className="hero-badges">
            <span className="badge genre">{movie.genre}</span>
            <span className="badge rating">{movie.rating}</span>
            <span className={`badge year-badge ${movie.year === 2025 ? "new" : ""}`}>{movie.year}</span>
          </div>
          <h1 className="hero-title">{movie.title}</h1>
          <p className="hero-meta">⏱ {movie.duration} &nbsp;·&nbsp; 🎬 {movie.studio}</p>
          <p className="hero-price">₱{movie.price.toLocaleString()} per seat</p>
        </div>
      </div>
    </div>
  );
}

export default function SeatGrid({ seats, selectedSeats, onSeatClick, movie }) {
  const getSeatStatus = (seat) => {
    if (seat.occupied) return "occupied";
    if (selectedSeats.find((s) => s.id === seat.id)) return "selected";
    return "available";
  };

  return (
    <div className="seat-grid-wrapper">
      {/* Movie poster hero with blur */}
      <HeroBanner movie={movie} />

      {/* Centered seat picking area */}
      <div className="seat-section">
        <h2 className="section-title">Select Your Seats</h2>

        <div className="screen">🎥 SCREEN</div>

        <div className="seat-grid">
          <div className="col-labels">
            <span className="row-spacer" />
            {Array.from({ length: COLS }, (_, i) => (
              <span key={i} className="col-label">{i + 1}</span>
            ))}
          </div>
          {ROWS.map((row) => (
            <div key={row} className="seat-row">
              <span className="row-label">{row}</span>
              {seats
                .filter((s) => s.row === row)
                .map((seat) => {
                  const status = getSeatStatus(seat);
                  return (
                    <button
                      key={seat.id}
                      className={`seat ${status}`}
                      onClick={() => onSeatClick(seat)}
                      disabled={seat.occupied}
                      title={seat.id}
                    >
                      {status === "selected" ? "✓" : ""}
                    </button>
                  );
                })}
            </div>
          ))}
        </div>

        <div className="seat-legend">
          <div className="legend-item"><span className="legend-box available" /> Available</div>
          <div className="legend-item"><span className="legend-box selected" /> Selected</div>
          <div className="legend-item"><span className="legend-box occupied" /> Occupied</div>
        </div>
      </div>
    </div>
  );
}