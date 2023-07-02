import React, { useState } from "react";
import '../Viewacademy/SearchBar.css';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import data from './TemplateData.json';

function SearchComponent({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleCardClick = () => {
    // Handle card click logic, such as redirecting to the enrollment form
    window.location.href = "/enroll-form";
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

 
  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="templateContainer">
      <div className="searchInput_Container">
      <br />
        <Col sm={12} className="d-flex justify-content-center">
           <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Type here to search"
              className="me-2"
              aria-label="Search"
              style={{ width: '500px' }}
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }} />
            <Button id="searchButton" className="btn btn-success" >
              Search
            </Button>
          </Form>
        </Col>
        <br />
       
         
      </div>
      <div className="template_Container">
        {searchTerm.length > 0 && (
          // Show cards only if searchTerm is not empty
          data
            .filter((val) => {
              if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val;
              }
            })
            .map((val) => {
              return (
                <Row xs={3} md={2} className="row" key={val.id}>
                  <Col className="card">
                    <Card>
                    <a href="/cardss" onClick={handleCardClick} key={val.id}>
                      <Card.Img
                        // width={270}
                        // height={10}
                        variant="top"
                        src={val.image}
                      />
                      <Card.Body>
                        <div className="Sk">
                       
                      
                          <Card.Title>{val.title}</Card.Title>
                          <Card.Text>
                            <div className="Skk">
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star"></span>
                            </div>
                          </Card.Text>
                        </div>
                        {val.place}
                      </Card.Body>
                      </a>
                    </Card>
                  </Col>
                </Row>
              );
            })
        )}
      </div>
    </div>
  );
}

export default SearchComponent;



// import React, { useState, useEffect } from "react";
// import '../admin';
// import '../Viewacademy/SearchBar.css';

// import axios from 'axios';
// import { Card, Form, Button, Row, Col } from 'react-bootstrap';

// function SearchComponent({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cardData, setCardData] = useState([]);

//   useEffect(() => {
//     fetchCardData();
//   }, []);

//   const fetchCardData = () => {
//     axios.get('  ')
//       .then(response => setCardData(response.data))
//       .catch(error => console.error(error));
//   };

//   const handleCardClick = () => {
//     // Handle card click logic, such as redirecting to the enrollment form
//     window.location.href = "/enroll-form";
//   };

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearch = (event) => {
//     event.preventDefault();
//     onSearch(searchTerm);
//   };

//   return (
//     <div className="templateContainer">
//       <div className="searchInput_Container">
//       <br />
//         <Col sm={12} className="d-flex justify-content-center">
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Type here to search"
//               className="me-2"
//               aria-label="Search"
//               style={{ width: '500px' }}
//               value={searchTerm}
//               onChange={handleInputChange} />
//             <Button id="searchButton" className="btn btn-success" onClick={handleSearch}>
//               Search
//             </Button>
//           </Form>
//         </Col>
//         <br />
//       </div>
//       <div className="template_Container">
//         {searchTerm.length > 0 && (
//           // Show cards only if searchTerm is not empty
//           cardData
//             .filter((val) => {
//               if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
//                 return val;
//               }
//             })
//             .map((val) => {
//               return (
//                 <Row xs={3} md={2} className="row" key={val.id}>
//                   <Col className="card">
//                     <Card>
//                       <a href="/cardss" onClick={handleCardClick} key={val.id}>
//                         <Card.Img
//                           variant="top"
//                           src={val.image}
//                         />
//                         <Card.Body>
//                           <div className="Sk">
//                             <Card.Title>{val.title}</Card.Title>
//                             <Card.Text>
//                               <div className="Skk">
//                                 <span className="fa fa-star checked"></span>
//                                 <span className="fa fa-star checked"></span>
//                                 <span className="fa fa-star checked"></span>
//                                 <span className="fa fa-star checked"></span>
//                                 <span className="fa fa-star"></span>
//                               </div>
//                             </Card.Text>
//                           </div>
//                           {val.place}
//                         </Card.Body>
//                       </a>
//                     </Card>
//                   </Col>
//                 </Row>
//               );
//             })
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchComponent;
