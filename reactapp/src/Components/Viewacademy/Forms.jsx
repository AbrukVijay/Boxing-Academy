import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import './Forms.css';
import UserHome from '../../Navbars/UserNav';
import Swal from 'sweetalert2';


const Forms = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [fatherName, setFathersName] = useState('');
    const [motherName, setMothersName] = useState('');
    const [mobile, setPhoneNumber] = useState('');
    const [alternateMobile, setAlternatePhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [streetName, setStreetName] = useState('');
    const [areaName, setArea] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [nationality, setNationality] = useState('');
    const {  instituteId, courseId } = useParams();
    const [submissionStatus, setSubmissionStatus] = useState(null);


    const location = useLocation();
    


    // useEffect(() => {
     
    // }, []);
  
    // const getUserIdAndFetchAdmission = () => {
    //   const email = localStorage.getItem('email');
    //   if (!email) {
    //     return;
    //   }
  
    //   axios.get(`http://localhost:5232/api/user/${encodeURIComponent(email)}`)
    //     .then((response) => {
    //       const userId = response.data.userId;
    //       console.log(response.data.userId);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };
  
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
    if (!fatherName.trim()) {
      newErrors.fathersName ="Father's name is required";
    } else if (!fathersNameRegex.test(fatherName)) {
      newErrors.fathersName = 'Please enter a valid  name';
    }
    const mothersNameRegex = /^[a-zA-Z ]+$/;
    if (!motherName.trim()) {
      newErrors.mothersName = "Mother's name is required";
    } else if (!mothersNameRegex.test(motherName)) {
      newErrors.mothersName = 'Please enter a valid  name';
    }
    const phoneNumberRegex = /^\d{10}$/; 
    if (!mobile.trim()) {
     newErrors.phoneNumber = 'Phone Number is required';
    } else if (!phoneNumberRegex.test(mobile)) {
     newErrors.phoneNumber = 'Please enter a valid phonenumber';
    }
    const alternatePhoneNumberRegex = /^[0-9]+$/;
    if (!alternateMobile.trim()) {
      newErrors.alternatePhoneNumber= 'Alternate Phone Number is required';
    }else if (!alternatePhoneNumberRegex.test(alternateMobile)) {
      newErrors.alternatePhoneNumber= 'Please Enter  Alternate Phone Number';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    const ageRegex = /^[0-9]+$/;
    if (!age.trim()) {
      newErrors.age = 'Age is required';
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
    if (!areaName.trim()) {
     newErrors.area = 'Area is required';
    } else if (!areaRegex.test(areaName)) {
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



  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (validateForm()) {
      try {
        const {vdata} = location.state;
        const courseId=vdata.courseId;
        
        const formData = {
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
          courseId
          
        };
        
        
  
        const storedEmail = localStorage.getItem('email');
        if (!storedEmail) {
          console.log('Email not found in local storage');
          return;
        }

        axios.get(`http://localhost:5232/api/user/${encodeURIComponent(storedEmail)}`)
          .then((response) => {
            const userId = response.data.userId;
            const instituteId=vdata.instituteId;
            const courseid=vdata.courseId;
            axios.post(`http://localhost:5232/api/User/user/addAdmission/${courseid}/${instituteId}/${userId}`, formData)
              .then((response) => {
                console.log('Form submitted successfully!', response.data);
                Swal.fire({
                  icon: 'success',
                  title: 'Admission Added',
                  text: 'The Form has been submitted successfully.',
                });
              })
              .catch((error) => {
                console.error('Error submitting form:', error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    } else {
      console.log('Form contains errors. Please fix them.');
    }
  };
  
  
    
  return (
    <><UserHome /><div>
      <form className='editecform' onSubmit={handleSubmit}>
        <h4 className='enrollform'>Enroll Form</h4>
        <div className='studentedit-container'>
          {/* <div className='addform-column'> */}
          <div className="enrollform">
            <strong><label htmlFor="firstName" style={{ marginRight: "240px", color: "black" }}>First Name : </label></strong>
            <input type="text" id="firstName" className='name-input' placeholder="Enter First Name" size="40"
              onChange={(e) => setFirstName(e.target.value)} />

            <div className='errorform'>{errors.firstName && <span>{errors.firstName}</span>}</div>
          </div>
          <div className='enrollform'>
            <strong><label htmlFor="email" style={{ marginRight: "230px", color: "black" }}>Email : </label></strong>
            <input type='text' id="email1" className="email-input" placeholder="Enter Email" size="40"
              onChange={(e) => setEmail(e.target.value)} />

            <div className='errorform'>{errors.email && <span>{errors.email}</span>}</div>
          </div>

          <div className="enrollform ">
            <strong><label htmlFor="lastName" style={{ marginRight: "240px", color: "black" }}>Last Name : </label></strong>
            <input type="text" id="lastName" className='name-input' placeholder="Enter Last Name" size="40"
              onChange={(e) => setLastName(e.target.value)} />

            <div className='errorform'>{errors.lastName && <span>{errors.lastName}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="houseNo" style={{ marginRight: "200px", color: "black" }}>House No: </label></strong>
            <input type="text" id="houseNo" className='houseNo-input' placeholder="Enter House No" size="40"
              onChange={(e) => setHouseNo(e.target.value)} />
            <div className='errorform'>{errors.houseNo && <span>{errors.houseNo}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="gender" style={{ marginRight: "240px", color: "black" }}>Gender: </label></strong>
            <input type="text" id="gender" className='gender-input' placeholder="Enter Gender" size="40"
              onChange={(e) => setGender(e.target.value)} />

            <div className='errorform'>{errors.gender && <span>{errors.gender}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="streetName" style={{ marginRight: "200px", color: "black" }}>Street Name: </label></strong>
            <input type="text" id="streetName" className='streetName-input' placeholder="Enter Street Name" size="40"
              onChange={(e) => setStreetName(e.target.value)} />

            <div className='errorform'>{errors.streetName && <span>{errors.streetName}</span>}</div>
          </div>

          <div className="enrollform">
            <strong><label htmlFor="fathersName" style={{ marginRight: "240px", color: "black" }}>Father Name : </label></strong>
            <input type="text" id="fathersName" className='name-input' placeholder="Enter Father's Name" size="40"
              onChange={(e) => setFathersName(e.target.value)} />

            <div className='errorform'>{errors.fathersName && <span>{errors.fathersName}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="area" style={{ marginRight: "200px", color: "black" }}>Area: </label></strong>
            <input type="text" id="area" className='area-input' placeholder="Enter Area" size="40"
              onChange={(e) => setArea(e.target.value)} />

            <div className='errorform'>{errors.area && <span>{errors.area}</span>}</div>
          </div>

          <div className="enrollform">
            <strong><label htmlFor="mothersName" style={{ marginRight: "240px", color: "black" }}>Mother Name : </label></strong>
            <input type="text" id="mothersName" className='name-input' placeholder="Enter Mother's Name" size="40"
              onChange={(e) => setMothersName(e.target.value)} />

            <div className='errorform'>{errors.mothersName && <span>{errors.mothersName}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="pincode" style={{ marginRight: "200px", color: "black" }}>Pincode: </label></strong>
            <input type="text" id="pincode" className='pincode-input' placeholder="Enter Pincode" size="40"
              onChange={(e) => setPincode(e.target.value)} />

            <div className='errorform'>{errors.pincode && <span>{errors.pincode}</span>}</div>
          </div>

          <div className='enrollform'>
            <strong><label htmlFor="age" style={{ marginRight: "230px", color: "black" }}>Age : </label></strong>
            <input type='number' id="age" className="age-input" placeholder="Enter Age" size="40"
              onChange={(e) => setAge(e.target.value)} />

            <div className='errorform'>{errors.age && <span>{errors.age}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="state" style={{ marginRight: "200px", color: "black" }}>State: </label></strong>
            <input type="text" id="state" className='state-input' placeholder="Enter State" size="40"
              onChange={(e) => setState(e.target.value)} />

            <div className='errorform'>{errors.state && <span>{errors.state}</span>}</div>
          </div>

          <div className='enrollform'>
            <strong><label htmlFor="phoneNumber" style={{ marginRight: "230px", color: "black" }}>Phone Number: </label></strong>
            <input type='number' id="phoneNumber" className="phonenumber-input" placeholder="Enter PhoneNumber" size="40"
              onChange={(e) => setPhoneNumber(e.target.value)} />

            <div className='errorform'>{errors.phoneNumber && <span>{errors.phoneNumber}</span>}</div>
          </div>
          <div className="enrollform">
            <strong><label htmlFor="nationality" style={{ marginRight: "200px", color: "black" }}>Nationality: </label></strong>
            <input type="text" id="nationality" className='nationality-input' placeholder="Enter Nationality" size="40"
              onChange={(e) => setNationality(e.target.value)} />

            <div className='errorform'>{errors.nationality && <span>{errors.nationality}</span>}</div>
          </div>
          <div className='enrollform'>
            <strong><label htmlFor="alternatePhoneNumber" style={{ marginRight: "150px", color: "black" }}>Alternate Phone Number : </label></strong>
            <input type='number' id="alternatePhoneNumber" className="phnumber-input" placeholder="Enter Alternate Phone Number" size="40"
              onChange={(e) => setAlternatePhoneNumber(e.target.value)} />

            <div className='errorform'>{errors.alternatePhoneNumber && <span>{errors.alternatePhoneNumber}</span>}</div>
          </div>
        </div>
        <button className="enrollformbutton" id="addStudent"> Enroll Now</button>
      </form>
      {submissionStatus === 'success' && (
        <div className="popup success">Enrolled to the course successfully!</div>
      )}
      {submissionStatus === 'error' && (
        <div className="popup error">Error submitting the form. Please try again.</div>
      )}
    </div></>
  );
};

export default Forms;