import React, {useState, useEffect} from 'react';
import './edit.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminHome from '../../Navbars/AdminNav';


const EditStudent1 = () => {
  const {id} = useParams();
  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
    
    const [instcou, setInstcou] = useState([]);
  const [selectedInstcou, setSelectedInstcou] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError]= useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false); 
  //const navigate = useNavigate()
    useEffect(() => {
    // Fetch student data from API and populate the form
    const fetchStudent = async () => {
      try {
        const response = await axios.get('http://localhost:5232/api/Admin/ViewStudent/'+id);
       setStudent(response.data);
       setIsLoading(false);
      } catch (error){
        console.error('Error fetching course:', error);
        setIsLoading(false);
      }
    };
       
    fetchStudent();
  }, [id]);
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5232/api/Admin/Getinstitutescourses"
        );
        setInstcou(response.data);
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
    const updatedStudent = {
      studentId:id,
       firstName:student.firstName,
       lastName:student.lastName,
       gender:student.gender,
       motherName:student.motherName,
       fatherName:student.fatherName,
       mobile:student.mobile,
       alternateMobile:student.alternateMobile,
       email:student.email,
       age:student.age,
       houseNo:student.houseNo,
       streetName:student.streetName,
       areaName:student.areaName,
       pincode:student.pincode,
       state:student.state,
       nationality:student.nationality,
       courseId:student.selectedInstcou

    };
    try{
      const response = await axios.put(`http://localhost:5232/api/Admin/EditStudent/${id}`,updatedStudent);
      console.log('Student updated:',response.data);
      setUpdateSuccess(true);
      Swal.fire({
        icon:'success',
        title:'Student details Updated',
        text:'The student has been updated successfully.',
      });
    }catch (error) {
      console.error('Error updating the student details:', error);
      setUpdateError('Failed to update the student.');
      
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Failed to update the student.',
      });
    }
