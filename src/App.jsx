import { useState } from "react";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import SeatGrid from "./components/SeatGrid";
import BookingSummary from "./components/BookingSummary";
import ConfirmationModal from "./components/ConfirmationModal";
import Notification from "./components/Notification";
import "./App.css";

const MOVIES = [
  { id: 1, title: "Galactic Drift", genre: "Sci-Fi", duration: "2h 14m", price: 320, rating: "PG-13", poster: "🚀" },
  { id: 2, title: "The Last Petal", genre: "Romance", duration: "1h 58m", price: 280, rating: "PG", poster: "🌹" },
  { id: 3, title: "Iron Protocol", genre: "Action", duration: "2h 31m", price: 350, rating: "R", poster: "⚙️" },
  { id: 4, title: "Whisper Wood", genre: "Horror", duration: "1h 47m", price: 300, rating: "R", poster: "🌲" },
];

const ROWS = ["A", "B", "C", "D", "E", "F"];
const COLS = 8;

function generateSeats() {
  const occupied = ["A2", "A5", "B3", "B7", "C1", "C4", "D6", "E2", "E5", "F3", "F7"];
  return ROWS.flatMap((row) =>
    Array.from({ length: COLS }, (_, i) => {
      const id = `${row}${i + 1}`;
      return { id, row, col: i + 1, occupied: occupied.includes(id) };
    })
  );
}

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [seats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = MOVIES.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setSelectedSeats([]);
    setBookingComplete(false);
    showNotif(`🎬 "${movie.title}" selected!`, "info");
  };

  const handleSeatClick = (seat) => {
    if (seat.occupied || bookingComplete) return;
    setSelectedSeats((prev) => {
      if (prev.find((s) => s.id === seat.id)) {
        showNotif(`Seat ${seat.id} removed.`, "warn");
        return prev.filter((s) => s.id !== seat.id);
      }
      if (prev.length >= 6) {
        showNotif("Maximum 6 seats per booking.", "error");
        return prev;
      }
      showNotif(`Seat ${seat.id} selected!`, "success");
      return [...prev, seat];
    });
  };

  const handleReset = () => {
    setSelectedSeats([]);
    setSelectedMovie(null);
    setBookingComplete(false);
    showNotif("Selection cleared.", "info");
  };

  const handleConfirm = () => {
    setShowModal(false);
    setBookingComplete(true);
    showNotif("🎉 Booking confirmed! Enjoy the movie!", "success");
  };

  const showNotif = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const total = selectedMovie ? selectedSeats.length * selectedMovie.price : 0;

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} onSearch={(e) => setSearchQuery(e.target.value)} />

      {notification && <Notification message={notification.message} type={notification.type} />}

      <main className="main-layout">
        <section className="left-panel">
          <MovieList
            movies={filteredMovies}
            selectedMovie={selectedMovie}
            onSelectMovie={handleSelectMovie}
          />
        </section>

        <section className="right-panel">
          {selectedMovie ? (
            <>
              <SeatGrid
                seats={seats}
                selectedSeats={selectedSeats}
                onSeatClick={handleSeatClick}
                movie={selectedMovie}
              />
              <BookingSummary
                movie={selectedMovie}
                selectedSeats={selectedSeats}
                total={total}
                onConfirm={() => setShowModal(true)}
                onReset={handleReset}
                bookingComplete={bookingComplete}
              />
            </>
          ) : (
            <div className="no-selection">
              <div className="no-selection-icon">🎟️</div>
              <h2>Select a Movie to Begin</h2>
              <p>Choose a film from the list to pick your seats and book your tickets.</p>
            </div>
          )}
        </section>
      </main>

      {showModal && (
        <ConfirmationModal
          movie={selectedMovie}
          selectedSeats={selectedSeats}
          total={total}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}