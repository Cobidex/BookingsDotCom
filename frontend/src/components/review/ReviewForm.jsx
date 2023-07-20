import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/reviews/create', {
        rating,
        text,
      });

      console.log(response.data); // Handle the response as needed

      // Reset the form after successful submission
      setRating('');
      setText('');
    } catch (error) {
      console.error(error); // Handle error states
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
     <div className="max-w-md w-full mx-4 bg-gray-50 p-6 rounded-lg shadow-md border border-teal-500">
      <div>
        <p className='text-center text-2xl font-semibold text-gray-500 mb-4'>Leave a review</p>
        <p className='mb-4 text-gray-700 font-thin text-lg'>Share your experience and help others make informed decisions. Rate the accommodation on a scale of 1 to 5 and provide additional feedback in the comments.
           Your valuable review will contribute to a better community of travelers. Thank you for your input!</p>
      </div> 
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="rating" className="text-gray-700 text-xl font-thin">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={handleRatingChange}
          required
          className="block w-full mt-1 px-2 py-1 border border-teal-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md shadow"
        >
          <option value="">Select a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="text" className="text-gray-700 text-xl font-thin">Review Text:</label>
        <textarea
          id="text"
          value={text}
          onChange={handleTextChange}
          required
          className="block w-full mt-1 px-2 py-1 border border-teal-500 shadow focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md text-gray-700 text-lg font-thin"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white shadow border bg-teal-500 hover:border-teal-500 hover:bg-white hover:text-teal-500 focus:outline-none focus:ring-2 rounded-md mt-10 mb-5"
      >
        Submit Review
      </button>
    </form>
    </div>
    </div>
  );
};

export default ReviewForm
