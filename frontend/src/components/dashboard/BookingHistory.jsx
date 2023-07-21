import React, { useState, useEffect } from 'react';
import api from '../api';

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);

  // Fetch booking history data when the component mounts
  useEffect(() => {
    getBookingHistory();
  }, []);

  // Function to fetch booking history data
  const getBookingHistory = async () => {
    try {
      const response = await api.post('/booking/history');
      setBookingHistory(response.data);
    } catch (error) {
      console.log('Error fetching booking history:', error);
    }
  };

  if (bookingHistory.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>
      <ul>
        {bookingHistory.map((booking) => (
          <li key={booking.id} className='mb-4'>
            <p className='mb-2'>Accommodation: {booking.accommodationName}</p>
            <p className='mb-2'>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p className='mb-2'>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p className='mb-2'>Status: {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;
    
