import { useState, useEffect } from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import ShowList from './components/ShowList';
import { useAuth } from './hooks/useAuth';
import api from './api';
import './components/MovieCard.css';

function App() {
  const { user, saveUser, logout } = useAuth();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This effect runs when the user logs in or out
    if (user) {
      // We define the function INSIDE useEffect...
      const fetchMovies = async () => {
        try {
          const response = await api.get('/movies');
          setMovies(response.data);
        } catch (error) {
          console.error("Failed to fetch movies:", error);
          setError(error.response?.data?.message || 'Could not load movies.');
        }
      };

      // ...and then we call it immediately.
      fetchMovies();
    }
  }, [user]); // The dependency is correct

  if (!user) {
    return (
      <div className="App">
        <AuthForm onLogin={saveUser} />
      </div>
    );
  }

  // If a movie is selected, show the ShowList page
  if (selectedMovie) {
    return (
      <div className="App">
        {/* Pass user.id down so SeatMap can use it for 'mine' class */}
        <ShowList
          movie={selectedMovie}
          userId={user.id} 
          onBackClick={() => setSelectedMovie(null)}
        />
      </div>
    );
  }

  // Otherwise, show the Home Page (Movie Grid)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Booking (Logged in as: {user.name})</h1>
        <button onClick={logout} className="logout-button">Logout</button>
        {error && <p className="error">Error: {error}</p>}
      </header>

      <main>
        <h2>Now Playing</h2>
        <div className="movie-grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => setSelectedMovie(movie)}
            >
              <div className="movie-card-img-placeholder">
                <span>(Movie Poster)</span>
              </div>
              <div className="movie-card-content">
                <h3>{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;