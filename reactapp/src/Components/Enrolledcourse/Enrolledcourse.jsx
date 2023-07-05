import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import './Enrolledcourse.css';
import './Edit.css';
import { Card, Form, Col } from 'react-bootstrap';
import UserHome from "../../Navbars/UserNav";

function EnrolledCourse() {
  const navigate = useNavigate();
  const [admission, setAdmission] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.example.com/courses?searchTerm=${searchTerm}`); // Replace with your API endpoint URL
      if (response.data.length > 0) {
        setSearchTerm(response.data[0]);
      } else {
        setSearchTerm(null);
      }
      setSearchTerm("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserIdAndFetchAdmission();
  }, []);

  const getUserIdAndFetchAdmission = () => {
    const email = localStorage.getItem('email');
    if (!email) {
      return;
    }

    axios.get(`http://localhost:5232/api/user/${encodeURIComponent(email)}`)
      .then((response) => {
        const userId = response.data.userId;
        if (userId) {
          getAdmissionData(userId); // Fetch admission data using the user ID
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAdmissionData = (userId) => {
    axios.get(`http://localhost:5232/api/User/user/viewAdmission/${encodeURIComponent(userId)}`)
      .then((result) => { 
        // Log the data received from the API
        setAdmission(result.data);
        console.log(result.data)
        console.log('data fetch successful')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleEditCourse = (admissionId) => {
    navigate(`/user/enrolledcourseedit/${admissionId}`);
  };
  // const handlelearn = () => {
  //   navigate(`/user/learn/${admission.courseName}/${admission.userId}/${admission.courseId}`);
  // };

  const handleDeleteCourse = (admissionId) => {
    axios.delete(`http://localhost:5232/api/User/user/deleteAdmission/${encodeURIComponent(admissionId)}`)
      .then((result) => {
        getUserIdAndFetchAdmission();
        Swal.fire(
          'Deleted!',
          'Your course has been deleted.',
          'success'
        );
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          'Error!',
          'An error occurred while deleting the course.',
          'error'
        );
      });
  }

  const confirmDelete = (admissionId) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteCourse(admissionId);
      }
    });
  }

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <UserHome/>
      <div className="templateContainerec">
        <div className="searchInput_Containerec">
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
          <br />
        </div>
        <div className="template_Containerec">
          {admission.map((val) => {
            return (
              <div className="eccontainer" key={val.admissionId}>
                <Card className="cardec">
                  <Card.Body>
                    <div className="course-details">
                      <div className="hhh">
                        <Card.Text>
                          <strong>Course Name:</strong> {val.courseName}
                          <br />
                          <strong>Date of Joining:</strong> {val.dateOfJoining}
                          <br />
                          <strong>End Date:</strong> {val.endDate}
                          <br />
                          <br></br>
                          <a href={`/user/learn/${val.courseName}/${val.courseId}`}><Button variant="primary" className="button-spacing" >My learning</Button></a>
                          <EditOutlinedIcon
                            className="edit-icon icon-spacing"
                            onClick={() => handleEditCourse(val.admissionId)}
                          />
                          <DeleteIcon
                            className="delete-icon icon-spacing"
                            onClick={() => confirmDelete(val.admissionId)}
                          />
                        </Card.Text>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default EnrolledCourse;
