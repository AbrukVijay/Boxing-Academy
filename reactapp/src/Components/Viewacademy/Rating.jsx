import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

// import './Rating.css';

const Rating = ({ instituteId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submittedReview, setSubmittedReview] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getUserId();
  }, []);
  
  const getUserId = () => {
    const email = localStorage.getItem('email');
  
    if (!email) {
      return; 
    }
  
    axios.get(`http://localhost:5071/api/user/${encodeURIComponent(email)}`)
      .then((response) => {
        const userId = response.data.userId; 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleMouseEnter = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/${instituteId}`); // Replace with the actual endpoint to fetch reviews by card ID
      setReviews(response.data.reviews);
    } catch (error) {
      console.log('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async () => {
    const review = {
      rating: rating,
      comment: comment,
    };

    try {
      await axios.post('/api/reviews', review); // Replace with the actual endpoint to post the review
      setSubmittedReview(review);
      setRating(0);
      setComment('');
      fetchReviews(); // Refresh the reviews after submitting a new review
    } catch (error) {
      console.log('Error submitting review:', error);
    }
  };

  return (
    <div>
      {/* Star rating */}
      <div className="rating-container">
        {[...Array(5)].map((_, index) => {
          const starNumber = index + 1;
          return (
            <span
              key={starNumber}
              className={`star ${starNumber <= (hoverRating || rating) ? 'filled' : ''} ${
                starNumber <= rating ? 'gold' : ''
              }`}
              onClick={() => setRating(starNumber)}
              onMouseEnter={() => handleMouseEnter(starNumber)}
              onMouseLeave={handleMouseLeave}
            >
              {starNumber <= rating ? '★' : '☆'}
            </span>
          );
        })}
      </div>

      {/* Comment box */}
      <div className="comment-container">
        <textarea
          className="comment-box"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your review..."
        ></textarea>
        <Button className="submit-button" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      {/* Display submitted review */}
      {submittedReview && (
        <div className="submitted-review">
          <h3>Your review:</h3>
          <p>Rating: {submittedReview.rating}</p>
          <p>Comment: {submittedReview.comment}</p>
        </div>
      )}

      {/* Display fetched reviews */}
      <div className="reviews-container">
        <h3>All Reviews:</h3>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>username: {review.UserId}</p>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;