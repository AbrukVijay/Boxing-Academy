import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { GrAddCircle } from 'react-icons/gr';
import './adminCourse.css';
import axios from "axios";
// import {toast} from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHome from "../../Navbars/AdminNav";

function AdminCourse() {
  const navigate = useNavigate();
  // const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get('http://localhost:5232/api/Admin/viewCourse')
      .then(response => {
        setCourses(response.data);
        // setSelectedCourses(new Array(response.data.length).fill(false)); // Initialize selection state for each card
      })
      .catch(error => {
        console.error('Failed to fetch courses:', error);
      });
  };

  
   const handleSingleDelete = (id) => {
    console.log(id);
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this course!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:5232/api/Admin/DeleteCourse/${id}`)
        .then((response) => {
          Swal.fire('Deleted!', 'Course has been deleted.', 'success');
          fetchCourses();
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to delete the course.', 'error');
        });
    }
  });
};

  const handleDeleteIconClick = (event, courseId) => {
    event.stopPropagation();
    handleSingleDelete(courseId);
  };


  const [selectedCards,setSelectedCards] = useState([]);
const [selectAll,setSelectAll] = useState([]);


const handleCardSelect = (courseId) => {
  if(selectedCards.includes(courseId)) {
    setSelectedCards(selectedCards.filter((id) => id !== courseId));
  } else {
    setSelectedCards([...selectedCards, courseId]);
  }
};

const handleSelectAll = () => {
  if(selectAll) {
    setSelectedCards([]);
    setSelectAll(false);
  } else {
    const allcourseIds = courses.map((courseGrid) => courseGrid.courseId);
    setSelectedCards(allcourseIds);
    setSelectAll(true);
  }
};


const cardStyle = {
  width: '50rem',
  position: 'static',
  border: '1px solid black',
  borderRadius: '10px',
  padding: '10px',
  height: '150px',
  cursor: 'pointer',
  display: 'flex',
  
};
const selectedCardStyle = {
  ...cardStyle,
  backgroundColor: '#c7ddf9',
  position: 'static',
  display: 'flex',
  alignItems: 'center',
};
const [isLoading, setIsLoading] = useState(false);

const handleDeleteSelected = async () => {
    
  const result = await Swal.fire({
    title: 'Confirm Deletion',
    text: 'Are you sure you want to delete the selected Courses?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  });  


  if(result.isConfirmed) {
    setIsLoading(true);
  try {
    const deleteRequests = selectedCards.map(id=> {
      return axios.delete('http://localhost:5232/api/Admin/DeleteCourse/'+id);
      
    });

    await axios.all(deleteRequests);
    //  await Promise.all(deleteRequests);
    setSelectedCards([]);
    setIsLoading(false);
    // toast.warning("Selected Courses are deleted");
    Swal.fire('Deleted!', 'Selected courses have been deleted.', 'success');
  } catch (error) {
    setIsLoading(false);
    // toast.error("Failed to delete selected courses");
    Swal.fire('Error', 'Failed to delete the selected courses.', 'error');
}
fetchCourses();
}
};


  return (
    <>
    <AdminHome/>
     <ToastContainer />
      <div className="Acapp-container">
        <div className="ActemplateContainer">
          <div className="AcsearchInput_Container">
          <input
            id="AcsearchInput"
            type="text"
            className="adminCourse-input"
            placeholder="Type here to search Course"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <button id="searchCourse" type="submit">
            Search
          </button>
        </div>
          <div className="Actemplate_Container" >
          <div className="button-container">
          {selectedCards.length >0 && (
          <div className='mb-3 d-flex justify-content-end align-items-center' >
            <Button variant='primary' className='ms-3' onClick={handleSelectAll}>{selectAll ? 'Deselect All' : 'Select All'}</Button>
            <Button variant='danger' className='ms-3' onClick={handleDeleteSelected} style={{marginLeft: '10px'}}>Delete</Button>
          </div>
        )}
        </div>
            {courses
              .filter((courseGrid) => {
                if (searchTerm === "") {
                  return courseGrid;
                } else if (
                  courseGrid.courseName &&
                  courseGrid.courseName.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return courseGrid;
                } else {
                  return null;
                }
              })
              .map((courseGrid) => {
                

                return (
                  <div className="Actemplate" id={`courseGrid${courseGrid.courseId}`}  style={selectedCards.includes(courseGrid.courseId) ? selectedCardStyle : cardStyle}  onClick={() => handleCardSelect(courseGrid.courseId)}>
                    <div className="Acinfo" >
                    <div className="Accourse-info">
                      <h6 className="name">Course Name: {courseGrid.courseName}</h6>
                      <h6 className="duration">Course Duration: {courseGrid.courseDuration} months</h6>
                      <h6 className="timing">Course Available Timings: {courseGrid.courseTiming}</h6>
                    </div>
                    <div className="Accourse-info">
                      {/* <h6 className="enrolled">Number of Students: {courseGrid.numberofStudents}</h6> */}
                      <h6 className="description">Course Description: {courseGrid.courseDescription}</h6>
                    </div>
                   {/* </div>  */}
                  
                    <EditOutlinedIcon
                      className="Acedit-icon"
                      onClick={(event) => {
                        event.stopPropagation();
                        // navigate("/edit", { state: courseGrid.id });
                        navigate(`/admin/editcourse/${courseGrid.courseId}`);
                      }}
                    />
                    <DeleteIcon
                      className="Acdelete-icon"
                      onClick={(event) => handleDeleteIconClick(event, courseGrid.courseId)}
                    />
                    {selectedCards.includes(courseGrid.courseId) && (
                        // <CheckIcon className="Accheckmark-icon" />
                       <strong> <span className="Accheckmark-icon">✓</span></strong>

                      )}
                   {/* </div> */}
                  </div>
                  </div> 
                );
              })}
          </div>
          <div className="Add-course">
            <Button
            id="addCourse"
            class="add-course-button"
            type="submit"
            style={{ backgroundColor: 'blue', position: 'fixed', bottom: '20px', right: '20px' }}
            onClick={() => navigate("/admin/addcourse")}
          >
            <GrAddCircle />
            Add Course
          </Button>
           
          </div>
        </div>
        
      </div>
    </>
  );
}

export default AdminCourse;