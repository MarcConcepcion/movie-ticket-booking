export default function ConfirmationModal({ movie, selectedSeats, total, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">🎟️</span>
          <h2>Confirm Your Booking</h2>
        </div>
        <div className="modal-body">
          <div className="modal-row">
            <span>Movie</span>
            <strong>{movie.title}</strong>
          </div>
          <div className="modal-row">
            <span>Seats</span>
            <strong>{selectedSeats.map((s) => s.id).join(", ")}</strong>
          </div>
          <div className="modal-row">
            <span>Number of Seats</span>
            <strong>{selectedSeats.length}</strong>
          </div>
          <div className="modal-row total">
            <span>Total Amount</span>
            <strong>₱{total.toLocaleString()}</strong>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-confirm" onClick={onConfirm}>Yes, Confirm!</button>
          <button className="btn btn-cancel" onClick={onCancel}>Go Back</button>
        </div>
      </div>
    </div>
  );
}