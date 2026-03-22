export default function BookingSummary({
  movie,
  selectedSeats,
  total,
  onConfirm,
  onReset,
  bookingComplete,
}) {
  return (
    <div className={`booking-summary ${bookingComplete ? "confirmed" : ""}`}>
      <h2 className="section-title">
        {bookingComplete ? "🎉 Booking Confirmed!" : "Booking Summary"}
      </h2>

      <div className="summary-row">
        <span>Movie</span>
        <strong>{movie.title}</strong>
      </div>
      <div className="summary-row">
        <span>Price per Seat</span>
        <strong>₱{movie.price.toLocaleString()}</strong>
      </div>
      <div className="summary-row">
        <span>Selected Seats</span>
        <strong>
          {selectedSeats.length > 0
            ? selectedSeats.map((s) => s.id).join(", ")
            : "None"}
        </strong>
      </div>
      <div className="summary-row total-row">
        <span>Total</span>
        <strong className="total-amount">₱{total.toLocaleString()}</strong>
      </div>

      {bookingComplete ? (
        <div className="confirmation-msg">
          <p>Your seats are reserved. See you at the cinema! 🍿</p>
          <button className="btn btn-reset" onClick={onReset}>Book Again</button>
        </div>
      ) : (
        <div className="summary-actions">
          <button
            className="btn btn-confirm"
            onClick={onConfirm}
            disabled={selectedSeats.length === 0}
          >
            Confirm Booking
          </button>
          <button className="btn btn-reset" onClick={onReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}