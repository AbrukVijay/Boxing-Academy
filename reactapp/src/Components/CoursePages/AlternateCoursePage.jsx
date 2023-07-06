import UserHome from '../../Navbars/UserNav';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from './CourseComponent1/boxinglogo.png';
// import sss from './boxinglogo.png';

const ProgressBarrr = () => {
  const [progress, setProgress] = useState(0);
  const [progressid,setProgressId] = useState(0);
  const [status,setStatus] = useState('');
  const {course,Id,courseId} = useParams();
  
  let courseid = courseId;
   const id = Id;

  useEffect(() => {
    // Retrieve previous progress from the backend
    const isFirstRender = localStorage.getItem(`isFirstRender${courseid}`) === null;

    if (isFirstRender) {
      localStorage.setItem(`isFirstRender${courseid}`, 'true');
    }

      if (!isFirstRender) {
        const fetchPreviousProgress = async () => {
          try {
            const response = await axios.get(`http://localhost:5232/api/Admin/GetRecentProgress?userId=${id}&courseId=${courseid}`);
            const previousProgress = parseInt(response.data.progressPercentage);
            const progressid = response.data.progressId;
            setStatus(response.data.status);
            setProgress(previousProgress);
            setProgressId(progressid)
          } catch (error) {
            console.error(error);
          }
        };
  
        fetchPreviousProgress();
      }

    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          sendDataToBackend(prevProgress); // Send data to the backend when progress reaches 100
          return 100;
        }
        return prevProgress + 1;
      });
    }, 18000);//to set time accordingly
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    }, []);

    const handleBeforeUnload=(event)=>{
      event.preventDefault();
      sendDataToBackend(progress);// Send data to the backend when the webpage is closed or navigated away
      
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    const sendDataToBackend = async progress => {
    try {
    let status='';
    if(progress === 0){
      status = 'Not Started';
    }
    else if(progress===100){
      status = 'completed';
    }
    else{
      status = 'In Progress';
    }
    const timestamp = new Date();
    const Timestamp = timestamp.toISOString();

    
      const data={
        userId: parseInt(id),
        progressPercentage: progress,
        courseId: courseid,
        timetamp: Timestamp,
        status: status
      };
      // Make an HTTP POST or PUT request to send progress data to the backend
      if (localStorage.getItem(`isFirstRender${courseid}`) === 'true') {
        localStorage.setItem(`isFirstRender${courseid}`, 'false');
        await axios.post(`http://localhost:5232/api/User/user/viewstatus?progresspercentage=${progress}&userid=${id}&courseid=${courseid}`);
      } else {
        await axios.put(`http://localhost:5232/api/User/user/updatestatus/${progressid}?progressPercentage=${progress}`);
      }
    } catch (error) {
      console.error(error);
    }
  };




  return (
  <div>
    <div style={{position:'fixed',height:'50px',width:'100%'}}>
            <UserHome/>
        </div><br/>
    <div  style={{position:'fixed',height:'40px',width:'100%'}}>
    {/* <div style={{backgroundColor:'black',position:'fixed',width:'100%'}}> */}
    <div style={{display:'grid',gridTemplateColumns:'1.8fr  .1fr',backgroundColor:'#27b92b',borderRadius:'5px'}}>
      <div
        style={{
           width: `${progress}%`,
           border:`1px solid ${progress ===100 ? '#27b92b':'black'} `,
           borderColor:'black',
    
        borderRadius:'10PX',
          height: '20px',
          backgroundColor:'rgb(5, 5, 142)',
          //backgroundColor: '#27b92b',
          margin:'1%'

        }}
      ><center></center></div><div style={{justifySelf:'center' ,padding:'15%',marginLeft:'10px'}}><strong>{progress}%</strong></div></div>
    </div>
    <div>
    <div  style={{position:'fixed',height:'40px',backgroundColor:'#27b92b',marginTop:'90px',width:'100%'}}>
      <center><h4 style={{color:'yellow'}}>Status : {status}</h4></center></div>
    </div>
      <div>
      <div style={{flex:'1',overflowY:'auto',paddingTop:'115px'}}>
            <div className='Sk2' >
            <div className='titleMain' style={{marginLeft:'2%'}}><img width={130} height={80} src={logo} alt='Logo'/></div>
            <div className='Sty2' >{course}</div>
            </div>
          </div>
        </div>
      </div>
      )
      }
      export default ProgressBarrr;