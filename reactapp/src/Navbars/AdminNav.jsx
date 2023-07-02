import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLarge } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Logout from "../logout";

import axios from 'axios';

function AdminHome() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [username, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAuth = sessionStorage.getItem("isAuth");
  const role = sessionStorage.getItem("role");

  // Getting Username
  useEffect(() => {
    const email = localStorage.getItem("email");
    setEmail(email);

    axios.get(`http://localhost:5071/api/${encodeURIComponent(email)}/username`)
      .then((response) => {
        const usernameValue = response.data;
        setUserName(usernameValue);
        const userRoleValue = response.data.userRole || "defaultUserRole";
        setUserRole(userRoleValue);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const itemStyle = {
  };
  // Logout Functionality
  const handleLogout = () => {
    Logout();
    navigate('/');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  if (isHovered) {
    itemStyle.backgroundColor = 'lightgrey';
  }

  // Toggle Dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(255, 0, 0, 0.1))'
        }}
      >
        <Container>
          <Navbar.Brand href="/admin/adminacademy" style={{ color: 'white' }}>
            Boxing Nexus
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" style={{ color: 'red', filter: 'brightness(110%)' }}>
            <Nav className="me-auto" style={{ marginLeft: '375px' }}>
              <Button id="adminAcademy" variant="transparent">
                <Nav.Link href="/admin/adminacademy" style={{ color: 'white' }}>Academy</Nav.Link>
              </Button>
              <Button id="adminCourse" variant="transparent">
                <Nav.Link href="/admin/course" style={{ color: 'white' }}>Course</Nav.Link>
              </Button>
              <Button id="adminStudents" variant="transparent">
                <Nav.Link href="/admin/students" style={{ color: 'white' }}>Students</Nav.Link>
              </Button>
            </Nav>
            <Nav className="collapse navbar-collapse justify-content-end" style={{ color: 'ButtonHighlight' }}>
              <Dropdown show={isDropdownOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle variant="transparent" id="profileDropdown">
                  <FontAwesomeIcon icon={faUserLarge} style={{ color: 'white', fontSize: '1.5rem' }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item disabled style={{ color: 'black' }}>Hello, {username}</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}
                    style={itemStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminHome;
