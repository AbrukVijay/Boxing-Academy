import React, {useState, useEffect} from 'react';
import './add.css';
import axios from 'axios';
import AdminHome from '../../Navbars/AdminNav';
//import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddStudent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [mobile, setMobile] = useState('');
    const [alternateMobile, setAlternateMobile] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [streetName, setStreetName] = useState('');
    const [areaName, setAreaName] = useState('');
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
    const fatherNameRegex = /^[a-zA-Z ]+$/;
    if (!fatherName.trim()) {
      newErrors.fatherName ="Father's name is required";
    } else if (!fatherNameRegex.test(fatherName)) {
      newErrors.fatherName = 'Please enter a valid  name';
    }
    const motherNameRegex = /^[a-zA-Z ]+$/;
    if (!motherName.trim()) {
      newErrors.motherName = "Mother's name is required";
    } else if (!motherNameRegex.test(motherName)) {
      newErrors.motherName = 'Please enter a valid  name';
    }
    const mobileRegex = /^\d{10}$/; 
    if (!mobile.trim()) {
     newErrors.mobile = 'This Field is required';
    } else if (!mobileRegex.test(mobile)) {
     newErrors.mobile = 'Please enter a valid mobilenumber';
    }
    const alternateMobileRegex = /^[0-9]+$/;
    if (!alternateMobile.trim()) {
      newErrors.alternateMobile= 'This Field is required';
    }else if (!alternateMobileRegex.test(alternateMobile)) {
      newErrors.alternateMobile= 'Please Enter  Alternate Mobile Number';
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
    const areaNameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!areaName.trim()) {
     newErrors.areaName = 'Area is required';
    } else if (!areaNameRegex.test(areaName)) {
     newErrors.areaName = 'Please enter a valid area';
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
          "http://localhost:5232/api/Admin/Getinstitutescourses"
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
        "http://localhost:5232/api/Admin/AddStudent",
        {
        firstName,
        lastName,
        gender,
        fatherName,
        motherName,
        mobile,
        alternateMobile,
        email,
        age,
        houseNo,
        streetName,
        areaName,
        pincode,
        state,
        nationality,
        courseId: selectedInstcou
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
    <><AdminHome /><div>
      <form className='addstu1' onSubmit={handleSubmit}>
        <h6 className='addstu2'>Add Form</h6>
        <div className='studentaddform-container'>
          <div className="Studdemo">
            <strong><label htmlFor="firstName" style={{ marginRight: "230px", color: "black" }}>First Name : {""}</label></strong>
            <input type="text" id="firstName" className='name-input' placeholder="Enter First Name" size="40"
              onChange={(e) => setFirstName(e.target.value)} />

            <div className='error'>{errors.firstName && <span>{errors.firstName}</span>}</div>
          </div>
          <div className="Studdemo">
            <strong><label htmlFor="houseNo" style={{ marginRight: "220px", color: "black" }}>House No: {""}</label></strong>
            <input type="text" id="houseNo" className='houseNo-input' placeholder="Enter House No" size="40"
              onChange={(e) => setHouseNo(e.target.value)} />
            <div className='error'>{errors.houseNo && <span>{errors.houseNo}</span>}</div>
          </div>

          <div className="Studdemo ">
            <strong><label htmlFor="lastName" style={{ marginRight: "230px", color: "black" }}>Last Name : {""}</label></strong>
            <input type="text" id="lastName" className='name-input' placeholder="Enter Last Name" size="40"
              onChange={(e) => setLastName(e.target.value)} />

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
            <strong><label htmlFor="areaName" style={{ marginRight: "260px", color: "black" }}>AreaName: {""}</label></strong>
            <input type="text" id="areaName" className='area-input' placeholder="Enter Area" size="40"
              onChange={(e) => setAreaName(e.target.value)} />

            <div className='error'>{errors.areaName && <span>{errors.areaName}</span>}</div>
          </div>

          <div className="Studdemo">
            <strong><label htmlFor="fatherName" style={{ marginRight: "230px", color: "black" }}>Father Name : {""}</label></strong>
            <input type="text" id="fatherName" className='name-input' placeholder="Enter Father's Name" size="40"
              onChange={(e) => setFatherName(e.target.value)} />

            <div className='error'>{errors.fatherName && <span>{errors.fatherName}</span>}</div>
          </div>
          <div className="Studdemo">
            <strong><label htmlFor="pincode" style={{ marginRight: "230px", color: "black" }}>Pincode: {""}</label></strong>
            <input type="text" id="pincode" className='pincode-input' placeholder="Enter Pincode" size="40"
              onChange={(e) => setPincode(e.target.value)} />

            <div className='error'>{errors.pincode && <span>{errors.pincode}</span>}</div>
          </div>

          <div className="Studdemo">
            <strong><label htmlFor="motherName" style={{ marginRight: "200px", color: "black" }}>Mother Name : {""}</label></strong>
            <input type="text" id="motherName" className='name-input' placeholder="Enter Mother's Name" size="40"
              onChange={(e) => setMotherName(e.target.value)} />

            <div className='error'>{errors.motherName && <span>{errors.motherName}</span>}</div>
          </div>
          <div className="Studdemo">
            <strong><label htmlFor="state" style={{ marginRight: "240px", color: "black" }}>State: {""}</label></strong>
            <input type="text" id="state" className='state-input' placeholder="Enter State" size="40"
              onChange={(e) => setState(e.target.value)} />

            <div className='error'>{errors.state && <span>{errors.state}</span>}</div>
          </div>


          <div className='Studdemo'>
            <strong><label htmlFor="age" style={{ marginRight: "280px", color: "black" }}>Age : {""}</label></strong>
            <input type='number' id="age" className="age-input" placeholder="Enter Age" size="40"
              onChange={(e) => setAge(e.target.value)} />

            <div className='error'>{errors.age && <span>{errors.age}</span>}</div>
          </div>
          <div className="Studdemo">
            <strong><label htmlFor="nationality" style={{ marginRight: "220px", color: "black" }}>Nationality: {""}</label></strong>
            <input type="text" id="nationality" className='nationality-input' placeholder="Enter Nationality" size="40"
              onChange={(e) => setNationality(e.target.value)} />

            <div className='error'>{errors.nationality && <span>{errors.nationality}</span>}</div>
          </div>


          <div className='Studdemo'>
            <strong><label htmlFor="mobile" style={{ marginRight: "230px", color: "black" }}>Mobile Number: {""}</label></strong>
            <input type='number' id="mobile" className="mobilenumber-input" placeholder="Enter MobileNumber" size="40"
              onChange={(e) => setMobile(e.target.value)} />

            <div className='error'>{errors.mobile && <span>{errors.mobile}</span>}</div>
          </div>

          <div className='Studdemo'>
            <strong><label htmlFor="alternateMobile" style={{ marginRight: "130px", color: "black" }}>Alternate Mobile Number : {""}</label></strong>
            <input type='number' id="alternateMobile" className="phnumber-input" placeholder="Enter Alternate Mobile Number" size="40"
              onChange={(e) => setAlternateMobile(e.target.value)} />

            <div className='error'>{errors.alternateMobile && <span>{errors.alternateMobile}</span>}</div>
          </div>

          <div className='Studdemo'>
            <strong><label htmlFor="email" style={{ marginRight: "260px", color: "black" }}>Email : {""}</label></strong>
            <input type='text' id="email" className="email-input" placeholder="Enter Email" size="40"
              onChange={(e) => setEmail(e.target.value)} />

            <div className='error'>{errors.email && <span>{errors.email}</span>}</div>
          </div>
          <div>
            <label htmlFor="instituteSelect" style={{ marginRight: "220px", color: "black" }}>Select Institute</label>
            <select
              className='instituteselect-student'
              id="instituteSelect"
              value={selectedInstcou}
              onChange={(e) => setSelectedInstcou(e.target.value)}
            >

              {instcou.map((institute) => (
                <option key={institute.courseId} value={institute.courseId}>
                  {institute.instituteName}-{institute.courseName}
                </option>
              ))}
            </select>
          </div>



        </div>
        <button className="Add-student-button" id="addStudent"> Add Student</button>
      </form>

    </div></>
  );
  };
export default AddStudent;