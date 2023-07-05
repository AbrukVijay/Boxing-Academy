import React, {useState } from 'react';
import './AdminAcademyAdd.css';
import axios from 'axios';
import Swal  from 'sweetalert2';
import AdminHome from '../../Navbars/AdminNav';

const AdminAcademyAdd = () => {
  const [academyName, setAcademyName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [email, setEmail] = useState('');
  const [academyLocation, setAcademyLocation] = useState('');
  const [academyDescription, setAcademyDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!academyName.trim()) {
      newErrors.academyName = 'Academy name is required';
    }else if(!/^[a-zA-Z\s]+$/.test(academyName)){
      newErrors.academyName = 'only enter Alphabets ';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!contactNumber.trim()) {
      newErrors.contactNumber = 'ContactNumber is required';
    }else if (!phoneRegex.test(contactNumber)) {
      newErrors.contactNumber = 'Invalid contact number';
    }
  
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!imageURL.trim()) {
      newErrors.imageURL = 'Image URL is required';
    }else if (!urlRegex.test(imageURL)) {
      newErrors.imageURL = 'Invalid image URL';
    }

    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z.-]+\.[com]{3,}$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!academyLocation.trim()) {
      newErrors.academyLocation = 'Location is required';
    }else if(!/^[a-zA-Z\s]+$/.test(academyLocation)){
      newErrors.academyLocation = 'only enter Alphabets ';
    }

    if (!academyDescription.trim()) {
      newErrors.academyDescription = 'Description is required';
    } else if (academyDescription.trim().length < 15) {
      newErrors.academyDescription = 'Description must contain atleast 15 characters';
    } else if (academyDescription.trim().length > 100) {
      newErrors.academyDescription= 'Description cannot exceed 100 characters';
    }
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAcademy=()=>{
    const AcademyData = {
      instituteName : academyName,
      instituteDescription : academyDescription,
      instituteAddress : academyLocation,
      mobile : contactNumber,
      email : email,
      imageUrl : imageURL
  
    }
    console.log(AcademyData);

    if(AcademyData.academyName!=="" && AcademyData.contactNumber!=="" && AcademyData.imageURL!=="" && AcademyData.email!=="" && AcademyData.academyLocation!=="" && AcademyData.academyDescription!==""){
      const url = "http://localhost:5232/api/Admin/addInstitute";
      axios.post(url,AcademyData).then((result)=>{
        if(result.data==="Academy Added")
        window.location.reload();
      }).catch((error)=>{
        alert(error);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
        }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform your submission logic here
      // e.g., send the data to an API or perform further processing
      console.log('Form submitted successfully!');
      Swal.fire({
        icon: 'success',
        title: 'Academy Added',
        text: 'The Academy has been added successfully.',
      });


    } else {
      console.log('Form contains errors. Please fix them.');
    }
  };
 

  return (
    <><AdminHome /><div>

      <center>
        <form className='AdminAcreg1' onSubmit={handleSubmit}>
          <h4 style={{ fontFamily: '-moz-initial', padding: '15px' }}>Add Academy</h4>

          <div className='add-admin-form-container'>

            <div className="AdminAcdemo">
              <strong><label for="AcademyName" style={{ marginTop:'20px',marginRight: "190px", color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Academy Name : </label></strong>
              <input type="text" id="academyName" placeholder="Enter Academy Name" size="40"
                onChange={(e) => setAcademyName(e.target.value)} />
            </div>
            <div className='error'>{errors.academyName && <span>{errors.academyName}</span>}</div>



            <div className='AdminAcdemo'>
              <strong><label for="ImageUrl" style={{ marginRight: "160px", color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Academy ImageUrl :</label></strong>
              <input type='url' id="imageUrl" placeholder="Enter the academy Image url" size="40"
                onChange={(e) => setImageURL(e.target.value)} />
            </div>
            <div className='error'>{errors.imageURL && <span>{errors.imageURL}</span>}</div>



            <div className='AdminAcdemo'>
              <strong><label for="academyLocation" style={{ marginRight: "160px", color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Academy Location :</label></strong>
              <input type='loc' id="AcademyLocation" placeholder="Enter Academy Location" size="40"
                onChange={(e) => setAcademyLocation(e.target.value)} />
            </div>
            <div className='error'>{errors.academyLocation && <span>{errors.academyLocation}</span>}</div>



            <div className='AdminAcdemo'>
              <strong><label for="contactNumber" style={{ marginRight: "180px", color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Contact Number : </label></strong>
              <input type='tel' id="ContactNumber" placeholder="Enter the contact number" size="40"
                onChange={(e) => setContactNumber(e.target.value)} />
            </div>
            <div className='error'>{errors.contactNumber && <span>{errors.contactNumber}</span>}</div>


            <div className='AdminAcdemo'>
              <strong><label for="AcademyEmail" style={{ marginRight: "190px", color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Academy Email : </label></strong>
              <input type='text1' id="emailId" placeholder="Enter the academy email" size="40"
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='error'>{errors.email && <span>{errors.email}</span>}</div>



            <div className='AdminAcdemo'>   <strong><label for="AcademyDescription" style={{ marginRight: "180px", paddingRight: '35px', color: "black", fontFamily: '-moz-initial', fontSize: '20px' }}>Description :</label></strong>
              <textarea type='text2' id="academyDescription" placeholder="Enter academy description" size="40"
                onChange={(e) => setAcademyDescription(e.target.value)} />
            </div>
            <div className='error'>{errors.academyDescription && <span>{errors.academyDescription}</span>}</div>
          </div>

          <button className='btn btn-primary' id="addAcademy" onClick={handleAddAcademy}>Add Academy</button>
        </form></center>
    </div></> 
  );
};

export default AdminAcademyAdd;