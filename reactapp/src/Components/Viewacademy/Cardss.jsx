import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './cardss.css';
// import '../Viewacademy/SearchBar.css';
import UserHome from "../../Navbars/UserNav";
import { Card, Form, Row, Col } from 'react-bootstrap';

function Cardss() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedCard, setSearchedCard] = useState(null);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5071/api/Admin/GetAllCourses'); // Replace with your API endpoint URL
      setCourseData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardClick = (card) => {
    // Handle card click logic, such as redirecting to the enrollment form
    window.location.href = "/enroll-form";
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.example.com/courses?searchTerm=${searchTerm}`); // Replace with your API endpoint URL
      if (response.data.length > 0) {
        setSearchedCard(response.data[0]);
      } else {
        setSearchedCard(null);
      }
      setSearchTerm("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSearchedCard(null);
  };

  const renderSuggestions = () => {
    if (searchTerm.length === 0) {
      return null;
    }

    const filteredSuggestions = courseData
      .map((card) => card.title)
      .filter((title) =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion) => (
          <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <UserHome />
      <div>
        <div className="templateContainer">
          <div className="searchInput_Container">
            <br />
            <Col sm={12} className="d-flex justify-content-center">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Type here to search course"
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
            <br />
          </div>
        </div>
        {searchedCard && (
          <div className="container">
            <Card className="card1">
              <Card.Body>
                <div className="Container">
                  <div className="aaa">
                    <Card.Text>
                      Course name: {searchedCard.courseName}
                      <br />
                      Course Duration: {searchedCard.months}
                      <br />
                      Course Availability timings: {searchedCard.time}
                    </Card.Text>
                  </div>
                  <div className="bbbb">
                    <Card.Text>
                      Number of Students: {searchedCard.students}
                      <br />
                      Course Description: {searchedCard.description}
                    </Card.Text>
                  </div>
                </div>
                <a href="/enrollform" onClick={handleCardClick}>
                  <Button variant="primary">Enroll Course</Button>
                </a>
              </Card.Body>
            </Card>
          </div>
        )}
        {!searchedCard && (
          <div className="container">
            {courseData.map((card) => (
              <Card key={card.id} className="card1">
                <Card.Body>
                  <div className="Container">
                    <div className="aaa">
                      <Card.Text>
                        Course name: {card.courseName}
                        <br />
                        Course Duration: {card.months}
                        <br />
                        Course Availability timings: {card.time}
                      </Card.Text>
                    </div>
                    <div className="bbbb">
                      <Card.Text>
                        Number of Students: {card.students}
                        <br />
                        Course Description: {card.description}
                      </Card.Text>
                    </div>
                  </div>
                  <a href="/enrollform" onClick={handleCardClick}>
                    <Button variant="primary">Enroll Course</Button>
                  </a>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Cardss;