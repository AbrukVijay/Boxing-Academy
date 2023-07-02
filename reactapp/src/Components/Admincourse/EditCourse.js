import React, {useState , useEffect} from 'react';
import './EditCourse.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const EditCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseEnrolled, setCourseEnrolled] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseTiming, setCourseTiming] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  
  const { id1 } = useParams();
  const handleUpdate=()=>{
    const courseData={
      // courseId: 34,
      courseName: courseName,
      courseDescription: courseDescription,
      courseDuration: courseDuration,
      courseTiming: courseTiming,
      numberofStudents: courseEnrolled,
      instituteId: selectedInstituteId,
    }
    const id = id1;
  axios.put('http://localhost:5071/api/Admin/EditCourse/'+id,courseData)
  .then(response => {
    if(response.data==="course Edited")
    alert('course edited');
    window.location.reload();
  })
  .catch(error =>  alert(error));

  }




//   useEffect(() => {
//     // Fetch the course data from the API using Axios
//     axios.get(`http://localhost:5071/api/Admin/ViewcoursebyId?InstId=8`)
//     .then(response => {
//         const courseData = response.data; // Assuming the API response contains the course data

//         // Set the retrieved data in the state variables
//         setCourseName(courseData.courseName);
//         setCourseEnrolled(courseData.courseEnrolled);
//         setCourseDuration(courseData.courseDuration);
//         setCourseTiming(courseData.courseTiming);
//         setCourseDescription(courseData.courseDescription);
//         setSelectedInstituteId(courseData.selectedInstituteId);
//       })
//        .catch (error => {
//         console.log('Error fetching course data:', error);
//       });
//   // }, [id1]);
// }, [courseId]);



  //
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



  useEffect (() => {
    handleEdit(id1) ;
  }, []
  );


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
      newErrors.courseEnrolled = 'This field is required';
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
    if (!courseTiming.trim()) {
      newErrors.courseTiming = 'Course Timing is required';
    }else if (!courseTimingRegex.test(courseTiming)) {
      newErrors.courseTiming = 'Please Enter Valid Course Timing';
    }
    
    const trimmedDescription=courseDescription.trim();
    if (trimmedDescription.length===0) {
      newErrors.courseDescription = 'Description is required';
    } else if (trimmedDescription.length < 20) {
      newErrors.courseDescription = 'Description can be atleast 20 characters';
    } else if (trimmedDescription.length > 150) {
      newErrors.courseDescription= 'Description cannot exceed 150 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // handleUpdate();
      // Perform your submission logic here
      // e.g., send the data to an API or perform further processing
      console.log('Form submitted successfully!');
    } else {
      console.log('Form contains errors. Please fix them.');
    }
  };


  const handleEdit = (id1) => {
    setIsLoading(true);
    axios.get('http://localhost:5071/api/Admin/viewcoursebyId?InstId/'+id1)
      .then((result) => {
        setIsLoading(false);
        handleShow();
        setCourseName(result.courseData.courseName);
        setCourseEnrolled(result.courseData.courseEnrolled);
        setCourseDuration(result.courseData.courseDuration);
        setCourseTiming(result.courseData.courseTiming);
        setCourseDescription(result.courseData.courseDescription);
        setSelectedInstituteId(result.courseData.selectedInstituteId);
      })
      .catch((error) => {
        // alert(error);
      });
    }



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   if (validateForm()) {
  //     // Create the updated course object
  //     const updatedCourse = {
  //       courseId: 34, // Replace with the actual course ID
  //       courseName: courseName,
  //       courseEnrolled: courseEnrolled,
  //       courseDuration: courseDuration,
  //       courseTiming: courseTiming,
  //       courseDescription: courseDescription,
  //       instituteId: selectedInstituteId,
  //     };
  
  //     // Perform an API call to update the course
  //     axios.put(`http://localhost:5071/api/Admin/EditCourse/${id1}`, updatedCourse)
  //       .then(response => {
  //         if (response.data === "course Edited") {
  //           alert('Course edited');
  //           // Perform any necessary actions after successful update, such as updating the respective card with the new values
  //         }
  //       })
  //       .catch(error => {
  //         alert(error);
  //       });
  //   } else {
  //     console.log('Form contains errors. Please fix them.');
  //   }
  // };
  





  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (validateForm()) {
  //     try {
  //       const response = await axios.put('http://localhost:5071/api/Admin/EditCourse/{id}', {
  //         courseId: 0,
  //         courseName: courseName,
  //         numberofStudents: courseEnrolled,
  //         courseDuration: courseDuration,
  //         courseTiming: courseTiming,
  //         courseDescription: courseDescription,
  //         instituteId: selectedInstituteId,
  //       });
  //       // Handle the successful update (e.g., show a success message)
  //       console.log('Course updated successfully!', response.data);
  //     } catch (error) {
  //       // Handle the error (e.g., show an error message)
  //       console.log('Error updating course:', error);
  //     }
  //   } else {
  //     console.log('Form contains errors. Please fix them.');
  //   }
  // };
  

  return (
    <div>
     
       
       <form className='updatereg1' onSubmit={handleSubmit} noValidate>
       <h6 className='updatereg2' >Edit Course</h6>
      <div className='updateform-container'> 
      
      {/* <div className='updateform-column'> */}
       <div className="Acdemo1" >
       <strong> <label  style={{marginRight:"240px",color:"black"}}>Course Name : </label></strong>
       <input type="text" id="editCourseName"  class="name-input1"   placeholder="Enter the course Name" size="40" 
       onChange={(e) => setCourseName(e.target.value)}/>
       <div className='error'>{errors.courseName && <span>{errors.courseName}</span>}</div>
       </div>

       <div className='Acdemo1'>
       <strong><label htmlFor="courseDuration" style={{marginRight:"220px",color:"black"}}>Course Duration : </label></strong>
       <input type='text' id="editCourseDuration"  class="duration-input1"   placeholder="Enter the course duration" size="40" 
       onChange={(e) => setCourseDuration(e.target.value)}/>
       <div className='error'>{errors.courseDuration && <span>{errors.courseDuration}</span>}</div>
       </div>

       <div className='Acdemo1'>
       <strong> <label  style={{marginRight:"230px",color:"black"}}>Course Timing : </label> </strong>
       <input type='text' id="editCourseTiming"  class="timing-input1"    placeholder="Enter the course Timing" size="40" 
       onChange={(e) => setCourseTiming(e.target.value)}/>
       
       <div className='error'>{errors.courseTiming && <span>{errors.courseTiming}</span>}</div>
       </div>
    {/* </div> */}
       {/* <div className='form-column'> */}
       <div className='Acdemo1'>
       <strong><label htmlFor="courseEnrolled" style={{marginRight:"230px",color:"black"}}>Course Enrolled : </label></strong>
       <input type='number' id="editCourseEnrolled"  class="enrolled-input1"  placeholder="Enter no.of students enrolled for the course" size="40" 
       onChange={(e) => setCourseEnrolled(e.target.value)}/>
       
       <div className='error'>{errors.courseEnrolled && <span>{errors.courseEnrolled}</span>}</div>
       </div>
      
       <div className='Acdemo1'>
       <strong><label htmlFor="courseDescription" style={{marginRight:"200px",color:"black"}}>Course Description : </label></strong>
        <textarea className='textarea'
        id="editCourseDescription"
        class="description-input1"
         placeholder="Enter the course Description"
          onChange={(e) => setCourseDescription(e.target.value)}/>
  
           <div className='error'>{errors.courseDescription && <span>{errors.courseDescription}</span>}</div>
           </div>
       {/* </div> */}

       <div className="Acdemo1">
           <strong> <label htmlFor="instituteSelect" style={{marginRight:"210px",color:"black"}}>Select Institute :</label></strong>
            <select
              id="instituteSelect"
              value={selectedInstituteId}
              onChange={(e) => setSelectedInstituteId(e.target.value)} style={{ width: '350px',height: '30px', borderRadius: '8px' ,marginLeft:'0px',marginRight: '100px',textAlignLast: 'center'}}
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
  
       <button className="Acupdatebtn1" id="updateCourse" onClick={handleUpdate}>Update Course</button>
       </form>
    </div>
  );
};

export default EditCourse;