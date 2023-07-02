import React from "react";
import { FaUser } from 'react-icons/fa';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slide6 from './Assets/image7.jpg'


function navbarr() {
  const handleLogoutClick = () => {
    // Implement your logout logic here
    window.location.href = "/login";
    console.log("Logout clicked");
  };

  return (

      <><style >
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
          .dropdown-item {
            width: auto;
          }
        `}
      </style>
      <Navbar bg="dark" variant="dark"  collapseOnSelect>
              <Navbar.Brand href="/BoxingAcademy" className="mr-auto">
                 <img src={slide6} alt="logo" style={{width:'50px', height:'50px' }}/>
              </Navbar.Brand>
              <Nav className="mx-auto">
                  <Nav.Link href="/Academy">Academy</Nav.Link>
                  <Nav.Link href="/Enrolled course">Enrolled Courses</Nav.Link>
              </Nav>
              <Nav>
                  <NavDropdown
                      title={<FaUser className="*" />}
                      id="basic-nav-dropdown"
                      alignRight
                  >
                      <NavDropdown.Item disabled>user name</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogoutClick}>
                          Logout
                      </NavDropdown.Item>
                  </NavDropdown>
              </Nav>
          </Navbar></>
      );
}

export default navbarr;
