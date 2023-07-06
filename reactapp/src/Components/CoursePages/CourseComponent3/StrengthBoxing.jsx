import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './boxinglogo3.png';
import strength from './Strength.jpg';
import explosive from './explosive.jpg';
import stability from './stability.jpg';
import endurance from './endurance.jpg';
import agiSpeed from './AgiSpeed.jpg';
import flexibility from './strech.jpg';
import injury from './injury.jpg';
import './CoursePage3.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import UserHome from '../../../Navbars/UserNav';
import { useParams } from 'react-router-dom';

const ProgressBar3 = () => {
  const [progress, setProgress] = useState(0);
  const [progressid,setProgressId] = useState(0);
  const [status,setStatus] = useState('');
  const {Id,courseId} = useParams();
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
    <>
      <div style={{ position: 'fixed', height: '10px', width: '100%',marginTop:'50px' }}>
      <UserHome />
      <div style={{ position: 'fixed', height: '40px',width: '100%' }}>
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
        <div style={{ position: 'fixed', height: '40px', backgroundColor: '#27b92b', marginTop: '90px', width: '100%' }}>
          <center><h4 style={{ color: 'yellow' }}>Status : {status}</h4></center></div>
      </div>
      <div style={{ flex: '1', overflowY: 'auto', paddingTop: '115px' }}>
        <div className='Sk3'>
          <div className='titleMain' style={{ marginLeft: '1%' }}><img width={120} height={80} src={logo} alt='Logo' /></div>
          <div className='Sty3'>Strength and Conditioning </div>
        </div>
        <div className='backimg3' style={{ width: '100', height: '100' }}>
          <div className='BoxingQuote'>

            <span>"GIVE UP YOUR</span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;SUCCESS</span></span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;OR</span></span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;GET UP FOR YOUR</span></span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;SUCCESS."</span></span>
          </div>
        </div>
        <div className='decorate'>
          <div></div>
        </div>
        <div className='Description'>
          <h2>About the Course</h2>
          <p style={{ textAlign: 'center', fontSize: '25px' }}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This course is designed for trainers and focuses on teaching the  strength and conditioning techniques and principles of boxing.</strong>
          </p>
          <div className='Description1'>
            <div>The course provides the following :</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingLeft: '50px' }}>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Strength Training</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Explosive Power</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Core Stability</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Endurance Training</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Agility and Speed</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Flexibility and Mobility</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Recovery and Injury Prevention</div>
              {/* <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Combinations</div>
    <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Conditioning</div>
    <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Ring Awareness</div> */}
            </div>
          </div>
        </div>
        <div style={{ alignItems: 'center', fontFamily: '-moz-initial' }}>
          <div>
            <h3><u>Strength Training</u>:-</h3>
            <div className='stance' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>Incorporate compound exercises that target multiple muscle groups and improve overall strength. Focus on exercises like squats, deadlifts, bench presses, overhead presses, rows, and pull-ups. Perform these exercises with proper form and gradually increase the weight to build strength and power.</p>
              <img style={{ width: '250px', height: '250px', border: '5px', borderColor: 'black' }} src={strength} alt='stance' />
            </div>
          </div>
          <div>
            <h3><u>Explosive Power</u>:-</h3>
            <div className='footwork' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
              <img style={{ width: '250px', height: '250px' }} src={explosive} alt='footwork img' />
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>Boxing requires explosive movements, so it's important to include exercises that develop power. Plyometric exercises like box jumps, medicine ball throws, and explosive push-ups can improve your ability to generate force rapidly. Incorporate these exercises into your routine to enhance your punching power and quickness.</p>
            </div>
          </div>
          <div>
            <h3><u>Core Stability</u>:-</h3>
            <div className='jab' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>A strong core is essential for generating power and maintaining balance in boxing. Include exercises that target your core muscles, such as planks, Russian twists, and medicine ball rotations. Focus on building core stability and rotational strength to improve your punching and defensive abilities.</p>
              <img style={{ width: '250px', height: '250px' }} src={stability} alt='Jab_img' />
            </div>
          </div>
          <div>
            <h3><u>Endurance Training</u>:-</h3>
            <div className='cross' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
              <img style={{ width: '250px', height: '250px' }} src={endurance} alt='Cross_img' />
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>Boxing matches can be physically demanding, so improving your endurance is crucial. Incorporate cardiovascular exercises such as running, skipping rope, cycling, and high-intensity interval training (HIIT). These activities will enhance your cardiovascular fitness, stamina, and recovery between rounds.</p>
            </div>
          </div>
          <div>
            <h3><u>Agility and Speed</u>:-</h3>
            <div className='hook' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}> Agility and speed are essential in boxing for quick movements and evasive footwork. Incorporate ladder drills, cone drills, and agility ladder exercises to improve your footwork, coordination, and overall agility. Additionally, perform speed drills like sprints and speed bag workouts to enhance your hand speed and reaction time.</p>
              <img style={{ width: '250px', height: '250px' }} src={agiSpeed} alt='Hook_img' />
            </div>
          </div>
          <div>
            <h3><u>Flexibility and Mobility</u>:-</h3>
            <div className='uppercut' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
              <img style={{ width: '250px', height: '250px' }} src={flexibility} alt='Uppercut_img' />
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>Maintaining good flexibility and mobility is important to prevent injuries and optimize performance. Incorporate dynamic warm-up exercises and static stretches to improve your flexibility and mobility. Focus on areas such as hips, shoulders, and wrists that are heavily utilized in boxing movements.</p>
            </div>
          </div>
          <div style={{ borderRadius: '25px' }}>
            <div style={{ paddingBottom: '30px' }}>
              <h3><u>Recovery and Injury Prevention</u>:-</h3>
              <div className='boxingring' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>Adequate rest and recovery are vital for progress and injury prevention. Incorporate rest days into your training schedule and prioritize quality sleep. Additionally, consider implementing recovery modalities like foam rolling, stretching, massage, and contrast baths to enhance recovery and reduce muscle soreness.</p>
                <img style={{ width: '250px', height: '250px' }} src={injury} alt='Boxingring_img' />
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingBottom: '0px' }}>
          <center style={{ color: 'orange' }}><a href='/page4'><button className='btn btn-warning' style={{ fontSize: '25px', paddind: '50px', width: '300px', height: '50px', borderRadius: '10px' }}>Register Now</button></a></center>
        </div>
        <div className='sk' style={{ padding: '30px' }}>
        </div>
      </div>
    </div></>
  );
};

export default ProgressBar3;