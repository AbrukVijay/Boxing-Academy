//with duplicate data////

import React from 'react';
import './Viewacademy.css';
import Card from './Card';
import SearchComponent from './searchcomponent';
import Data from './TemplateData.json';
import UserHome from '../../Navbars/UserNav';

import { Row, Col } from 'react-bootstrap';

const Viewacademy = () => {
  const handleCardClick = () => {
    // Handle card click logic, such as redirecting to the enrollment form
    window.location.href = "/enroll-form";
  };

  return (
    <>
      <UserHome/>
      <div className='user-page'>
        <SearchComponent  />
        <div className='hb'>
                <a href="/cardss" onClick={handleCardClick}>
                  <Card  />
                </a>
              
        </div>
      </div>
    </>
  );
};

export default Viewacademy;





// import React, { useEffect, useState } from 'react';
// import './Viewacademy.css';
// import Card from './Card';
// import SearchComponent from './searchcomponent';
// import handleSearch from '../admin';
// import Navbar from "../Navbar";
// import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';

// const Viewacademy = () => {
//   const [cardData, setCardData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API endpoint and update the cardData state
//     axios.get('  ')
//       .then(response => setCardData(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleCardClick = () => {
//     // Handle card click logic, such as redirecting to the enrollment form
//     window.location.href = "/enroll-form";
//   };

//   return (
//     <>
//       <Navbar />
//       <div className='user-page'>
//         <SearchComponent onSearch={handleSearch} />
//         <div className='hb'>
//           <Row>
//             {cardData.map((card, index) => (
//               <Col xs={12} sm={6} md={4} lg={4} key={index}>
//                 <a href="/cardss" onClick={handleCardClick}>
//                   <Card imageUrl={card.image} title={card.title} place={card.place} rating={card.rating} />
//                 </a>
//               </Col>
//             ))}
//           </Row>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Viewacademy;


