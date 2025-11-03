// src/components/ShowList.jsx
import { useState, useEffect } from 'react';
import api from '../api';
import SeatMap from './SeatMap';
import './ShowList.css'; // We'll create this file

function ShowList({ movie, onBackClick, userId }) {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await api.get(`/movies/${movie.id}/shows`);
        setShows(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch shows');
      }
    };
    fetchShows();
  }, [movie.id]);

  if (selectedShow) {
    // If a show is selected, show the SeatMap
    return (
      <div className="seatmap-view">
        <button onClick={() => setSelectedShow(null)} className="back-button">
          &larr; Back to Showtimes
        </button>
        <h3>{movie.title}</h3>
        <p>{selectedShow.theatre_name} - {new Date(selectedShow.start_time).toLocaleString()}</p>
        <SeatMap showId={selectedShow.id} userId={userId} />
      </div>
    );
  }

  // Otherwise, show the list of showtimes
  return (
    <div className="showlist-container">
      <button onClick={onBackClick} className="back-button">
        &larr; Back to Movies
      </button>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <hr />
      <h3>Select a Showtime</h3>
      {error && <p className="error">{error}</p>}
      <div className="show-list">
        {shows.map((show) => (
          <button
            key={show.id}
            className="show-item"
            onClick={() => setSelectedShow(show)}
          >
            <h3>{show.theatre_name}</h3>
            <p>{new Date(show.start_time).toLocaleString()}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
export default ShowList;