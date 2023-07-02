import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import './Enrolledcourse.css';
import './Edit.css';
import { Card, Form,Col } from 'react-bootstrap';
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
    // Call the functions to fetch user ID and admission data
    getUserIdAndFetchAdmission();
  }, []);

  const getUserIdAndFetchAdmission = () => {
    const email = localStorage.getItem('email'); // Retrieve the email from local storage

    if (!email) {
      return; // Return early if the email is not available in local storage
    }

    axios.get(`http://localhost:5071/api/user/${encodeURIComponent(email)}`)
      .then((response) => {
        const userId = response.data.userId; // Extract the user ID from the response
        if (userId) {
          getAdmissionData(userId); // Fetch admission data using the user ID
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAdmissionData = (userId) => {
    axios.get(`http://localhost:5071/api/User/user/viewAdmission/${encodeURIComponent(userId)}`)
      .then((result) => { 
        // Log the data received from the API
        setAdmission(result.data);
        console.log('data fetch successful')
        const AdmissionId = result.data.admissionId;
        console.log(AdmissionId)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditCourse = (course) => {
    navigate(`/edit/${course.admissionId}`);
  };

  const handleDeleteCourse = (admissionId) => {
    axios.delete(`http://localhost:5071/api/User/user/deleteAdmission/${encodeURIComponent(admissionId)}`)
      .then((result) => {
        // Refresh the data after successful deletion
        getUserIdAndFetchAdmission();
        Swal.fire(
          'Deleted!',
          'Your course has been deleted.',
          'success'
        )
      })
      .catch((error) => {
        console.log(error)
        Swal.fire(
          'Error!',
          'An error occurred while deleting the course.',
          'error'
        )
      })
  }

  const Alert = (admissionId) => {
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
    })
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
              <div className="eccontainer">
                <Card className="cardec">
                  <Card.Body>
                    <div className="course-details" key={val.AdmissionId}>
                      <div className="hhh">
                        <Card.Text>
                          <strong>Course Name:</strong> {val.courseName}
                          <br />
                          <strong>Date of Joining:</strong> {val.dateOfJoining}
                          <br />
                          <strong>End Date:</strong> {val.endDate}
                          <br />
                          <br></br>
                          <Button variant="primary" className="button-spacing">My learning</Button>
                          <EditOutlinedIcon className="edit-icon icon-spacing" onClick={() => handleEditCourse(val)} />
                          <DeleteIcon className="delete-icon icon-spacing" onClick={() => Alert(val.AdmissionId)} />
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