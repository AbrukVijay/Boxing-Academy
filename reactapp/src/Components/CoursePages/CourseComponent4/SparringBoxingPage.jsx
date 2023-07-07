import React, { useState, useEffect } from 'react';
import logo from './boxinglogo4.png';
import conditioning from './fitness.jpg';
import technic from './technic.jpg';
import strategy from './Strategy.jpg';
import sparring from './sparring.jpg';
import cardio from './cardio.jpg';
import vedio from './vedio.jpg';
import nutrition from './neutrition.jpg';
import competition from './Competition.jpg';
import './CoursePage4.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import UserHome from '../../../Navbars/UserNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProgressBar4 = () => {
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
          <div style={{ position: 'fixed', height: '50px', width: '100%' }}>
              
          </div>
          <div style={{ height: '40px', width: '100%' }}>
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
         
              <div style={{ height: '40px', backgroundColor: '#27b92b', marginTop: '0px', width: '100%' }}>
                  <center><h4 style={{ color: 'yellow' }}>Status : {status}</h4></center></div>
         
          <div style={{ flex: '1', overflowY: 'auto'}}>
              <div className='Sk4'>
                  <div className='titleMain' style={{ marginLeft: '1%' }}><img width={120} height={80} src={logo} alt='Logo' /></div>
                  <div className='Sty4'>Sparring & Competitive Training</div>
              </div>
              <div className='bgimg4' style={{ width: '100', height: '100' }}>

              </div>
              <div className='decorate'>
                  <div></div>
              </div>
              <div className='Description'>
                  <h2>About the Course</h2>
                  <p style={{ textAlign: 'center', fontSize: '25px' }}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sparing and competitive training in boxing are essential components of a boxer's preparation. They help boxers develop their skills, improve their technique, and prepare mentally and physically for actual fights.</strong>
                  </p>
                  <div className='Description1'>
                      <div>The course provides the following :</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingLeft: '50px' }}>
                          <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Conditioning & Fitness</div>
                          <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Technique & Skills</div>
                          <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Strategy & Tactics</div>
                          <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Sparring & Drills</div>
                          <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Cardiovascular Training</div>
                          <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Vedio Analysis</div>
                          <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Nutrition & Weight Management</div>
                          <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Competition Preparation</div>
                      </div>
                  </div>
              </div>
              <div style={{ alignItems: 'center', fontFamily: '-moz-initial' }}>
                  <div>
                      <h3><u>Conditioning & Fitness</u>:-</h3>
                      <div className='stance' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                          <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>Conditioning plays a crucial role in sparring and competitive training. This course includes exercises and drills to improve strength, speed, agility, endurance, flexibility, and overall fitness. Conditioning training helps athletes develop the physical attributes necessary for optimal performance.</p>
                          <img style={{ width: '250px', height: '250px', border: '5px', borderColor: 'black' }} src={conditioning} alt='stance' />
                      </div>
                  </div>
                  <div>
                      <h3><u>Technique & Skills</u>:-</h3>
                      <div className='footwork' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                          <img style={{ width: '250px', height: '250px' }} src={technic} alt='footwork img' />
                          <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>This course focuses on learning and refining the fundamental techniques and skills specific to your sport or martial art. It includes techniques such as punches, kicks, blocks, throws, takedowns, submissions, and defensive maneuvers.</p>
                      </div>
                  </div>
                  <div>
                      <h3><u>Strategy & Tactics</u>:-</h3>
                      <div className='jab' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                          <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}> Understanding and implementing effective strategies and tactics is vital in competitive sports. This course focuses on developing your ability to analyze opponents, identify their strengths and weaknesses, and formulate winning strategies. It includes learning different tactics, game plans, and adapting to various situations during a match.</p>
                          <img style={{ width: '250px', height: '250px' }} src={strategy} alt='Jab_img' />
                      </div>
                  </div>
                  <div>
                      <h3><u>Sparring & Drills</u>:-</h3>
                      <div className='cross' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                          <img style={{ width: '250px', height: '250px' }} src={sparring} alt='Cross_img' />
                          <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>This course involves actual sparring sessions and drills that simulate competitive scenarios. It allows athletes to apply their techniques, test their skills against opponents, and develop timing, distance management, and reflexes. Sparring and drills help athletes gain practical experience and build confidence in a controlled environment.</p>
                      </div>
                  </div>
                  <div>
                      <h3><u>Cardiovascular Training</u>:-</h3>
                      <div className='hook' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                          <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>Aerobic and anaerobic conditioning are essential for sustained performance in competitive sports. Cardiovascular training includes activities such as running, cycling, swimming, or interval training to improve cardiovascular endurance and stamina.</p>
                          <img style={{ width: '250px', height: '250px' }} src={cardio} alt='Hook_img' />
                      </div>
                  </div>
                  <div>
                      <h3><u>Vedio Analysis</u>:-</h3>
                      <div className='uppercut' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                          <img style={{ width: '250px', height: '250px' }} src={vedio} alt='Uppercut_img' />
                          <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}>Video analysis has become increasingly valuable in competitive training. Athletes and coaches review recorded footage of sparring sessions or competitive matches to identify areas for improvement, analyze techniques, study opponents, and refine strategies.</p>
                      </div>
                  </div>
                  <div>
                      <h3><u>Nutrition & Weight Management</u>:-</h3>
                      <div className='conditioning' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                          <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}> Proper nutrition and weight management play a crucial role in optimizing performance and maintaining physical health. This course focuses on educating athletes about balanced diets, hydration, nutritional supplements, weight cutting (if applicable), and the importance of maintaining a healthy weight for their sport.</p>
                          <img style={{ width: '250px', height: '250px' }} src={nutrition} alt='Conditioning_img' />
                      </div>
                  </div>
                  <div style={{ borderRadius: '25px' }}>
                      <div style={{ paddingBottom: '30px' }}>
                          <h3><u>Competition Preparation</u>:-</h3>
                          <div className='boxingring' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                              <img style={{ width: '250px', height: '250px' }} src={competition} alt='Boxingring_img' />
                              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' }}> As athletes progress towards competitive events, specific courses may be dedicated to competition preparation. This can involve mock competitions, simulated pressure situations, mock weigh-ins, and mental and physical preparation tailored towards the upcoming event.</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div style={{ paddingBottom: '0px' }}>
                  <center style={{ color: 'orange' }}><a href='/'><button className='btn btn-warning' style={{ fontSize: '25px', paddind: '50px', width: '300px', height: '50px', borderRadius: '10px' }}>Register Now</button></a></center>
              </div>
              <div className='sk' style={{ padding: '30px' }}>
              </div>
          </div>
      </div></>
  );
};

export default ProgressBar4;