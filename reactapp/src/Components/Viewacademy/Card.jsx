import React from 'react';
import { Card, Row, Col,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar, faStar as regularStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularEmptyStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../User/ViewAcademy1.css';
import UserHome from '../../Navbars/UserNav';
import './Card.css'

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

const Viewacademy1 = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:5232/api/User/Getinstrat')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCardClick = (instituteId) => {
    navigate(`/user/courses/${instituteId}`);
  };

  const handleRateClick = (event, instituteId) => {
    event.stopPropagation();
    navigate(`/user/rating/${instituteId}`);
  };

  return (
    <>
    <UserHome/>
      <div className="User-page">
        <br />
        <Row xs={1} sm={1} md={3} lg={3} xl={3}>
          {data.map(item => (
            <Col xs={12} sm={6} md={4} key={item.id}>
              <Card id={`userAcademyGrid${item.id}`} className="mb-4" onClick={() => handleCardClick(item.instituteId)}>
                <div className="card-content">
                  <Card.Img
                    variant="top"
                    src={item.imageUrl}
                    onError={e => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.instituteName}</Card.Title>
                    <div className="text-start">
                      <Card.Text>
                        <strong>
                          <em>Place: {item.instituteAddress}</em>
                        </strong>
                      </Card.Text>
                    </div>
                    <Rate averageRating={parseFloat(item.averageRating)} />
                    <label className="rate-button" onClick={(event) => handleRateClick(event, item.instituteId)}>Reviews</label>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Viewacademy1;