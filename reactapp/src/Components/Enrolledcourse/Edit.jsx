import React, {useState, useEffect } from 'react';
import './Edit.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserHome from '../../Navbars/UserNav';
const EditStudent = () => {
    
  const { id } = useParams();
  //const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState('');
  
  const [errors, setErrors] = useState({});
  //const [institutes, setInstitutes] = useState([]);
  //const [selectedInstituteId, setSelectedInstituteId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5232/api/User/user/viewAdmission?userId=${id}`);
        setEdit(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  
    
  const handleUpdate = async () => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    const updatedDetails = {
      firstName:edit.firstName,
       lastName:edit.lastName,
       Mobile:edit.Mobile,
       Age:edit.Age,
      Gender:edit.Gender,
      HouseNo:edit.HouseNo, 
      streetName:edit.streetName,
      areaName:edit.areaName,
      State:edit.State,
      Pincode:edit.Pincode,
      Nationality:edit.Nationality,
        fatherName:edit.fatherName,
        motherName:edit.motherName,
        Email:edit.Email,
        alternateMobile:edit.alternateMobile
       
        
    
      // Include any other fields that need to be updated
    };

    try {
      const response = await axios.put(`http://localhost:5232/api/User/user/editAdmission/${id}`, updatedDetails);
      console.log('Course updated:', response.data);
      setUpdateSuccess(true);
      Swal.fire({
        icon: 'success',
        title: 'Details Updated',
        text: 'The details has been updated successfully.',
      });
    } catch (error) {
      console.error('Error updating details:', error);
      setUpdateError('Failed to update the details.');

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the details.',
      });
    }

    setIsUpdating(false);
  };

  const validateForm = () => {
    const errors = {};

    if (!edit.firstName || edit.firstName.trim() === '') {
      errors.firstName = 'First Name is required';
    }

    if (!edit.lastName || edit.lastName.trim() === '') {
      errors.lastName = 'Last Name is required';
    }

    if (!edit.fatherName || edit.fatherName.trim() === '') {
      errors.fatherName = 'Father Name is required';
    }

    if (!edit.motherName || edit.motherName.trim() === '') {
      errors.motherName = 'Mother Name is required';
    }

    if (!edit.Gender || edit.Gender.trim() === '') {
      errors.Gender = 'Gender is required';
    }

    if (!edit.Age || edit.Age.trim() === '') {
      errors.Age = 'Age is required';
    }

    if (!edit.Email || edit.Email.trim() === '') {
      errors.Email = 'Email is required';
    }

    if (!edit.Mobile || edit.Mobile.trim() === '') {
      errors.Mobile = 'Mobile Number is required';
    }

    if (!edit.alternateMobile || edit.alternateMobile.trim() === '') {
      errors.alternateMobile = 'Alternate Mobile Number is required';
    }

    if (!edit.HouseNo || edit.HouseNo.trim() === '') {
      errors.HouseNo = 'House Number is required';
    }

    if (!edit.streetName || edit.streetName.trim() === '') {
      errors.streetName = 'Street Name is required';
    }

    if (!edit.areaName || edit.areaName.trim() === '') {
      errors.areaName = 'Area Name is required';
    }

    if (!edit.State || edit.State.trim() === '') {
      errors.State = 'State is required';
    }

    if (!edit.Pincode || edit.Pincode.trim() === '') {
      errors.Pincode = 'Pincode is required';
    }

    if (!edit.Nationality || edit.Nationality.trim() === '') {
      errors.Nationality = 'Nationality is required';
    }



    // if (!edit.firstName.trim()) {
    //   errors.firstName = 'First Name is required';
    // }


    // if (!edit.lastName.trim()) {
    //   errors.lastName = 'Last Name is required';
    // }


    // if (!edit.fathersName.trim()) {
    //   errors.fathersName = ' Father Name is required';
    // }

    // if (!edit.mothersName.trim()) {
    //   errors.mothersName = ' Mother Name is required';
    // }

    // if (!edit.gender.trim()) {
    //   errors.gender = ' Gender is required';
    // }

    // if (!edit.age.trim()) {
    //   errors.age = 'Age is required';
    // }

    // if (!edit.email.trim()) {
    //   errors.email= ' Email is required';
    // }

    // if (!edit.phoneNumber.trim()) {
    //   errors.phoneNumber = ' Phone Number is required';
    // }

    // if (!edit.alternatePhoneNumber.trim()) {
    //   errors.alternatePhoneNumber = ' Alternate Phone Number is required';
    // }

    // if (!edit.houseNo.trim()) {
    //   errors.houseNo = ' House No is required';
    // }

    // if (!edit.streetName.trim()) {
    //   errors.streetName = ' Street Name is required';
    // }

    // if (!edit.area.trim()) {
    //   errors.area = ' Area Name is required';
    // }


    // if (!edit.state.trim()) {
    //   errors.state= ' State Name is required';
    // }

    // if (!edit.pincode.trim()) {
    //   errors.pincode = ' Pincode is required';
    // }
    // if (!edit.nationality.trim()) {
    //   errors.nationality = ' Nationality is required';
    // }


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
    <><UserHome /><div>
      <center>
        <form className='editec' onSubmit={handleSubmit}>
          <h4 className='editform'>Edit Form</h4>
          {updateError && <div>{updateError}</div>}
          {updateSuccess && <div>Course updated successfully.</div>}
          <div className='studenteditec-container'>

            <div className="enrollededit">
              <label style={{ marginTop: "30px", marginRight: "220px", color: "black" }}><strong>First Name:</strong></label>
              <input
                type="text"
                id="firstName"
                value={edit.firstName}
                onChange={(e) => setEdit({ ...edit, firstName: e.target.value })} />
              {errors.firstName && <div>{errors.firstName}</div>}
            </div>


            <div className='enrollededit'>
              <label style={{ marginTop: "30px", marginRight: "220px", color: "black" }}><strong>Email:</strong> </label>
              <input
                type='text'
                id="Email"
                value={edit.Email}
                onChange={(e) => setEdit({ ...edit, Email: e.target.value })} />
              {errors.Email && <div>{errors.Email}</div>}
            </div>

            <div className="enrollededit">
              <label style={{ marginRight: "240px", color: "black" }}><strong> Last Name:</strong></label>
              <input
                type="text"
                id="lastName"
                value={edit.lastName}
                onChange={(e) => setEdit({ ...edit, lastName: e.target.value })} />
              {errors.lastName && <div>{errors.lastName}</div>}
            </div>


            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong>House No: </strong></label>
              <input
                type="text"
                id="HouseNo"
                value={edit.HouseNo}
                onChange={(e) => setEdit({ ...edit, HouseNo: e.target.value })} />
              {errors.HouseNo && <div>{errors.HouseNo}</div>}
            </div>


            <div className="enrollededit">
              <label style={{ marginRight: "240px", color: "black" }}><strong> Father Name:</strong></label>
              <input
                type="text"
                id="fatherName"
                value={edit.fatherName}
                onChange={(e) => setEdit({ ...edit, fatherName: e.target.value })} />
              {errors.fatherName && <div>{errors.fatherName}</div>}
            </div>

            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong> Street Name:</strong> </label>
              <input
                type="text"
                id="streetName"
                value={edit.streetName}
                onChange={(e) => setEdit({ ...edit, streetName: e.target.value })} />
              {errors.streetName && <div>{errors.streetName}</div>}
            </div>

            <div className="enrollededit">
              <label style={{ marginRight: "240px", color: "black" }}><strong> Mother Name:</strong> </label>
              <input
                type="text"
                id="motherName"
                value={edit.motherName}
                onChange={(e) => setEdit({ ...edit, motherName: e.target.value })} />
              {errors.motherName && <div>{errors.motherName}</div>}
            </div>



            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong>Area Name:</strong> </label>
              <input
                type="text"
                id="areaName"
                value={edit.areaName}
                onChange={(e) => setEdit({ ...edit, areaName: e.target.value })} />
              {errors.areaName && <div>{errors.areaName}</div>}
            </div>

            <div className="enrollededit">
              <label style={{ marginRight: "240px", color: "black" }}><strong> Gender:</strong> </label>
              <input
                type="text"
                id="Gender"
                value={edit.Gender}
                onChange={(e) => setEdit({ ...edit, Gender: e.target.value })} />
              {errors.Gender && <div>{errors.Gender}</div>}
            </div>


            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong>Pincode:</strong> </label>
              <input
                type="text"
                id="Pincode"
                value={edit.Pincode}
                onChange={(e) => setEdit({ ...edit, Pincode: e.target.value })} />
              {errors.Pincode && <div>{errors.Pincode}</div>}
            </div>


            <div className='enrollededit'>
              <label style={{ marginRight: "230px", color: "black" }}><strong>Age:</strong> </label>
              <input
                type='number'
                id="Age"
                value={edit.Age}
                onChange={(e) => setEdit({ ...edit, Age: e.target.value })} />
              {errors.Age && <div>{errors.Age}</div>}
            </div>

            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong>State:</strong> </label>
              <input
                type="text"
                id="State"
                value={edit.State}
                onChange={(e) => setEdit({ ...edit, State: e.target.value })} />
              {errors.State && <div>{errors.State}</div>}
            </div>

            <div className='enrollededit'>
              <label style={{ marginRight: "230px", color: "black" }}><strong> Phone Number:</strong> </label>
              <input
                type='number'
                id="Mobile"
                value={edit.Mobile}
                onChange={(e) => setEdit({ ...edit, Mobile: e.target.value })} />
              {errors.Mobile && <div>{errors.Mobile}</div>}
            </div>



            <div className="enrollededit">
              <label style={{ marginRight: "200px", color: "black" }}><strong>Nationality:</strong> </label>
              <input
                type="text"
                id="Nationality"
                value={edit.Nationality}
                onChange={(e) => setEdit({ ...edit, Nationality: e.target.value })} />
              {errors.Nationality && <div>{errors.Nationality}</div>}
            </div>


            <div className='enrollededit'>
              <label style={{ marginRight: "150px", color: "black" }}><strong> Alternate Phone Number:</strong> </label>
              <input
                type='number'
                id="alternateMobile"
                value={edit.alternateMobile}
                onChange={(e) => setEdit({ ...edit, alternateMobile: e.target.value })} />
              {errors.alternateMobile && <div>{errors.alternateMobile}</div>}
            </div>

          </div>


          <button className="enrollecbutton" id="enrollbutton" disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </form>
      </center>
    </div></>
  );
};

export default EditStudent;