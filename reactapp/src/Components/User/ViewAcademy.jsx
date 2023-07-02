
import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar, faStar as regularStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularEmptyStar } from '@fortawesome/free-regular-svg-icons';
import UserHome from '../../Navbars/UserNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewAcademy1.css'
// import data from '../AdminHome/TemplateData.json';


function Rate({ rating }) {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;
  const emptyStars = 5 - Math.ceil(rating);

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

const Viewacademy = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Filter the data based on the search keyword
    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    // Handle the filtered data as per your requirements (e.g., display or update state)
    console.log(filteredData);
  };

  useEffect(() => {
    axios.get('http://localhost:5071/api/Admin/GetAllInstitutes')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = event => {
    setSearchKeyword(event.target.value);
  };

  const handleCardClick = () => {
    navigate('/cardss');
  };

  return (
    <>
      <UserHome />
      <div className="User-page">
        <br />
        <Col sm={12} className="d-flex justify-content-center">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Type here to search"
              className="me-2"
              aria-label="Search"
              style={{ width: '500px' }}
              value={searchKeyword}
              onChange={handleInputChange}
            />
            <Button id="searchButton" className="btn btn-success" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Col>
        <br />
        <br />
        <Row xs={1} sm={1} md={3} lg={3} xl={3}>
          {data.map(item => (
            <Col xs={12} sm={6} md={4} key={item.id}>
              <Card id={`userAcademyGrid${item.id}`} className="mb-4" onClick={handleCardClick}>
                <div className="card-content">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    onError={e => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.instituteAddress}</Card.Title>
                    <div className="text-start">
                      <Card.Text>
                        <strong>
                          <em>{item.place}</em>
                        </strong>
                      </Card.Text>
                    </div>
                    <Rate rating={parseFloat(item.rating)} />
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

export default Viewacademy;