setIsUpdating(false);
  };

  const validateForm = () => {
    const errors = {}; 

    if (!student.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    
    if (!student.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }
    
    if (!student.gender.trim()) {
      errors.gender = 'gender is required';
    }
    
    if (!student.fatherName.trim()) {
      errors.fatherName = 'fatherName is required';
    }
    if (!student.motherName.trim()) {
      errors.motherName = 'motherName is required';
    }
    if (!student.mobile.trim()) {
      errors.mobile = 'mobile number is required';
    }
    if (!student.alternateMobile.trim()) {
      errors.alternateMobile = 'alternate number is required';
    }
    if (!student.email.trim()) {
      errors.email = 'email is required';
    }
    if (!student.age.trim()) {
      errors.age = 'age is required';
    }
    if (!student.houseNo.trim()) {
      errors.houseNo = 'houseNo is required';
    }
    if (!student.streetName.trim()) {
      errors.streetName = 'streetName is required';
    }
    if (!student.areaName.trim()) {
      errors.areaName = 'areaName is required';
    }
    if (!student.pincode.trim()) {
      errors.pincode = 'pincode is required';
    }
    if (!student.state.trim()) {
      errors.state = 'state is required';
    }
    
    if (!student.nationality.trim()) {
      errors.nationality = 'nationality is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit =  (e) => {
    e.preventDefault();
    // if (validateForm()) {
      handleUpdate();
    // }else{
    //   console.log('Form contains errors, Please fix them,');
    // }
};
     if(isLoading){
      return <div>Loading...</div>
     }
  return (
    <><AdminHome /><div>
      <form className='editstu1' onSubmit={handleSubmit}>
        <h2 className='editstu2'>Edit Form</h2>
        {updateError && <div>{updateError}</div>}
        {updateSuccess && <div>Student updated successfully.</div>}
        <div className='studenteditform-container'>

          <div className="Stueditdemo">
            <label style={{ marginRight: "240px", color: "black" }}><strong>First Name : </strong></label>
            <input type="text" id="firstName" className='name-input' size="40"
              value={student.firstName}
              onChange={(e) => setStudent({ ...student, firstName: e.target.value })} />

            {errors.firstName && <div>{errors.firstName}</div>}
          </div>
          <div className="Stueditdemo">
            <label style={{ marginRight: "240px", color: "black" }}><strong>HouseNo : </strong></label>
            <input type="text" id="houseno" className='houseno' size="40"
              value={student.houseNo}
              onChange={(e) => setStudent({ ...student, houseNo: e.target.value })} />

            {errors.houseNo && <div>{errors.houseNo}</div>}
          </div>
          <div className="Stueditdemo">
            <label style={{ marginRight: "240px", color: "black" }}><strong>last Name : </strong></label>
            <input type="text" id="lastName" className='name-input' size="40"
              value={student.lastName}
              onChange={(e) => setStudent({ ...student, lastName: e.target.value })} />

            {errors.lastName && <div>{errors.lastName}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>StreetName :</strong> </label>
            <input type="text" id="streetName" className='streetName-input' size="40"
              value={student.streetName}
              onChange={(e) => setStudent({ ...student, streetName: e.target.value })} />

            {errors.streetName && <div>{errors.streetName}</div>}
          </div>

          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>Gender :</strong> </label>
            <input type="text" id="gender" className='gender-input' size="40"
              value={student.gender}
              onChange={(e) => setStudent({ ...student, gender: e.target.value })} />

            {errors.gender && <div>{errors.gender}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>AreaName :</strong> </label>
            <input type="text" id="areaName" className='area' size="40"
              value={student.areaName}
              onChange={(e) => setStudent({ ...student, areaName: e.target.value })} />

            {errors.areaName && <div>{errors.areaName}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>FatherName :</strong> </label>
            <input type="text" id="fatherName" className='fatherName' size="40"
              value={student.fatherName}
              onChange={(e) => setStudent({ ...student, fatherName: e.target.value })} />

            {errors.fatherName && <div>{errors.fatherName}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>pincode :</strong> </label>
            <input type="text" id="pincode" className='pincode' size="40"
              value={student.pincode}
              onChange={(e) => setStudent({ ...student, pincode: e.target.value })} />

            {errors.pincode && <div>{errors.pincode}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>motherName :</strong> </label>
            <input type="text" id="motherName" className='motherName' size="40"
              value={student.motherName}
              onChange={(e) => setStudent({ ...student, motherName: e.target.value })} />

            {errors.motherName && <div>{errors.motherName}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>State :</strong> </label>
            <input type="text" id="state" className='state' size="40"
              value={student.state}
              onChange={(e) => setStudent({ ...student, state: e.target.value })} />

            {errors.state && <div>{errors.state}</div>}
          </div>

          <div className="Stueditdemo ">
            <label style={{ marginRight: "270px", color: "black" }}><strong>Age :</strong> </label>
            <input type="text" id="age" className='age' size="40"
              value={student.age}
              onChange={(e) => setStudent({ ...student, age: e.target.value })} />

            {errors.age && <div>{errors.age}</div>}
          </div>
          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>Nationality :</strong> </label>
            <input type="text" id="nationality" className='nationality' size="40"
              value={student.nationality}
              onChange={(e) => setStudent({ ...student, nationality: e.target.value })} />

            {errors.nationality && <div>{errors.nationality}</div>}
          </div>

          <div className="Stueditdemo ">
            <label style={{ marginRight: "230px", color: "black" }}><strong>Mobilenumber :</strong> </label>
            <input type="text" id="mobile" className='mobile' size="40"
              value={student.mobile}
              onChange={(e) => setStudent({ ...student, mobile: e.target.value })} />

            {errors.mobile && <div>{errors.mobile}</div>}
          </div>

          <div className="Stueditdemo ">
            <label style={{ marginRight: "220px", color: "black" }}><strong>AlternateMobile :</strong> </label>
            <input type="text" id="alternatemobile" className='alternatemoobile' size="40"
              value={student.alternateMobile}
              onChange={(e) => setStudent({ ...student, alternateMobile: e.target.value })} />

            {errors.alternateMobile && <div>{errors.alternateMobile}</div>}
          </div>

          <div className="Stueditdemo ">
            <label style={{ marginRight: "240px", color: "black" }}><strong>Email :</strong> </label>
            <input type="text" id="email" className='email' size="40"
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })} />

            {errors.email && <div>{errors.email}</div>}
          </div>



          <div>
            <label htmlFor="instituteSelect" style={{ marginRight: "220px", color: "black" }}><strong>Select Institute</strong></label>
            <select
              className='instituteselect-student'
              id="institutecouSelect"
              value={selectedInstcou}
              onChange={(e) => setSelectedInstcou(e.target.value)}
            >
              <option value="" disabled selected>
                Select one institute
              </option>
              {instcou.map((institute) => (
                <option key={institute.courseId} value={institute.courseId}>
                  {institute.instituteName}-{institute.courseName}
                </option>
              ))}
            </select>
            {/* {errors.instituteSelect && <div>{errors.instituteSelect}</div>} */}
          </div>
        </div>
        <button className="Edit-student-button" id="editStudent" disabled={isUpdating}>{isUpdating ? 'Updating...' : 'Update Student'}</button>
      </form>

    </div></>
  );
  };
export default EditStudent1;