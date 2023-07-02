import React, { useState } from 'react';
import axios from 'axios';
import { isEmpty } from 'validator';
import UserHome from '../../Navbars/UserNav';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
  
}
from 'mdb-react-ui-kit';

function Form() {
  const [formData, setFormData] = useState({
    // Form field values
  });

  const [errors, setErrors] = useState({
    // Form field errors
  });

  function handleSubmit(event) {
    event.preventDefault();

    // Perform validations
    const validationErrors = {
      // Validation rules
    };

    // Set the validation errors in the state
    setErrors(validationErrors);

    // If there are no validation errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      // Make a POST request to the backend
      axios.post('your-backend-api-url', formData)
        .then(response => {
          // Handle the success response
          console.log('Form submitted successfully:', response.data);
        })
        .catch(error => {
          // Handle the error response
          console.error('Form submission failed:', error);
        });
    }
  }

  return (
    <>
      <UserHome />
      <form onSubmit={handleSubmit}>
      <MDBContainer fluid className='bg-white'>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol>

    <MDBCard className='my-4'>

      <MDBRow className='g-0'>

        <MDBCol md='6' className="d-none d-md-block">
          <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' alt="Sample photo" className="rounded-start" fluid />
        </MDBCol>

        <MDBCol md='6' style={{backgroundColor:'white'}}>

          <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
            <h3 className="mb-5 text-uppercase fw-bold">Enroll Form</h3>

            <MDBRow>

              <MDBCol md='6'>
                <MDBInput
                  wrapperClass='mb-4'
                  size='lg'
                  id='form1'
                  type='text'
                  placeholder='First Name'
                  pattern='[a-zA-Z]*'
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

                  size='lg' id='form2'
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
                  id='form3'
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
                  id='form4'
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
                  id='form5'
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
                  id='form6'
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
                  id='form7'
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
              id='form8'
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
                  id='form9'
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
                  id='form10'
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
                  size='lg' id='form11'
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
                  id='form12'
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
                  id='form13'
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
                  id='form14'
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

              <MDBBtn className='ms-2' type='submit' onSubmit={handleSubmit} size='lg'>Enroll now</MDBBtn>
            </div>

          </MDBCardBody>

        </MDBCol>
      </MDBRow>

    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>
      </form>
    </>
  );
}

export default Form;