import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [accommodationId, setAccommodationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await api.post('/booking/book', {
        checkIn,
        checkOut,
        accommodationId: 1,
      });

      if (response.status === 401) {
        navigate('/SignIn');
      }

      console.log('Booking created:', response.data);
      // Do something with the created booking data if needed

      // Clear form inputs
      setCheckIn('');
      setCheckOut('');
      setAccommodationId('');
      navigate('/BookingDetails');
    } catch (error) {
      console.error('Failed to create booking:', error.response.data);
      setErrorMessage('Failed to create booking');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="max-w-md w-full mx-4 bg-gray-600/30 p-6 rounded-lg shadow-md border border-white backdrop-brightness-50">
        <p className='text-center text-2xl font-semibold text-teal-400 mb-4'>Book Accomodation</p>
        <p className="text-white mb-4 font-thin text-lg md:text-center">
        Discover Your Ideal Getaway: Book Your Stay Now and Create Lasting Memories
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="checkIn" className="block text-white text-xl font-thin">
              Check-in:
            </label>
            <input
              type="date"
              id="checkIn"
              className="w-full border text-gray-700 font-thin rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 border-teal-500 shadow"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="checkOut" className="block text-white text-xl font-thin">
              Check-out:
            </label>
            <input
              type="date"
              id="checkOut"
              className="w-full text-gray-700 font-thin border border-teal-500 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 shadow"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
          {/*<div className="mb-4">
            <label htmlFor="accommodationId" className="block text-white text-xl font-thin">
              Accommodation ID:
            </label>
            <input
              type="text"
              id="accommodationId"
              className="w-full rounded-md px-3 py-2 focus:outline-none shadow placeholder:font-light text-lg text-gray-700 font-thin border border-teal-500"
              value={accommodationId}
              onChange={(e) => setAccommodationId(e.target.value)}
              placeholder='Enter accommodation ID'
              required
            />
  </div>*/}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white shadow border bg-teal-500 hover:border-teal-500 hover:bg-white hover:text-teal-500 focus:outline-none focus:ring-2 rounded-md mt-10 mb-5"
          >
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
