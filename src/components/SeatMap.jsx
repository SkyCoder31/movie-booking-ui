import { useState, useEffect } from 'react';
import './SeatMap.css'; // We'll add styles for the grid
import api from '../api';

const API_URL = 'https://movie-booking-api-3wep.onrender.com'; // Your backend URL

function SeatMap({ showId, userId }) {
  const [seats, setSeats] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSeatId, setSelectedSeatId] = useState(null);

  // 1. Fetch seats whenever the 'showId' prop changes
  useEffect(() => {
    if (!showId) return; // Don't fetch if no show is selected

    const fetchSeats = async () => {
      try {
        setError(null);
        setSeats([]); // Clear old seats
        const response = await api.get(`/shows/${showId}/seats`);
        setSeats(response.data);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch seats');
        // }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch seats');
      }
    };

    fetchSeats();
  }, [showId]); // This effect re-runs when 'showId' changes

  const handleSeatClick = (seat) => {
    // 2. UPDATE CLICK HANDLER
    if (seat.status === 'booked') return; // Don't allow booking

    // Toggle selection
    if (selectedSeatId === seat.id) {
      setSelectedSeatId(null);
    } else {
      setSelectedSeatId(seat.id);
    }
  };

  const handleBooking = async () => {
    if (!selectedSeatId) return; // Safety check

    try {
      //  Generate a unique key for this request
      const idempotencyKey = crypto.randomUUID();

      //  Define the request body
      const bookingDetails = {
        show_id: showId,
        seat_id: selectedSeatId,
      };

      //  Make the POST request
      const response = await api.post('/bookings', bookingDetails, {
        headers: {
          'Idempotency-Key': idempotencyKey,
        }
      });

      //  Success!
      const data = response.data;
      alert(`Booking successful! Your booking ID is: ${data.booking.id}`);

      // Update the UI to show the seat is now booked
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === selectedSeatId ? { ...seat, status: 'booked' } : seat
        )
      );
      setSelectedSeatId(null); // Clear selection

    } catch (err) {
      console.error('Booking Error:', err);
      alert(`Error: ${err.response?.data?.message || 'Booking failed'}`);
    }
  };

  //  Render the component
  if (!showId) {
    return <p>Please select a show to see the seat map.</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="seat-map-container">
      <h3>Seat Map</h3>
      <div className="seat-grid">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`
              seat
              ${seat.status === 'booked'
                ? (seat.user_id === userId ? 'mine' : 'booked')
                : 'available'}
              ${selectedSeatId === seat.id ? 'selected' : ''}
            `}
            onClick={() => handleSeatClick(seat)}
          >
            {seat.row}{seat.number}
          </div>
        ))}
      </div>

      <button
        className="book-button"
        disabled={!selectedSeatId} // Disable if no seat is selected
        onClick={handleBooking}
      >
        {selectedSeatId ? `Book Seat (ID: ${selectedSeatId})` : 'Select a Seat'}
      </button>
    </div>
  );
}

export default SeatMap;