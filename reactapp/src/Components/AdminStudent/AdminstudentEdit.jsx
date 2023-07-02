import React, { useState } from 'react';
//import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBContainer, MDBCard,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBInput,MDBRadio }from 'mdb-react-ui-kit';
import {  isEmpty } from 'validator';
import AdminHome from '../../Navbars/AdminNav';


function StudentEdit() {
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fathersName: '',
    mothersName: '',
    gender: '',
    age: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    email: '',
    houseNo: '',
    streetName: '',
    areaName: '',
    state: '',
    pincode: '',
    nationality: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    fathersName: '',
    mothersName: '',
    gender: '',
    age: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    email: '',
    houseNo: '',
    streetName: '',
    areaName: '',
    state: '',
    pincode: '',
    nationality: '',
  });


/*
  const [apiData, setApiData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  fetch('YOUR_API_ENDPOINT')
    .then(response => response.json())
    .then(data => {
      setApiData(data);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching API data:', error);
      setIsLoading(false);
    });
}, []);
*/


function handleSubmit(event) {
  event.preventDefault();

  // Perform validations
  const validationErrors = {};

  if (!formData.firstName || isEmpty(formData.firstName.trim())) {
    validationErrors.firstName = 'This field is required';
  }

  if (!formData.lastName || isEmpty(formData.lastName.trim())) {
    validationErrors.lastName = 'This field is required';
  }

  if (!formData.fathersNmae || isEmpty(formData.fathersName.trim())) {
    validationErrors.fathersName = "This field is required";
  }
if (!formData.mothersName || isEmpty(formData.mothersName())) {
    validationErrors.mothersName = "This field is required";
  }
if (!formData.gender || isEmpty(formData.gender())) {
    validationErrors.gender = 'This field is required';
  }
if (!formData.age || isEmpty(formData.age())) {
    validationErrors.age = 'This field is required';
  }
if (!formData.phoneNumber || isEmpty(formData.phoneNumber())) {
    validationErrors.phoneNumber = 'This field is required';
  }
if (!formData.alternatePhoneNumber || isEmpty(formData.alternatePhoneNumber())) {
    validationErrors.alternatePhoneNumber = 'This field is required';
  }
if (!formData.email || isEmpty(formData.email())) {
    validationErrors.email = 'This field is required';
  }
if (!formData.houseNo || isEmpty(formData.houseNo())) {
    validationErrors.houseNo = 'This field is required';
  }
if (!formData.streetName || isEmpty(formData.streetName())) {
    validationErrors.streetName = 'This field is required';
  }
if (!formData.areaName || isEmpty(formData.areaName())) {
    validationErrors.areaName = 'This field is required';
  }
if (!formData.state || isEmpty(formData.state())) {
    validationErrors.state = 'This field is required';
  }
if (!formData.pincode || isEmpty(formData.pincode())) {
    validationErrors.pincode = 'This field is required';
  }
  if (!formData.nationality || isEmpty(formData.nationality())) {
    validationErrors.nationality = 'This field is required';
  }


  // Set the validation errors in the state
  setErrors(validationErrors);

  // If there are no validation errors, you can proceed with form submission
  if (Object.keys(validationErrors).length === 0) {
    // Submit the form or perform further actions
  }
}
/*
return (
  <div>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div>
        {apiData ? (
          <p>{apiData.message}</p> // Replace `message` with the actual key in your API response
        ) : (
          <p>No data available</p>
        )}
      </div>
    )}
  </div>
);
        */

  return (
    <><AdminHome /><form onSubmit={handleSubmit}>
      <MDBContainer fluid className='bg-dark' style={{ width: '1200px' }}>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol>

            <MDBCard className='my-4'>

              <MDBRow className='g-0'>

                <MDBCol md='6' className="d-none d-md-block">
                  <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' alt="Sample photo" className="rounded-start custom-image" fluid />
                </MDBCol>

                <MDBCol md='6'>

                  <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                    <h3 className="mb-5 text-uppercase fw-bold">Edit Form</h3>

                    <MDBRow>

                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='firstName'
                          type='text'
                          placeholder='First Name'
                          pattern='[a-zA-Z]*'
                          //title='please enter your first name'
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          error={errors.firstName} />
                        {errors.firstName && (
                          <div className='text-danger'>{errors.firstName}</div>
                        )}

                      </MDBCol>

                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='lastName'
                          type='text'
                          placeholder='Last Name'
                          pattern='[a-zA-Z]*'
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          error={errors.lastName} />
                        {errors.lastName && (
                          <div className='text-danger'>{errors.lastName}</div>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <br />
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='fatherName'
                          type='text'
                          placeholder="Father's Name"
                          pattern='[a-zA-Z]*'
                          value={formData.fathersName}
                          onChange={(e) => setFormData({ ...formData, fathersName: e.target.value })}
                          error={errors.fathersName} />
                        {errors.fathersName && (
                          <div className='text-danger'>{errors.fathersName}</div>
                        )}

                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='motherName'
                          type='text'
                          placeholder="Mother's Name"
                          pattern='[a-zA-Z]*'
                          value={formData.mothersName}
                          onChange={(e) => setFormData({ ...formData, mothersName: e.target.value })}
                          error={errors.mothersName} />
                        {errors.mothersName && (
                          <div className='text-danger'>{errors.mothersName}</div>
                        )}

                      </MDBCol>
                    </MDBRow>

                    <br />
                    <MDBRow>
                      <MDBCol md='6'>
                        <div className='d-md-flex ustify-content-start align-items-center mb-4'>
                          <h6 class="fw-bold mb-0 me-4">Gender: </h6>
                          <MDBRadio
                            name='inlineRadio'
                            id='inlineRadio1'
                            value='female'
                            label='Female'
                            inline
                            checked={formData.gender === 'Female'}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />

                          <MDBRadio
                            name='inlineRadio'
                            id='inlineRadio2'
                            value='male'
                            label='Male'
                            inline
                            checked={formData.gender === 'male'}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
                        </div>
                        {errors.gender && <div className="text-danger">{errors.gender}</div>}



                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='age'
                          type='text'
                          placeholder="Age"
                          pattern="[1-9][0-9]{1}"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          error={errors.age} />
                        {errors.age && (
                          <div className='text-danger'>{errors.age}</div>
                        )}

                      </MDBCol>
                    </MDBRow>
                    <br />
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='phoneNumber1'
                          type='text'
                          placeholder="Phone Number"
                          pattern="[6-9][0-9]{9}"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          error={errors.phoneNumber} />
                        {errors.phoneNumber && (
                          <div className='text-danger'>{errors.phoneNumber}</div>
                        )}

                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput wrapperClass='mb-4'
                          size='lg'
                          id='phoneNumber2'
                          type='text'
                          placeholder=" Alternate Phone Number"
                          pattern="[6-9][0-9]{9}"
                          value={formData.alternatePhoneNumber}
                          onChange={(e) => setFormData({ ...formData, alternatePhoneNumber: e.target.value })}
                          error={errors.alternatePhoneNumber} />
                        {errors.alternatePhoneNumber && (
                          <div className='text-danger'>{errors.alternatePhoneNumber}</div>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <br />
                    <MDBInput
                      wrapperClass='mb-4'
                      size='lg'
                      id='emailId'
                      type='text'
                      placeholder="Email Id"
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email} />
                    {errors.email && (
                      <div className='text-danger'>{errors.email}</div>
                    )}

                    <br />
                    <h3 className="mb-5 text-uppercase fw-bold">Address Information </h3>


                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='houseNo'
                          type='text'
                          placeholder='House No'
                          pattern="^[0-9][0-9\s-]*$"
                          value={formData.houseNo}
                          onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
                          error={errors.houseNo} />
                        {errors.houseNo && (
                          <div className='text-danger'>{errors.houseNo}</div>
                        )}
                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='streetName'
                          type='text'
                          placeholder='Street Name'
                          pattern="[A-za-z]*"
                          value={formData.streetName}
                          onChange={(e) => setFormData({ ...formData, streetName: e.target.value })}
                          error={errors.streetName} />
                        {errors.streetName && (
                          <div className='text-danger'>{errors.streetName}</div>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <br />
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='areaName'
                          type='text'
                          placeholder='Area Name'
                          pattern="[A-za-z]*"
                          value={formData.areaName}
                          onChange={(e) => setFormData({ ...formData, areaName: e.target.value })}
                          error={errors.areaName} />
                        {errors.areaName && (
                          <div className='text-danger'>{errors.areaName}</div>
                        )}
                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='state'
                          type='text'
                          placeholder='State'
                          pattern="[A-za-z]*"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          error={errors.state} />
                        {errors.state && (
                          <div className='text-danger'>{errors.state}</div>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <br />

                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='pincode'
                          type='text'
                          placeholder='Pincode'
                          pattern="[5][0-9]{5}"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          error={errors.pincode} />
                        {errors.pincode && (
                          <div className='text-danger'>{errors.pincode}</div>
                        )}
                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          size='lg'
                          id='nationality'
                          type='text'
                          placeholder='Nationality'
                          pattern="[A-za-z]*"
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                          error={errors.nationality} />
                        {errors.nationality && (
                          <div className='text-danger'>{errors.nationality}</div>
                        )}
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-end pt-3">

                      <MDBBtn className='ms-2' type='submit' style={{ backgroundColor: 'blue' }} size='lg'>Update Student</MDBBtn>
                    </div>

                  </MDBCardBody>

                </MDBCol>
              </MDBRow>

            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </form></>
  );
}

export default StudentEdit;