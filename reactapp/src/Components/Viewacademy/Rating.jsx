import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar, faStar as regularStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularEmptyStar } from '@fortawesome/free-regular-svg-icons';
import UserHome from '../../Navbars/UserNav';
import { Modal } from 'react-bootstrap'; // Import Modal component



import './Rating.css';
function Rate({ averageRating }) {
  const fullStars = Math.floor(averageRating);
  const decimalPart = averageRating - fullStars;
  const emptyStars = 5 - Math.ceil(averageRating);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={solidStar} className="star filled" />);
  }

  if (decimalPart >= 0.75) {
    stars.push(<FontAwesomeIcon key={fullStars} icon={solidStar} className="star filled" />);
  } else if (decimalPart >= 0.25 && decimalPart < 0.75) {
    stars.push(<FontAwesomeIcon key={fullStars} icon={halfStar} className="star half-filled" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesomeIcon key={fullStars + 1 + i} icon={regularEmptyStar} className="star empty" />);
  }

  return <div className="star-rating">{stars}</div>;
}

const Rating = () => {
  const { instituteId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submittedReview, setSubmittedReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null); 
  const [hasUserRated, setHasUserRated] = useState(false); // Track whether the user has already rated
  const [showAlert, setShowAlert] = useState(false); // Track whether to show the alert



  useEffect(() => {
    getuserId();
    fetchReviews();
    const storedHasUserRated = localStorage.getItem(`hasUserRated-${instituteId}-${userId}`);
    if (storedHasUserRated === 'true') {
      setHasUserRated(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`hasUserRated-${instituteId}-${userId}`, hasUserRated.toString());
  }, [hasUserRated]);
 

  const getuserId = () => {
    const email = localStorage.getItem('email');
  
    if (!email) {
      return;
    }
  
    axios
      .get(`http://localhost:5232/api/user/${encodeURIComponent(email)}`)
      .then((response) => {
        setUserId(response.data.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5232/api/Admin/GetRatingsForInstitute/${instituteId}`);
  
        setReviews(response.data);
      }
      catch(error){
        console.error('Error getting revies',error);
      }
    };
    fetchReviews();
  

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleMouseEnter = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };
  const handleSubmit = async () => {
    if (hasUserRated) {
      setShowAlert(true);
      setRating(0);
      setComment('');
      return; // Exit if the user has already rated
    }
    const review = {
      userId: userId,
      rating: rating,
      comments: comment,
      instituteId:instituteId
    };
  
    try {
      await axios.post('http://localhost:5232/api/User/RateInstitute', review); // Replace with the actual endpoint to post the review
      setSubmittedReview(review);
      setRating(0);
      setComment('');
      setHasUserRated(true);
      // fetchReviews(); // Refresh the reviews after submitting a new review
    } catch (error) {
      console.log('Error submitting review:', error);
    }
  };
  

  return (
  
    <>
    <UserHome/><div className="rating-page-container">
      <div className="rating-container">
        {[...Array(5)].map((_, index) => {
          const starNumber = index + 1;
          return (
            <span
              key={starNumber}
              className={`star ${starNumber <= (hoverRating || rating) ? 'filled' : ''} ${starNumber <= rating ? 'gold' : ''}`}
              onClick={() => setRating(starNumber)}
              onMouseEnter={() => handleMouseEnter(starNumber)}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fas fa-star"></i>

            </span>
          );
        })}
      </div>

      <div className="review-container">
        <textarea
          className="comment-box"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your review...."
        ></textarea>
        <Button className="submit-button" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
    <div className='naviii'>
      <div className="reviews-container">
        <h3><center>All Reviews</center></h3>
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <div className='reviewusername'>{review.username}</div>
            <Rate averageRating={parseFloat(review.rating)} />
            <div className='reviewcomment'><p> {review.comment}</p></div>
            <br/>
          </div>
        ))}
      </div> </div>
      <Modal show={showAlert} onHide={() => setShowAlert(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rating Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have already submitted a rating for this institute.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlert(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal></>

      
   
    
  );
};

export default Rating;