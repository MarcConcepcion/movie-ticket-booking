export default function Navbar({ searchQuery, onSearch }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🎬</span>
        <span className="brand-name">CineBook</span>
        <span className="brand-tag">Movie Ticket Booking</span>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search movies or genre..."
          value={searchQuery}
          onChange={onSearch}
        />
        <span className="search-icon">🔍</span>
      </div>
    </nav>
  );
}