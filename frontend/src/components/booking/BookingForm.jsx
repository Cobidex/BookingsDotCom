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
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="max-w-md w-full mx-4 bg-gray-50 p-6 rounded-lg shadow-md border border-teal-500">
        <p className="text-gray-700 mb-4 font-thin text-lg">
        Discover Your Ideal Getaway: Book Your Stay Now and Create Lasting Memories
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="checkIn" className="block text-gray-700 ">
              Check-in:
            </label>
            <input
              type="date"
              id="checkIn"
              className="w-full rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 border-teal-500 shadow"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="checkOut" className="block text-gray-700">
              Check-out:
            </label>
            <input
              type="date"
              id="checkOut"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 shadow"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="accommodationId" className="block text-gray-700">
              Accommodation ID:
            </label>
            <input
              type="text"
              id="accommodationId"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none shadow placeholder:font-light"
              value={accommodationId}
              onChange={(e) => setAccommodationId(e.target.value)}
              placeholder='Enter accommodation ID'
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-700 text-white rounded-md py-2 px-4"
          >
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
