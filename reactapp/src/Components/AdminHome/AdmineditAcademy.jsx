//adminacademyedit.jsx
import React, {useState ,useEffect} from 'react';
import './AdmineditAcademy.css';
import axios  from 'axios';
import { useParams } from 'react-router-dom';



  const AdmineditAcademy = () => {
  const [academyName, setAcademyName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [email, setEmail] = useState('');
  const [academyLocation, setAcademyLocation] = useState('');
  const [academyDescription, setAcademyDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  




  const {id1} = useParams(); 
  const handleUpdate=()=>{
    const data = {
      instituteName:academyName ,
      instituteDescription:academyDescription ,
      instituteAddress: academyLocation,
      mobile: contactNumber,
      email: email,
      imageUrl:imageURL       
}
const id = id1;
  axios.put('http://localhost:5071/api/Admin/EditInstitute/'+id,data)
  .then(response => {
    if(response.data==="academy Edited")
    alert('academy edited');
    window.location.reload();
  })
  .catch(error =>  alert(error));

}



// useEffect(() => {
//   // Fetch the data from the API using axios or fetch
//   axios.get(`http://localhost:5071/api/Admin/ViewInstitute/58`)
//     .then(response => {
//       const data = response.data;
//       // Set the initial state of the form fields
//       setAcademyName(data.instituteName);
//       setContactNumber(data.mobile);
//       setImageURL(data.imageUrl);
//       setEmail(data.email);
//       setAcademyLocation(data.instituteAddress);
//       setAcademyDescription(data.instituteDescription);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }, [id1]);
useEffect (() => {
  handleEdit(id1) ;
}, []
);
  

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

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (validateForm()) {
      // Perform your submission logic here
      // e.g., send the data to an API or perform further processing
      console.log('Form submitted successfully!');
    } else {
      console.log('Form contains errors. Please fix them.');
    }
  };
  const handleEdit = (id1) => {
    setIsLoading(true);
    axios.get('http://localhost:5071/api/Admin/ViewInstitute/'+id1)
      .then((result) => {
        setIsLoading(false);
        console.log(result);
        handleShow();
        setAcademyName(result.data.instituteName);
        setContactNumber(result.data.mobile);
        setImageURL(result.data.imageUrl);
        setEmail(result.data.email);
        setAcademyLocation(result.data.instituteAddress);
        setAcademyDescription(result.data.instituteDescription);
  
        // let startTime = '';
        // if (typeof result.data.serviceCenterStartTime === 'string') {
        //   startTime = result.data.serviceCenterStartTime;
        // } else if (typeof result.data.serviceCenterStartTime === 'object' && result.data.serviceCenterStartTime !== null) {
        //   // Assuming the object has hours and minutes properties
        //   const startHours = result.data.serviceCenterStartTime.hours || 0;
        //   const startMinutes = result.data.serviceCenterStartTime.minutes || 0;
        //   startTime = `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`;
        // }
  
        // let endTime = '';
        // if (typeof result.data.serviceCenterEndTime === 'string') {
        //   endTime = result.data.serviceCenterEndTime;
        // } else if (typeof result.data.serviceCenterEndTime === 'object' && result.data.serviceCenterEndTime !== null) {
        //   // Assuming the object has hours and minutes properties
        //   const endHours = result.data.serviceCenterEndTime.hours || 0;
        //   const endMinutes = result.data.serviceCenterEndTime.minutes || 0;
        //   endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
        // }
  
        // seteditserviceCenterStartTime(startTime);
        // seteditserviceCenterEndTime(endTime);
        // seteditServiceCenterDescription(result.data.serviceCenterDescription);
        // seteditServiceCenterId(instituteId);
      })
      .catch((error) => {
        // alert(error);
      });
    }

  return (
    <div>
      
      <center>
       <form className='reg1' onSubmit={handleSubmit}>
       <h4 style={{fontFamily:'-moz-initial',padding:'15px'}} >Edit Academy</h4>
       
      <div className='form-container'> 
      <div >
       <div className="AdminEditdemo" >
       <strong><label for="AcademyName" style={{marginRight:"150px",color:"black",fontFamily:'-moz-initial',fontSize:'20px'}}>Academy Name : </label></strong>

       <input type="text" id="editAcademyName" value={academyName} placeholder="Enter Academy Name" size="40" 
       onChange={(e) => setAcademyName(e.target.value)} required/>
       </div>
       <div className='error'>{errors.academyName && <span>{errors.academyName}</span>}</div>
      
       <br></br>
       <div className='AdminEditdemo'>
       <strong><label for="ImageUrl" style={{marginRight:"140px",color:"black",fontFamily:'-moz-initial',fontSize:'20px'}}>Academy ImageUrl :</label></strong>

       <input type='url' id="editImageUrl" value={imageURL} placeholder="Enter the academy Image url" size="40" 
       onChange={(e) => setImageURL(e.target.value)}/>
       </div>
       <div className='error'>{errors.imageURL && <span>{errors.imageURL}</span>}</div>
    
       <br></br>

       <div className='AdminEditdemo'>
       <strong><label for="AcademyLocation" style={{marginRight:"140px",color:"black",fontFamily:'-moz-initial',fontSize:'20px'}}>Academy Location :</label></strong>

       <input type='loc' id="editAcademyLocation" value={academyLocation} placeholder="Enter Academy Location" size="40" 
       onChange={(e) => setAcademyLocation(e.target.value)}/>
       </div>
       <div className='error'>{errors.academyLocation && <span>{errors.academyLocation}</span>}</div>
       </div>

        
       <div >
       <div className='AdminEditdemo'>
       <strong><label for="ContactNumber" style={{marginRight:"150px",color:"black",fontFamily:'-moz-initial',fontSize:'20px'}}>Contact Number : </label></strong>

       <input type='tel' id="editContactNumber"  value={contactNumber} size="40" placeholder='enter mobile number'
       onChange={(e) => setContactNumber(e.target.value)}/>
       </div>
       <div className='error'>{errors.contactNumber && <span>{errors.contactNumber}</span>}</div>

       <br></br>

       <div className='dAdminEditdemomo' >
       <strong><label for="AcademyEmail" style={{marginRight:"170px",color:"black",fontFamily:'-moz-initial',fontSize:'20px'}}>Academy Email : </label></strong>

       <input type='text1' id="editEmailId"   value={email} placeholder="Enter the academy email" size="40" 
       onChange={(e) => setEmail(e.target.value)}></input>

       </div>
       <div className='error'>{errors.email && <span>{errors.email}</span>}</div>
      
     
       <br></br>
       
       <div className='AdminEditdemo'> <strong><label for="AcademyDescription" style={{marginRight:"180px",paddingRight:'35px',color:"black",fontFamily:'-moz-initial',fontSize:'20px'}}>Description :</label></strong>
    <textarea placeholder='Enter Academy Description' className='editdescription'
      value={academyDescription} id='academyDescription'
      onChange={(e) => setAcademyDescription(e.target.value)}
    ></textarea>
    <div className='error'>{errors.academyDescription && <span>{errors.academyDescription}</span>}</div>
    
  </div>
      </div>  
      <button style={{position: 'fixed',bottom: '20px',right:'20px'}} className="btn btn-primary" id="updateAcademy" onClick={handleUpdate}>Update Academy</button>
       </div>
       </form></center>
       
    </div>
  );
};

export default AdmineditAcademy;

