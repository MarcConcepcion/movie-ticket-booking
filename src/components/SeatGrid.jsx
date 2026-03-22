const COLS = 8;
const ROWS = ["A", "B", "C", "D", "E", "F"];

export default function SeatGrid({ seats, selectedSeats, onSeatClick, movie }) {
  const getSeatStatus = (seat) => {
    if (seat.occupied) return "occupied";
    if (selectedSeats.find((s) => s.id === seat.id)) return "selected";
    return "available";
  };

  return (
    <div className="seat-grid-wrapper">
      <h2 className="section-title">Select Your Seats</h2>
      <p className="seat-subtitle">Showing for: <strong>{movie.title}</strong></p>

      <div className="screen">🎥 SCREEN</div>

      <div className="seat-grid">
        <div className="col-labels">
          <span className="row-spacer"></span>
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
        <div className="legend-item"><span className="legend-box available"></span> Available</div>
        <div className="legend-item"><span className="legend-box selected"></span> Selected</div>
        <div className="legend-item"><span className="legend-box occupied"></span> Occupied</div>
      </div>
    </div>
  );
}