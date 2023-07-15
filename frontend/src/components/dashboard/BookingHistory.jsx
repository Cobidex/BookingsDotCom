import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);

  // Fetch booking history data when the component mounts
  useEffect(() => {
    getBookingHistory();
  }, []);

  // Function to fetch booking history data
  const getBookingHistory = async () => {
    try {
      const response = await axios.get('/api/booking/history');
      setBookingHistory(response.data);
    } catch (error) {
      console.log('Error fetching booking history:', error);
    }
  };

  if (bookingHistory.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Booking History</h2>
      <ul>
        {bookingHistory.map((booking) => (
          <li key={booking.id}>
            <p>Accommodation: {booking.accommodationName}</p>
            <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p>Status: {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;
