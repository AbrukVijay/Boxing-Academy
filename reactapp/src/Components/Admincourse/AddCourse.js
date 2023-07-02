import React, {useState,useEffect } from 'react';
import './AddCourse.css';
import axios from 'axios';
//import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseEnrolled, setCourseEnrolled] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseTiming, setCourseTiming] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState("");


  const validateForm = () => {
    const newErrors = {}; 

    const courseNameRegex = /^[a-zA-Z ]+$/;
    if (!courseName.trim()) {
      newErrors.courseName = 'Course Name is required';
    }else if (!courseNameRegex.test(courseName)) {
      newErrors.courseName = 'Please Enter Valid Course Name';
    }


    const enrolledStudentRegex = /^[0-9]+$/;
    if (!courseEnrolled.trim()) {
      newErrors.courseEnrolled = 'This Field is required';
    }else if (!enrolledStudentRegex.test(courseEnrolled)) {
      newErrors.courseEnrolled = 'Please Enter Correct no.of Students Enrolled in a Course';
    }
  
    const durationRegex = /^[0-9a-zA-Z ]+$/;
    if (!courseDuration.trim()) {
      newErrors.courseDuration = 'Course Duration is required';
    }else if (!durationRegex.test(courseDuration)) {
      newErrors.courseDuration = 'Please Enter Valid Course Duration';
    }

    // const courseTimingRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM) to (0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/i;
    const courseTimingRegex = /^(0?[1-9]|1[0-2])(AM|PM) to (0?[1-9]|1[0-2])(AM|PM)$/i;
    // const courseTimingRegex = /^[0-9a-zA-Z ]+$/;
    if (!courseTiming.trim()) {
      newErrors.courseTiming = 'Course Timing is required';
    }else if (!courseTimingRegex.test(courseTiming)) {
      newErrors.courseTiming = 'Please Enter Valid Course Timing';
    }
    
    const trimmedDescription=courseDescription.trim();
    if (trimmedDescription.length === 0) {
      newErrors.courseDescription = 'Description is required';
    } else if (trimmedDescription.length < 20) {
      newErrors.courseDescription = 'Description can be atleast 20 characters';
    } else if (trimmedDescription.length > 150) {
      newErrors.courseDescription= 'Description cannot exceed 150 characters';
    }

    /*if (!courseDescription.trim()) {
      newErrors.courseDescription = 'Description is required';
    } else if (courseDescription.trim().length < 20) {
      newErrors.courseDescription = 'Description can be atleast 20 characters';
    } else if (courseDescription.trim().length > 150) {
      newErrors.courseDescription= 'Description cannot exceed 150 characters';
    }*/
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     // Perform your submission logic here
  //     // e.g., send the data to an API or perform further processing
  //     console.log('Form submitted successfully!');
  //   } else {
  //     console.log('Form contains errors. Please fix them.');
  //   }
  // };
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get("http://localhost:5071/api/Admin/GetAllInstitutes");
        setInstitutes(response.data);
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };

    fetchInstitutes();
  }, []);
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (validateForm()) {
  //     try {
  //       const response = await axios.post("/api/Admin/AddCourse", {
  //         courseName,
  //         courseEnrolled,
  //         courseDuration,
  //         courseTiming,
  //         courseDescription,
  //         instituteId: selectedInstituteId,
  //       });
  //       //console.log(response);
  //       console.log('Form submitted successfully!');
  //       console.log('API response:', response.data);
  //     } catch (error) {
  //       console.log('Error submitting the form:', error);
  //     }
  //   } else {
  //     console.log('Form contains errors. Please fix them.');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5071/api/Admin/AddCourse",
          {
            courseId: 0, // Update with appropriate value
            courseName: courseName,
            courseDescription: courseDescription,
            courseDuration: courseDuration,
            courseTiming: courseTiming,
            numberofStudents: courseEnrolled, // Assuming courseEnrolled represents the number of enrolled students
            instituteId: selectedInstituteId,
          }
        );

        console.log("Form submitted successfully!");
        console.log("API response:", response.data);
      } catch (error) {
        console.log("Error submitting the form:", error);
      }
    } else {
      console.log("Form contains errors. Please fix them.");
    }
  };

  



 
  return (
    <div>
      <form className="addreg1" onSubmit={handleSubmit} noValidate>
        <h6 className="addreg2">Add Course</h6>
        <div className="addform-container">
          {/* <div className='addform-column'> */}
          <div className="Acdemo">
            <strong>
              <label
                for="courseName"
                style={{ marginTop: "30px",marginRight: "220px", color: "black" }}
              >
                Course Name :{" "}
              </label>
            </strong>
            <input
              type="text"
              id="courseName"
              class="name-input"
              placeholder="Enter the course Name"
              size="40"
              onChange={(e) => setCourseName(e.target.value)}
            />

            <div className="error">
              {errors.courseName && <span>{errors.courseName}</span>}
            </div>
          </div>

          <div className="Acdemo">
            <strong>
              <label
                for="courseDuration"
                style={{ marginRight: "200px", color: "black" }}
              >
                Course Duration :{" "}
              </label>
            </strong>
            <input
              type="text"
              id="courseDuration"
              class="duration-input"
              placeholder="Enter the course duration"
              size="40"
              onChange={(e) => setCourseDuration(e.target.value)}
            />

            <div className="error">
              {errors.courseDuration && <span>{errors.courseDuration}</span>}
            </div>
          </div>

          <div className="Acdemo">
            <strong>
              <label
                for="courseTiming"
                style={{ marginRight: "220px", color: "black" }}
              >
                Course Timing :{" "}
              </label>
            </strong>
            <input
              type="text"
              id="courseTiming"
              class="timing-input"
              placeholder="Enter the course Timing"
              size="40"
              onChange={(e) => setCourseTiming(e.target.value)}
            />

            <div className="error">
              {errors.courseTiming && <span>{errors.courseTiming}</span>}
            </div>
          </div>
          {/* </div> */}
          {/* <div className='form-column'> */}
          <div className="Acdemo">
            <strong>
              <label
                for="courseEnrolled"
                style={{ marginRight: "210px", color: "black" }}
              >
                Course Enrolled :{" "}
              </label>
            </strong>
            <input
              type="number"
              id="courseEnrolled"
              class="enrolled-input"
              placeholder="Enter no.of students enrolled for the course"
              size="40"
              onChange={(e) => setCourseEnrolled(e.target.value)}
            />

            <div className="error">
              {errors.courseEnrolled && <span>{errors.courseEnrolled}</span>}
            </div>
          </div>

          <div className="Acdemo">
            <strong>
              <label
                for="courseDescription"
                style={{ marginRight: "190px", color: "black" }}
              >
                Course Description :{" "}
              </label>
            </strong>
            <textarea
              className="textarea"
              id="courseDescription"
              class="description-input"
              placeholder="Enter the course Description"
              onChange={(e) => setCourseDescription(e.target.value)}
            />

            <div className="error">
              {errors.courseDescription && (
                <span>{errors.courseDescription}</span>
              )}
            </div>
          </div>
          {/* </div> */}
          <div className="AcDemo">
           <strong> <label htmlFor="instituteSelect" style={{marginRight:"210px",color:"black"}}>Select Institute :</label></strong>
            <select
              id="instituteSelect"
              value={selectedInstituteId}
              onChange={(e) => setSelectedInstituteId(e.target.value)} style={{ width: '350px',height: '30px', borderRadius: '8px' ,marginRight: '100px',textAlignLast: 'center'}}
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
          </div>
        </div>

        <button className="Acaddbtn1" id="addCourse">
          {" "}
          Add Course
        </button>
      </form>
    </div>
  );
};
export default AddCourse;