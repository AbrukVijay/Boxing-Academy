import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditCourse.css';
import Swal from 'sweetalert2';
import AdminHome from '../../Navbars/AdminNav';

const EditCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [courseEnrolled, setCourseEnrolled] = useState('');
  const [errors, setErrors] = useState({});
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5232/api/Admin/ViewCourse/${id}`);
        setCourse(response.data);
        setSelectedInstituteId(response.data.instituteId);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get("http://localhost:5232/api/Admin/viewInstitutes");
        setInstitutes(response.data);
        
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };

    fetchInstitutes();
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    const updatedCourse = {
      courseId: course.courseId,
      courseName: course.courseName,
      courseDuration: course.courseDuration,
      // numberofStudents: course.numberofStudents, // Updated field name
      courseTiming: course.courseTiming,
      courseDescription: course.courseDescription,
      instituteId: selectedInstituteId,
      // Include any other fields that need to be updated
    };

    try {
      const response = await axios.put(`http://localhost:5232/api/Admin/EditCourse/${id}`, updatedCourse);
      console.log('Course updated:', response.data);
      setUpdateSuccess(true);
      Swal.fire({
        icon: 'success',
        title: 'Course Updated',
        text: 'The course has been updated successfully.',
      });
    } catch (error) {
      console.error('Error updating course:', error);
      setUpdateError('Failed to update the course.');

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the course.',
      });
    }

    setIsUpdating(false);
  };

  const validateForm = () => {
    const errors = {};

    if (!course.courseName.trim()) {
      errors.courseName = 'Course Name is required';
    }
    else if(!/^[a-zA-Z/s& ]+$/.test(course.courseName)){
      errors.courseName = 'Please enter Valid Course Name ';
    }

    if (!course.courseDuration) {
      errors.courseDuration = 'Course Duration is required';
    } 
    else if(!/^[0-9\s]+$/.test(course.courseDuration)){
      errors.courseDuration = 'Please enter Valid Course Duartion ';
    }
    // else if (isNaN(course.courseDuration)) { // Check if it's a valid number
    //   errors.courseDuration = 'Enter valid course Duration';
    // }


    if (!course.courseTiming.trim()) {
      errors.courseTiming = 'Course Timing is required';
    }
    else if(!/^[a-zA-Z0-9\s]+$/.test(course.courseTiming)){
      errors.courseTiming = 'Please enter Valid Course Timing ';
    }

    if (!course.courseDescription.trim()) {
      errors.courseDescription = 'Course Description is required';
    }else if (course.courseDescription.trim().length > 200) {
      errors.courseDescription= 'Description cannot exceed 200 characters';
    }
   

    // if (!course.numberofStudents) { // Updated field name
    //   errors.courseEnrolled = 'No of students required';
    // }
    //  else if(!/^[0-9\s]+$/.test(course.numberofStudents)){
    //   errors.courseEnrolled = 'Please enter correct number of students enrolled for the course ';
    // }
    //  else if (isNaN(course.numberofStudents)) { // Check if it's a valid number
    //   errors.courseEnrolled = 'No of students must be a valid number';
    // }

    if (!selectedInstituteId) {
      errors.instituteSelect = 'Please select an institute';
    }

    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleUpdate();
    } else {
      console.log('Form contains errors. Please fix them.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <><AdminHome /><div>
      <center>
        <form className='updatereg1' onSubmit={handleSubmit}>
          <h1 className='updatereg2'>Edit Course</h1>
          {updateError && <div>{updateError}</div>}
          {updateSuccess && <div>Course updated successfully.</div>}
          <div className='updateform-container'>

            <div className='Acdemo1'>
              <label style={{ marginTop: "30px", marginRight: "220px", color: "black" }}><strong>Course Name:</strong></label>
              <input
                type="text"
                id="editCourseName"
                value={course.courseName}
                onChange={(e) => setCourse({ ...course, courseName: e.target.value })} />
              {errors.courseName && <div className='error'>{errors.courseName}</div>}
            </div>

            <div className='Acdemo1'>
              <label style={{ marginRight: "140px", color: "black" }}><strong>Course Duration in months:</strong></label>
              <input
                type="number"
                id="editCourseDuration"
                value={course.courseDuration}
                onChange={(e) => setCourse({ ...course, courseDuration: e.target.value })} />
              {errors.courseDuration && <div className='error'>{errors.courseDuration}</div>}
            </div>

            <div className='Acdemo1'>
              <label style={{ marginRight: "210px", color: "black" }}><strong>Course Timing:</strong></label>
              <input
                type="text"
                id="editCourseTiming"
                value={course.courseTiming}
                onChange={(e) => setCourse({ ...course, courseTiming: e.target.value })} />
              {errors.courseTiming && <div className='error'>{errors.courseTiming}</div>}
            </div>


            {/* <div className='Acdemo1'>
      <strong><label htmlFor="courseEnrolled" style={{ marginRight: "200px", color: "black" }}>Course Enrolled : </label></strong>
      <input
        type="number"
        id="editCourseEnrolled"
        className="enrolled-input1"
        value={course.numberofStudents} // Updated field name
        onChange={(e) => setCourse({ ...course, numberofStudents: e.target.value })} // Updated field name
      />
       {errors.courseEnrolled && <div className="error">{errors.courseEnrolled}</div>} */}
            {/* <div className='error'>{errors.courseEnrolled && <span>{errors.courseEnrolled}</span>}</div> */}
            {/* </div> */}


            <div className='Acdemo1'>
              <label style={{ marginRight: "180px", color: "black" }}><strong>Course Description:</strong></label>
              <textarea
                id="editCourseDescription"
                value={course.courseDescription}
                onChange={(e) => setCourse({ ...course, courseDescription: e.target.value })} />
              {errors.courseDescription && <div className="error">{errors.courseDescription}</div>}
              {/* {errors.courseDescription && <div>{errors.courseDescription}</div>} */}
            </div>

            <div className="Acdemo1">
              <strong> <label htmlFor="instituteSelect" style={{ marginRight: "210px", color: "black" }}>Select Institute :</label></strong>
              <select
                id="instituteSelect"
                value={selectedInstituteId}
                onChange={(e) => setSelectedInstituteId(e.target.value)} style={{ width: '350px', height: '35px', borderRadius: '8px', marginLeft: '80px', marginRight: '80px', textAlignLast: 'center' }}
              >
                <option value="" disabled selected>
                  Select one institute
                </option>
                {institutes.map((institute) => (
                  <option key={institute.instituteId} value={institute.instituteId}>
                    {institute.instituteName}
                  </option>
                ))}
              </select>
              {errors.instituteSelect && <div className='error'>{errors.instituteSelect}</div>}
            </div>
          </div>
          <button className="Acupdatebtn1" id="updateCourse" disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update Course'}
          </button>
        </form>
      </center>
    </div></>
  );
};

export default EditCourse;