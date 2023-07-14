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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Rating:</label>
        <select id="rating" value={rating} onChange={handleRatingChange} required>
          <option value="">Select a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <label htmlFor="text">Review Text:</label>
        <textarea id="text" value={text} onChange={handleTextChange} required></textarea>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
