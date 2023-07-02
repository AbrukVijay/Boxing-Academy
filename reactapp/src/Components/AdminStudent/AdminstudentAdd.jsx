import React, {useState, useEffect} from 'react';
import './add.css';
import axios from 'axios';
//import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddStudent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [fathersName, setFathersName] = useState('');
    const [mothersName, setMothersName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [alternateMobileNumber, setAlternateMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [streetName, setStreetName] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [nationality, setNationality] = useState('');
    const [instcou, setInstcou] = useState([]);
  const [selectedInstcou, setSelectedInstcou] = useState("");
  
  const [errors, setErrors] = useState({});
  

  const validateForm = () => {
    const newErrors = {}; 

    const firstNameRegex = /^[a-zA-Z ]+$/;
    if (!firstName.trim()) {
      newErrors.firstName = 'first Name is required';
    }else if (!firstNameRegex.test(firstName)) {
      newErrors.firstName = 'Please Enter Valid  Name';
    }
    const lastNameRegex = /^[a-zA-Z ]+$/;
    if (!lastName.trim()) {
      newErrors.lastName = 'last Name is required';
    }else if (!lastNameRegex.test(lastName)) {
      newErrors.lastName = 'Please Enter Valid  Name';
    }
    const genderRegex = /^(male|female)$/i; 
    if (!gender.trim()) {
      newErrors.gender = 'Gender is required';
    } else if (!genderRegex.test(gender)) {
      newErrors.gender = 'Please enter a valid gender';
    }
    const fathersNameRegex = /^[a-zA-Z ]+$/;
    if (!fathersName.trim()) {
      newErrors.fathersName ="Father's name is required";
    } else if (!fathersNameRegex.test(fathersName)) {
      newErrors.fathersName = 'Please enter a valid  name';
    }
    const mothersNameRegex = /^[a-zA-Z ]+$/;
    if (!mothersName.trim()) {
      newErrors.mothersName = "Mother's name is required";
    } else if (!mothersNameRegex.test(mothersName)) {
      newErrors.mothersName = 'Please enter a valid  name';
    }
    const mobileNumberRegex = /^\d{10}$/; 
    if (!mobileNumber.trim()) {
     newErrors.mobileNumber = 'This Field is required';
    } else if (!mobileNumberRegex.test(mobileNumber)) {
     newErrors.mobileNumber = 'Please enter a valid mobilenumber';
    }
    const alternateMobileNumberRegex = /^[0-9]+$/;
    if (!alternateMobileNumber.trim()) {
      newErrors.alternateMobileNumber= 'This Field is required';
    }else if (!alternateMobileNumberRegex.test(alternateMobileNumber)) {
      newErrors.alternateMobileNumber= 'Please Enter  Alternate Mobile Number';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    const ageRegex = /^[0-9]+$/;
    if (!age.trim()) {
      newErrors.age = 'This Field is required';
    }else if (!ageRegex.test(age)) {
      newErrors.age= 'Please Enter Age';
    }
    const houseNoRegex = /^[a-zA-Z0-9\s]+$/;
    if (!houseNo.trim()) {
     newErrors.houseNo = 'House number is required';
    } else if (!houseNoRegex.test(houseNo)) {
     newErrors.houseNo = 'Please enter a valid house number';
    }
    const streetNameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!streetName.trim()) {
     newErrors.streetName = 'Street name is required';
    } else if (!streetNameRegex.test(streetName)) {
     newErrors.streetName = 'Please enter a valid street name';
    }
    const areaRegex = /^[a-zA-Z0-9\s]+$/;
    if (!area.trim()) {
     newErrors.area = 'Area is required';
    } else if (!areaRegex.test(area)) {
     newErrors.area = 'Please enter a valid area';
    }
    const pincodeRegex = /^\d{6}$/; // Matches exactly 6 digits
    if (!pincode.trim()) {
     newErrors.pincode = 'Pincode is required';
    } else if (!pincodeRegex.test(pincode)) {
     newErrors.pincode = 'Please enter a valid pincode';
    }
    const stateRegex = /^[a-zA-Z\s]+$/;
    if (!state.trim()) {
     newErrors.state = 'State is required';
    } else if (!stateRegex.test(state)) {
     newErrors.state = 'Please enter a valid state';
    }
    const nationalityRegex = /^[a-zA-Z\s]+$/;
    if (!nationality.trim()) {
     newErrors.nationality = 'Nationality is required';
    } else if (!nationalityRegex.test(nationality)) {
     newErrors.nationality = 'Please enter a valid nationality';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5071/api/Admin/Getinstitutescourses"
        );
        setInstcou(response.data);
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };
  
    fetchInstitutes();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
  if (validateForm()) {
    try {
      const response = await axios.post(
        "http://localhost:5071/api/Admin/AddStudent",
        {
        firstName,
        lastName,
        gender,
        fathersName,
        mothersName,
        mobileNumber,
        alternateMobileNumber,
        email,
        age,
        houseNo,
        streetName,
        area,
        pincode,
        state,
        nationality, 
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
        <form className='addstu1' onSubmit={handleSubmit} >
      <h6 className='addstu2' >Add Form</h6> 
      <div className='studentaddform-container'> 
       <div className="Studdemo" >
        <strong><label htmlFor="firstName" style={{marginRight:"230px",color:"black"}}>First Name : {""}</label></strong>
       <input type="text" id="firstName" className='name-input' placeholder="Enter First Name" size="40" 
       onChange={(e) => setFirstName(e.target.value)}/>
       
       <div className='error'>{errors.firstName && <span>{errors.firstName}</span>}</div>
       </div>
       <div className="Studdemo">
       <strong><label htmlFor="houseNo" style={{ marginRight: "220px", color: "black" }}>House No: {""}</label></strong>
       <input type="text" id="houseNo" className='houseNo-input' placeholder="Enter House No" size="40"
       onChange={(e) => setHouseNo(e.target.value)} />
      <div className='error'>{errors.houseNo && <span>{errors.houseNo}</span>}</div>
     </div>

       <div className="Studdemo " >
        <strong><label htmlFor="lastName" style={{marginRight:"230px",color:"black"}}>Last Name : {""}</label></strong>
       <input type="text" id="lastName" className='name-input' placeholder="Enter Last Name" size="40" 
       onChange={(e) => setLastName(e.target.value)}/>
       
       <div className='error'>{errors.lastName && <span>{errors.lastName}</span>}</div>
       </div>
       <div className="Studdemo">
      <strong><label htmlFor="streetName" style={{ marginRight: "230px", color: "black" }}>Street Name: {""}</label></strong>
      <input type="text" id="streetName" className='streetName-input' placeholder="Enter Street Name" size="40"
      onChange={(e) => setStreetName(e.target.value)} />

      <div className='error'>{errors.streetName && <span>{errors.streetName}</span>}</div>
     </div>
       
       <div className="Studdemo">
       <strong><label htmlFor="gender" style={{ marginRight: "260px", color: "black" }}>Gender: {""}</label></strong>
       <input type="text" id="gender" className='gender-input' placeholder="Enter Gender" size="40"
       onChange={(e) => setGender(e.target.value)} />

       <div className='error'>{errors.gender && <span>{errors.gender}</span>}</div>
      </div>
      <div className="Studdemo">
      <strong><label htmlFor="area" style={{ marginRight: "260px", color: "black" }}>Area: {""}</label></strong>
      <input type="text" id="area" className='area-input' placeholder="Enter Area" size="40"
       onChange={(e) => setArea(e.target.value)} />

      <div className='error'>{errors.area && <span>{errors.area}</span>}</div>
    </div>
       
        <div className="Studdemo" >
        <strong><label htmlFor="fathersName" style={{marginRight:"230px",color:"black"}}>Father Name : {""}</label></strong>
       <input type="text" id="fathersName" className='name-input' placeholder="Enter Father's Name" size="40" 
       onChange={(e) => setFathersName(e.target.value)}/>

        <div className='error'>{errors.fathersName && <span>{errors.fathersName}</span>}</div>
       </div>
       <div className="Studdemo">
     <strong><label htmlFor="pincode" style={{ marginRight: "230px", color: "black" }}>Pincode: {""}</label></strong>
    <input type="text" id="pincode" className='pincode-input' placeholder="Enter Pincode" size="40"
      onChange={(e) => setPincode(e.target.value)} />

    <div className='error'>{errors.pincode && <span>{errors.pincode}</span>}</div>
    </div>

       <div className="Studdemo" >
        <strong><label htmlFor="mothersName" style={{marginRight:"200px",color:"black"}}>Mother Name : {""}</label></strong>
       <input type="text" id="mothersName" className='name-input' placeholder="Enter Mother's Name" size="40" 
       onChange={(e) => setMothersName(e.target.value)}/>

         <div className='error'>{errors.mothersName && <span>{errors.mothersName}</span>}</div>
       </div>
       <div className="Studdemo">
     <strong><label htmlFor="state" style={{ marginRight: "240px", color: "black" }}>State: {""}</label></strong>
     <input type="text" id="state" className='state-input' placeholder="Enter State" size="40"
     onChange={(e) => setState(e.target.value)} />

     <div className='error'>{errors.state && <span>{errors.state}</span>}</div>
     </div>
      

       <div className='Studdemo'>
       <strong><label htmlFor="age" style={{marginRight:"280px",color:"black"}}>Age : {""}</label></strong>
       <input type='number' id="age" className="age-input" placeholder="Enter Age" size="40" 
       onChange={(e) => setAge(e.target.value)}/>
       
       <div className='error'>{errors.age && <span>{errors.age}</span>}</div>
      </div>
      <div className="Studdemo">
     <strong><label htmlFor="nationality" style={{ marginRight: "220px", color: "black" }}>Nationality: {""}</label></strong>
     <input type="text" id="nationality" className='nationality-input' placeholder="Enter Nationality" size="40"
     onChange={(e) => setNationality(e.target.value)} />

     <div className='error'>{errors.nationality && <span>{errors.nationality}</span>}</div>
    </div>
      

      <div className='Studdemo'>
       <strong><label htmlFor="mobileNumber" style={{marginRight:"230px",color:"black"}}>Mobile Number: {""}</label></strong>
       <input type='number' id="mobileNumber" className="mobilenumber-input" placeholder="Enter MobileNumber" size="40" 
       onChange={(e) => setMobileNumber(e.target.value)}/>
       
       <div className='error'>{errors.mobileNumber && <span>{errors.mobileNumber}</span>}</div>
      </div>
     
      <div className='Studdemo'>
       <strong><label htmlFor="alternateMobileNumber" style={{marginRight:"130px",color:"black"}}>Alternate Mobile Number : {""}</label></strong>
       <input type='number' id="alternateMobileNumber" className="phnumber-input" placeholder="Enter Alternate Mobile Number" size="40" 
       onChange={(e) => setAlternateMobileNumber(e.target.value)}/>
       
       <div className='error'>{errors.alternateMobileNumber && <span>{errors.alternateMobileNumber}</span>}</div>
      </div>
      
      <div className='Studdemo'>
       <strong><label htmlFor="email" style={{marginRight:"260px",color:"black"}}>Email : {""}</label></strong>
       <input type='text' id="email" className="email-input" placeholder="Enter Email" size="40" 
       onChange={(e) => setEmail(e.target.value)}/>
       
       <div className='error'>{errors.email && <span>{errors.email}</span>}</div>
      </div>
      <div>
          <label htmlFor="instituteSelect" style={{marginRight:"220px",color:"black"}}>Select Institute</label>
          <select
          className='instituteselect-student'
            id="instituteSelect"
            value={selectedInstcou}
            onChange={(e) => setSelectedInstcou(e.target.value)}
          >
            {instcou.map((institute) => (
              <option key={institute.cid} value={institute.cid}>
                {institute.in}-{institute.cn}
              </option>
            ))}
          </select>
        </div>

       
      {/* <div>
            <label htmlFor="instituteSelect">Select Institute</label>
            <select
              id="instituteSelect"
              value={selectedInstituteId}
              onChange={(e) => setSelectedInstituteId(e.target.value)}
            >
              {institutes.map((institute) => (
                <option key={institute.instituteId} value={institute.instituteId}>
                  {institute.instituteName}
                </option>
              ))}
            </select>
          </div> */}
          {/* <div>
            <label htmlFor="courseSelect">Select Course</label>
            <select
              id="courseSelect"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
            </div> */}
      </div>
       <button className="Add-student-button" id="addStudent"> Add Student</button>
       </form>

    </div>
  );
  };
export default AddStudent;