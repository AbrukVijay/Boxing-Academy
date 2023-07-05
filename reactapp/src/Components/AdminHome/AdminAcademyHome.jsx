import React, { useState,useEffect,navigate} from 'react';
import { Card,  Button, Row, Col, Container} from 'react-bootstrap';
//import data from './TemplateData.json';
import AdminHome from '../../Navbars/AdminNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './AdminAcademyHome.css';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {toast} from 'react-toastify';
import Swal from 'sweetalert2';



import { faStar as solidStar, faStarHalfAlt as halfStar, faStar as regularStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularEmptyStar } from '@fortawesome/free-regular-svg-icons';

function Rate({ averageRating }) {
  const fullStars = Math.floor(averageRating);
  const decimalPart = averageRating - fullStars;
  const emptyStars = 5 - Math.ceil(averageRating);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={solidStar} className="star filled" />);
  }

  if (decimalPart >= 0.75) {
    stars.push(<FontAwesomeIcon key={fullStars} icon={solidStar} className="star filled" />);
  } else if (decimalPart >= 0.25 && decimalPart < 0.75) {
    stars.push(<FontAwesomeIcon key={fullStars} icon={halfStar} className="star half-filled" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesomeIcon key={fullStars + 1 + i} icon={regularEmptyStar} className="star empty" />);
  }

  return <div className="star-rating">{stars}</div>;
}



  function AdminAcademyhome(){
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const [academyData, setAcademyData] = useState({
    editAcademyName: '',
    editContactNumber: '',
    editImageUrl: '',
    editEmailId: '',
    editAcademyLocation: '',
    editAcademyDescription: ''
  });

  const [data,setData] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5232/api/Admin/Getinstrat').then((res)=>{
      setData(res.data);
    }).catch((err)=>{
      alert(err);
    })
  })

  const handleDelete=(id)=>{
    //Delete Theme Api
    axios.delete('http://localhost:5232/api/Admin/DeleteInstitute/'+id)
      .then(response => {
        alert('SuccessS');
        if(response.data==="Academy Deleted")
        window.location.reload();
      })
      .catch(error => console.log(error));
  };
// select card delete code

const [selectedCards,setSelectedCards] = useState([]);
const [selectAll,setSelectAll] = useState([]);
const handleCardSelect = (instituteId) => {
  if(selectedCards.includes(instituteId)) {
    setSelectedCards(selectedCards.filter((id) => id !== instituteId));
  } else {
    setSelectedCards([...selectedCards, instituteId]);
  }
};

const handleSelectAll = () => {
  if(selectAll) {
    setSelectedCards([]);
    setSelectAll(false);
  } else {
    const allinstituteIds = data.map((item) => item.instituteId);
    setSelectedCards(allinstituteIds);
    setSelectAll(true);
  }
};

const hiddenCheckboxStyle = {
  position: 'absolute',
  top: '-9999px',
  left: '-9999px',
};
const cardStyle = {
  width: '19rem',
  position: 'static',
  border: '1px solid black',
  borderRadius: '10px',
  padding: '10px',
  height: '450px',
  cursor: 'pointer',
};
const selectedCardStyle = {
  ...cardStyle,
  backgroundColor: '#c7ddf9',
  position: 'static',
  display: 'flex',
  alignItems: 'center',
};
const [isLoading, setIsLoading] = useState(false);

const handleDeleteSelected = async () => {
    
  const result = await Swal.fire({
    title: 'Confirm Deletion',
    text: 'Are you sure you want to delete the selected Boxing Academy?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  });  


  if(result.isConfirmed) {
    setIsLoading(true);
  try {
    const deleteRequests = selectedCards.map(id=> {
      return axios.delete('http://localhost:5232/api/Admin/DeleteInstitute/'+id);
    });

    await axios.all(deleteRequests);
    setSelectedCards([]);
    setIsLoading(false);
    toast.warning("Selected Boxing Academy deleted");
  } catch (error) {
    setIsLoading(false);
    toast.error("Failed to delete selected boxing academy");
}
}
};


  return (
    <>
      <AdminHome />
      {/* <BoxingAcademy></BoxingAcademy> */}
      <div className="admin-page">
        <br />
        <Col sm={16} className="d-flex justify-content-center">
          <div className='admins' >
          <input size={'40'} id="searchInput" type="text" placeholder="Type here to search Academy" onChange={(event) => {
            setSearchKeyword(event.target.value);
          }} />
            <Button id="searchButton" className="adminsearch"  >
              Search
            </Button>
            </div>
        </Col>
        <br />
        <br />
        <Container className='mt-3'>
          <div className='button-select'>
        {selectedCards.length >0 && (
          <div className='mb-3 d-flex justify-content-end align-items-center' >
            <Button variant='primary' className='ms-3' onClick={handleSelectAll}>{selectAll ? 'Deselect All' : 'Select All'}</Button>
            <Button variant='danger' className='ms-3' onClick={handleDeleteSelected} style={{marginLeft: '10px'}}>Delete</Button>
          </div>
        )}
            </div>   
        <Row xs={1} sm={1} md={3} lg={3} xl={3}>
        { 
        data 
              .filter((item) => {
                if(searchKeyword === ""){
                  return item;
                }else if(item.instituteName.toLowerCase().includes(searchKeyword.toLowerCase())){
                  return item;
                }
              })
          .map(item => (
            <Col xs={12} sm={6} md={4} key={item.instituteId}>
          <Card id={`adminAcademyGrid${item.instituteId}`} className="mb-4" style={selectedCards.includes(item.instituteId) ? selectedCardStyle : cardStyle}
        onClick={() => handleCardSelect(item.instituteId)} >
            
           
         <a href={`/courses/${item.instituteId}`}   className='no-underline' > <Card.Img
                  variant="top"
                  src={item.imageUrl}
                  onError={e => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
                  }}
                /></a> 
                <Card.Body className="d-flex flex-column">
              
                  <Card.Title><h4>{item.instituteName}</h4></Card.Title>
                 
                  <div className="d-flex justify-content-between mb-3">
                    <div className="text-start">
                      <Card.Text>
                        <strong>                         
                        <em> <h5>place: {item.instituteAddress}</h5> </em>
                        </strong>
                      </Card.Text>
                      <br></br>
                    </div>
                  </div>
                  <div>
                  <Rate averageRating={parseFloat(item.averageRating)} />
                  <br></br>
                  </div>
                    <div>
                      <div style={{display:'grid',gridTemplateColumns:'0.2fr 0.2fr'}}>
                     <a  href={`/admin/editacademy/${item.instituteId}`} style={{color:'white'}}><FontAwesomeIcon icon={faPenToSquare} className="edit-icon fa-lg" onClick={(e) => e.stopPropagation()} /> </a> 
                      <FontAwesomeIcon icon={faTrashAlt} id="deleteAcademy"
                      className="edit-icon  fa-lg"
                      onClick={(e) => {e.stopPropagation(); handleDelete(item.instituteId)}}/>
                      {selectedCards.includes(item.instituteId) && (
                        // <CheckIcon className="Accheckmark-icon" />
                       <strong> <span className="Academycheckmark-icon">✓</span></strong>

                      )}
                      </div>      
                    </div>    
                              
                </Card.Body>
                
              </Card> 

            </Col>
          ))}
        </Row>
        
        </Container>
      
       <a href='/admin/addacademy'> <Button id = "AddAcademy" className='adminadd'>
          ADD ACADEMY
        </Button></a>

      </div>

    </>
  );
}
export default AdminAcademyhome;