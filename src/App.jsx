import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import SeatGrid from "./components/SeatGrid";
import BookingSummary from "./components/BookingSummary";
import ConfirmationModal from "./components/ConfirmationModal";
import Notification from "./components/Notification";
import "./App.css";

const TMDB = "https://image.tmdb.org/t/p/w500";

const MOVIES = [
  // ── 2024 ──────────────────────────────────────────────
  {
    id: 1,
    title: "Inside Out 2",
    genre: "Animation",
    duration: "1h 40m",
    price: 320,
    rating: "PG",
    poster: "🎭",
    posterImg: `${TMDB}/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg`,
    year: 2024,
    studio: "Pixar / Disney",
  },
  {
    id: 2,
    title: "Deadpool & Wolverine",
    genre: "Action",
    duration: "2h 8m",
    price: 380,
    rating: "R",
    poster: "⚔️",
    posterImg: `${TMDB}/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg`,
    year: 2024,
    studio: "Marvel Studios",
  },
  {
    id: 3,
    title: "Moana 2",
    genre: "Animation",
    duration: "1h 40m",
    price: 320,
    rating: "PG",
    poster: "🌊",
    posterImg: `${TMDB}/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg`,
    year: 2024,
    studio: "Walt Disney Animation",
  },
  {
    id: 4,
    title: "Wicked",
    genre: "Musical",
    duration: "2h 40m",
    price: 350,
    rating: "PG",
    poster: "🧙‍♀️",
    posterImg: `${TMDB}/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg`,
    year: 2024,
    studio: "Universal Pictures",
  },
  {
    id: 5,
    title: "Dune: Part Two",
    genre: "Sci-Fi",
    duration: "2h 46m",
    price: 380,
    rating: "PG-13",
    poster: "🏜️",
    posterImg: `${TMDB}/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg`,
    year: 2024,
    studio: "Warner Bros.",
  },
  {
    id: 6,
    title: "Despicable Me 4",
    genre: "Animation",
    duration: "1h 34m",
    price: 300,
    rating: "PG",
    poster: "🍌",
    posterImg: `${TMDB}/wWba3TaojhK7NdycRhoQpsG0FaH.jpg`,
    year: 2024,
    studio: "Illumination / Universal",
  },
  {
    id: 7,
    title: "Beetlejuice Beetlejuice",
    genre: "Horror",
    duration: "1h 44m",
    price: 340,
    rating: "PG-13",
    poster: "👻",
    posterImg: `https://upload.wikimedia.org/wikipedia/en/7/76/Beetlejuice_%281988_film_poster%29.png`,
    year: 2024,
    studio: "Warner Bros.",
  },
  {
    id: 8,
    title: "Gladiator II",
    genre: "Action",
    duration: "2h 28m",
    price: 370,
    rating: "R",
    poster: "🛡️",
    posterImg: `${TMDB}/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg`,
    year: 2024,
    studio: "Paramount Pictures",
  },
  {
    id: 9,
    title: "Sonic the Hedgehog 3",
    genre: "Adventure",
    duration: "1h 49m",
    price: 300,
    rating: "PG",
    poster: "💨",
    posterImg: `${TMDB}/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg`,
    year: 2024,
    studio: "Paramount Pictures",
  },
  {
    id: 10,
    title: "Mufasa: The Lion King",
    genre: "Animation",
    duration: "1h 58m",
    price: 330,
    rating: "PG",
    poster: "🦁",
    posterImg: `https://m.media-amazon.com/images/M/MV5BYjBkOWUwODYtYWI3YS00N2I0LWEyYTktOTJjM2YzOTc3ZDNlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg`,
    year: 2024,
    studio: "Walt Disney Pictures",
  },
  // ── 2025 ──────────────────────────────────────────────
  {
    id: 11,
    title: "Lilo & Stitch",
    genre: "Adventure",
    duration: "1h 48m",
    price: 350,
    rating: "PG",
    poster: "👽",
    posterImg: `https://upload.wikimedia.org/wikipedia/en/5/56/Lilo_%26_Stitch_2025_Theatrical_Poster.jpg`,
    year: 2025,
    studio: "Walt Disney Pictures",
  },
  {
    id: 12,
    title: "Demon Slayer: Infinity Castle",
    genre: "Animation",
    duration: "2h 15m",
    price: 390,
    rating: "R",
    poster: "🗡️",
    posterImg: `https://m.media-amazon.com/images/M/MV5BOGQ3YWUzYjEtMTJiYy00ZjQ0LWI0YjktYjhiNGVhNGExYTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg`,
    year: 2025,
    studio: "Ufotable / Crunchyroll",
  },
  {
    id: 13,
    title: "How to Train Your Dragon",
    genre: "Adventure",
    duration: "2h 5m",
    price: 340,
    rating: "PG",
    poster: "🐉",
    posterImg: `https://upload.wikimedia.org/wikipedia/en/8/80/How_To_Train_Your_Dragon_2025_Poster.jpg`,
    year: 2025,
    studio: "Universal / DreamWorks",
  },
  {
    id: 14,
    title: "F1: The Movie",
    genre: "Action",
    duration: "2h 35m",
    price: 380,
    rating: "PG-13",
    poster: "🏎️",
    posterImg: `https://resizing.flixster.com/5Q22ZbwHwgkaD60RZvLq-j6oE9c=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2YyYmY3OGU3LWY2ZDgtNGNhYy04NmJhLWFiZGM2YjM3YTI1Zi5qcGc=`,
    year: 2025,
    studio: "Apple Original Films",
  },
  {
    id: 15,
    title: "Superman",
    genre: "Action",
    duration: "2h 9m",
    price: 370,
    rating: "PG-13",
    poster: "🦸",
    posterImg: `https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg`,
    year: 2025,
    studio: "DC Studios / Warner Bros.",
  },
  {
    id: 16,
    title: "Jurassic World: Rebirth",
    genre: "Sci-Fi",
    duration: "2h 1m",
    price: 370,
    rating: "PG-13",
    poster: "🦕",
    posterImg: `https://dx35vtwkllhj9.cloudfront.net/universalstudios/jurassic-world-rebirth/images/regions/us/updates1/onesheet.jpg`,
    year: 2025,
    studio: "Universal Pictures",
  },
  {
    id: 17,
    title: "Sinners",
    genre: "Horror",
    duration: "2h 17m",
    price: 360,
    rating: "R",
    poster: "🩸",
    posterImg: `https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg`,
    year: 2025,
    studio: "Warner Bros.",
  },
  {
    id: 18,
    title: "Dog Man",
    genre: "Animation",
    duration: "1h 27m",
    price: 280,
    rating: "PG",
    poster: "🐶",
    posterImg: `https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Dog_Man_film_poster.jpg/250px-Dog_Man_film_poster.jpg`,
    year: 2025,
    studio: "DreamWorks / Universal",
  },
  {
    id: 19,
    title: "Zootopia 2",
    genre: "Animation",
    duration: "1h 49m",
    price: 330,
    rating: "PG",
    poster: "🦊",
    posterImg: `https://m.media-amazon.com/images/M/MV5BYjg1Mjc3MjQtMTZjNy00YWVlLWFhMWEtMWI3ZTgxYjJmNmRlXkEyXkFqcGc@._V1_.jpg`,
    year: 2025,
    studio: "Walt Disney Animation",
  },
  {
    id: 20,
    title: "Mission: Impossible — The Final Reckoning",
    genre: "Action",
    duration: "2h 49m",
    price: 400,
    rating: "PG-13",
    poster: "💣",
    posterImg: `https://m.media-amazon.com/images/M/MV5BZGQ5NGEyYTItMjNiMi00Y2EwLTkzOWItMjc5YjJiMjMyNTI0XkEyXkFqcGc@._V1_.jpg`,
    year: 2025,
    studio: "Paramount Pictures",
  },
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
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterRating, setFilterRating] = useState("All");

  const genres = ["All", ...new Set(MOVIES.map((m) => m.genre))];
  const years = ["All", "2025", "2024"];
  const ratings = ["All", "PG", "PG-13", "R"];

  const filteredMovies = useMemo(() => {
    return MOVIES.filter((m) => {
      const matchSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.studio.toLowerCase().includes(searchQuery.toLowerCase());
      const matchGenre = filterGenre === "All" || m.genre === filterGenre;
      const matchYear  = filterYear  === "All" || m.year === parseInt(filterYear);
      const matchRating= filterRating=== "All" || m.rating === filterRating;
      return matchSearch && matchGenre && matchYear && matchRating;
    });
  }, [searchQuery, filterGenre, filterYear, filterRating]);

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
    setFilterGenre("All");
    setFilterYear("All");
    setFilterRating("All");
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

  const activeFilters =
    (filterGenre !== "All" ? 1 : 0) +
    (filterYear  !== "All" ? 1 : 0) +
    (filterRating!== "All" ? 1 : 0);

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} onSearch={(e) => setSearchQuery(e.target.value)} />

      {notification && <Notification message={notification.message} type={notification.type} />}

      <main className="main-layout">
        <section className="left-panel">
          <div className="left-panel-inner">

            {/* Filter Bar */}
            <div className="filter-bar">
              <div className="filter-bar-title">🎬 Now Showing</div>
              <div className="filter-header">
                <span className="filter-title">🎛 Filters</span>
                {activeFilters > 0 && (
                  <button
                    className="filter-clear"
                    onClick={() => { setFilterGenre("All"); setFilterYear("All"); setFilterRating("All"); }}
                  >
                    Clear ({activeFilters})
                  </button>
                )}
              </div>
              <div className="filter-row">
                <label className="filter-label">Genre</label>
                <select className="filter-select" value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
                  {genres.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="filter-row">
                <label className="filter-label">Year</label>
                <select className="filter-select" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                  {years.map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
              <div className="filter-row">
                <label className="filter-label">Rating</label>
                <select className="filter-select" value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
                  {ratings.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="movie-list-scroll">
              <MovieList
                movies={filteredMovies}
                selectedMovie={selectedMovie}
                onSelectMovie={handleSelectMovie}
              />
            </div>

          </div>
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
              <p>Choose from {MOVIES.length} now-showing films.</p>
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