import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error(error); // Handle error states
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>Date: {review.date}</p>
              <p>User ID: {review.user_id}</p>
              <p>Accommodation ID: {review.accomo_id}</p>
              <p>Rating: {review.rating}</p>
              <p>Review Text: {review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
