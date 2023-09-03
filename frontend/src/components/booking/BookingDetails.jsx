import React, { useEffect, useState } from 'react';
import api from '../api';

const BookingDetails = ({ bookingId }) => {
  const [booking, setBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setErrorMessage('');

      try {
        const response = await api.get(`/booking/1`);

        setBooking(response.data);
      } catch (error) {
        console.error('Failed to fetch booking details:', error.response.data);
        setErrorMessage('Failed to fetch booking details');
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (!booking) {
    return <p>Loading booking details...</p>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Check-in: {booking.checkIn}</p>
      <p>Check-out: {booking.checkOut}</p>
      <p>User ID: {booking.user_id}</p>
      <p>Accommodation ID: {booking.accomo_id}</p>
      
    </div>
  );
};

export default BookingDetails;
