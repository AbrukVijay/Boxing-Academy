import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from '../Components/AdminHome/TemplateData.json';
import './Home4.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import UserHome from "../Navbars/UserNav";
const Home4 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    // Automatically slide every 2 seconds
    const timer = setInterval(() => {
      goToNextSlide();
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide]);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === data.length - 1 ? 0 : prevSlide + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? data.length - 1 : prevSlide - 1));
  };

  const handleSlideClick = (academyId) => {
    // Redirect to course page with the clicked academy ID
    navigate(`/course?academyId=${academyId}`);
  };
  const handleSlideClick1 = () => {
    navigate(`/admin/academy`);
  };

  return (
    <div className="Homepage">
      <section className="Homepage2">
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          {data.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === currentSlide ? "active" : ""}
              aria-current={index === currentSlide ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {data.map((item, index) => (
            <div
              className={`carousel-item ${index === currentSlide ? "active" : ""}`}
              key={item.id}
            >
              
              <img
                src={item.image}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
                onClick={() => handleSlideClick(item.id)}
              />
              <div className="my-carousel-caption d-none d-md-block">

                <h5>{item.title}</h5>
                <p>{item.place}</p>
                <Button variant="link" className="slide-title" onClick={() => handleSlideClick1()}>
                  Explore more academies
                </Button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
          onClick={goToPrevSlide}
        >
          <FontAwesomeIcon icon={faBackward} />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
          onClick={goToNextSlide}
        >
          <FontAwesomeIcon icon={faForward} />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </section>
    </div>
  );
};

export default Home4;
