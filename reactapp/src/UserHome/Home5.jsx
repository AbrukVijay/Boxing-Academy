import React from "react";
import b1 from '../Images/b1.jpg';
import './Home5.css';

const Home5 = () => {
  return (
    <div className="home5">
      <section className="home5-section">
        <div className="home5-container">
          <img src={b1} alt="side pic" className="image" />
          <div className="content">
            <h1>About Our Boxing Academy</h1>
            <p>
            Welcome to Boxing Nexus, your gateway to a world of educational opportunities! We are dedicated to helping aspiring learners like you discover and secure admissions in prestigious academies. Our platform brings together a curated selection of top-tier academies, renowned for their commitment to excellence and industry relevance. Whether you're looking to enhance your professional skills, pursue a passion, or explore a new field, we have partnered with academies that offer comprehensive programs tailored to your educational needs. With our user-friendly interface, you can easily explore academies, dive into their course offerings, and find the perfect fit for your goals. Take the first step towards your educational journey with us and unlock a wealth of knowledge, personal growth, and limitless possibilities
            </p>
            <p>At Boxing Nexus, we're here to simplify your search for the perfect academy. We've handpicked a collection of esteemed academies known for their excellence in teaching and industry relevance. Whether you're looking to upskill, pursue a passion, or explore a new field, our extensive network has a program for you. Benefit from our seamless admission process, gain access to cutting-edge courses, and embark on an educational adventure that will shape your future. Let us guide you towards a world-class education that opens doors to endless possibilities</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home5;
