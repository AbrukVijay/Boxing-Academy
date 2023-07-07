import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../src/Components/CoursePages/CourseComponent1/boxinglogo.png';
import UserHome from './Navbars/UserNav';
import Image from  '../src/Images/preview.jpg';

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
  <><UserHome /><div>
         
          <div style={{height: '40px',  width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.8fr  .1fr', backgroundColor: '#27b92b', borderRadius: '5px' }}>
                  <div
                      style={{
                          width: `${progress}%`,
                          border: `1px solid ${progress === 100 ? '#27b92b' : 'black'} `,
                          borderColor: 'black',

                          borderRadius: '10PX',
                          height: '20px',
                          backgroundColor: 'rgb(5, 5, 142)',
                          //backgroundColor: '#27b92b',
                          margin: '1%'
                      }}
                  ><center></center></div><div style={{ justifySelf: 'center', padding: '15%', marginLeft: '10px' }}><strong>{progress}%</strong></div></div>
          </div>
          <div>
              <div style={{  height: '40px', backgroundColor: '#27b92b', width: '100%' }}>
                  <center><h4 style={{ color: 'yellow' }}>Status : {status}</h4></center></div>
          </div>
          <div>
              <div style={{ flex: '1', overflowY: 'auto'}}>
                  <div className='Sk2'>
                      <div className='titleMain' style={{ marginLeft: '2%' }}><img width={130} height={80} src={logo} alt='Logo' /></div>
                      <div className='Sty2'>{course}</div>
                  </div>
                  <div><img src={Image} alt='boxing page image' style={{width:'100%',height:'100vh'}}/></div>
              </div>
          </div>
      </div></>
      )
      }
      export default ProgressBarrr;