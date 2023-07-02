import React from "react";
import UserHome from "../Navbars/UserNav";
import Home4 from "./Home4";
import Home5 from "./Home5";
import './Home3.css';
import './Home4.css';
import './Home5.css';

const Home3 = () => {
  return (
    <div className="home-container">
      <UserHome />
      <div className="content-container">
        <Home4 />
        <Home5 />
      </div>
    </div>
  );
};

export default Home3;
