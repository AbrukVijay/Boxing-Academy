import React,{useState} from 'react';
import { Card, Row, Col,Button,Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar, faStar as regularStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularEmptyStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../User/ViewAcademy1.css';
import UserHome from '../../Navbars/UserNav';
import courseData from './courseData';

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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedCard, setSearchedCard] = useState(null);
  

  React.useEffect(() => {
    axios.get('http://localhost:5232/api/User/Getinstrat')
      .then(response => {
        setData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 


  const handleSearch = () => {
    if (searchTerm.length === 0 || !data.length) {
      setSearchedCard(null);
      return;
    }

    const filteredCard = data.find((item) => {
      const title = item.instituteName || ""; // Handle undefined instituteName
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setSearchedCard(filteredCard || null);
    setSearchTerm("");
  };


  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSearchedCard(null);
  };


  const handleCardClick = (instituteId) => {
    navigate(`/user/courses`,{state:{instituteId}});
  };

  const handleRateClick = (event, instituteId) => {
    event.stopPropagation();
    navigate(`/user/rating`,{state:{instituteId}});
  };
  const renderSuggestions = () => {
    if (searchTerm.length === 0 || !data.length) {
      return null;
    }

    const filteredSuggestions = data.filter((item) => {
      const title = item.instituteName || ""; // Handle undefined instituteName
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
      <div className='nair'>
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion) => (
          <li key={suggestion.courseId} onClick={() => handleSuggestionClick(suggestion.instituteName)}>
            {suggestion.instituteName}
          </li>
        ))}
      </ul>
      </div>
    );
  };

  return (
    <>
      <UserHome />
      <div className="User-page">
        <Col sm={12} className="d-flex justify-content-center">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Type here to search Institute"
              className="me-2"
              aria-label="Search"
              style={{ width: '500px' }}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <Button id="searchButton" className="btn btn-success" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Col>
        {renderSuggestions()}
        {searchedCard && (
          <Row xs={1} sm={1} md={3} lg={3} xl={3}>
            <Col xs={12} sm={6} md={4} >
              <Card  className="mb-4" onClick={() => handleCardClick(searchedCard.instituteId)}>
                <div className="card-content">
                  <Card.Img
                    variant="top"
                    src={searchedCard.imageUrl}
                    onError={e => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{searchedCard.instituteName}</Card.Title>
                    <div className="text-start">
                      <Card.Text>
                        <strong>
                          <em> place: {searchedCard.instituteAddress}</em>
                        </strong>
                      </Card.Text>
                    </div>
                    <Rate averageRating={parseFloat(searchedCard.averageRating)} />
                    <label className="rate-button" onClick={(event) => handleRateClick(event, searchedCard.instituteId)}>Reviews</label>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          </Row>
        )}
        {!searchedCard && (
          <Row xs={1} sm={1} md={3} lg={3} xl={3}>
              {data.map(item => (
            <Col xs={12} sm={6} md={4} key={item.instituteId}>
              <Card instituteId={`userAcademyGrid${item.instituteId}`} className="mb-4" onClick={() => handleCardClick(item.instituteId)}>
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
                          <em> place: {item.instituteAddress}</em>
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
        )}
      </div>
    </>
  );
};

export default Viewacademy1;