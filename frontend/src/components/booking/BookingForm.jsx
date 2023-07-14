import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [accommodationId, setAccommodationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('/api/booking/book', {
        checkIn,
        checkOut,
        accommodationId,
      });

      console.log('Booking created:', response.data);
      // Do something with the created booking data if needed

      // Clear form inputs
      setCheckIn('');
      setCheckOut('');
      setAccommodationId('');
    } catch (error) {
      console.error('Failed to create booking:', error.response.data);
      setErrorMessage('Failed to create booking');
    }
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Check-in:</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Check-out:</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Accommodation ID:</label>
          <input
            type="text"
            value={accommodationId}
            onChange={(e) => setAccommodationId(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingForm;
