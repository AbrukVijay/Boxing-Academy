import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slide1 from './Assets/image2.jpg';
import slide2 from './Assets/image3.jpg';
import slide3 from './Assets/image4.jpg';
import Navbar from './Navbar';

function BoxingAcademy() {
  
  return (
    <>
      <style>
        {`
          

          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
          }

          .nav-link {
            margin: 0 10px;
          }

          .dropdown-menu {
            right: 0;
            left: auto !important;
          }
        `}
      </style>
      <Navbar></Navbar>
      
      <div className="carousel-container">
        <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} showThumbs={false} showStatus={false}>
          <div>
            <img src={slide1} alt="Slide 1"  style={{height:'700px'}}/>
          </div>
          <div>
            <img src={slide2} alt="Slide 2" style={{height:'700px'}} />
          </div>
          <div>
            <img src={slide3} alt="Slide 3" style={{ height:'700px'}} />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default BoxingAcademy;
