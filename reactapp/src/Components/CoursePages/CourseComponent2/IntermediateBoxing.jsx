import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from './Course2deco.jpg';
import Image from './boxinglogo2.png';
import counter from './Counter.jpg';
import footwork from './footwork.jpg';
import advPunch  from './AdvancedPunch.jpg';
import sparring from './sparring.jpg';
import conditioning from './conditioning.jpg';
import awaRing from './AwarenessRing.jpg';
import defense from './Defense.jpg';
import MentalPrep from './MentalPreparation.jpg';
import './CoursePage2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import UserHome from '../../../Navbars/UserNav';
import { useParams } from 'react-router-dom';

const ProgressBar2 = () => {
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
    <div>
        <div style={{position:'fixed',height:'50px',width:'100%'}}>
            <UserHome/>
        </div><br/>
    <div  style={{position:'fixed',height:'40px',marginTop:'45.5px',width:'100%'}}>

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
    <div style={{flex:'1',overflowY:'auto',paddingTop:'115px'}}>
            <div className='Sk2' >
            <div className='titleMain' style={{marginLeft:'2%'}}><img width={130} height={80} src={Image} alt='Logo'/></div>
            <div className='Sty2' >Intermediate & Advanced Boxing</div>
            </div>
            <div className='rrr' style={{width:'100',height:'100'}}>
                    <img src={image} alt='imgage' style={{width:'100%',height:'100vh'}}/>
            </div>
            <div className='decorate'>
                <div></div>
            </div>
            <div className='Description'>
                <h2>About the Course</h2>
                <p style={{textAlign:'center',fontSize:'25px'}}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This course is designed for Intermediate and advanced members and focuses on teaching the  
                    techniques and principles of boxing.</strong> 
                </p>
                <div className='Description1'>
                <div>The course provides the following :</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr', paddingLeft:'50px'}}>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Counterpunching</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Advanced Punching Combinations</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Defense</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Sparring</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Conditioning</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Footwork</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Mental Preparation</div>
                {/* <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Combinations</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Conditioning</div> */}
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Strategy & Ring Awareness</div>
                </div>
                </div>
            </div>
            <div style={{alignItems:'center',fontFamily:'-moz-initial'}}>
                <div >
                    <h3><u>Counterpunching</u>:-</h3>
                    <div className='stance'style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>Counterpunching is an advanced skill that involves effectively countering your opponent's attacks. Practice recognizing your opponent's patterns and timing, and work on executing counterpunches with accuracy and speed. This skill can give you a significant advantage in the ring.</p>
                    <img style={{width:'250px',height:'250px' ,border:'5px',borderColor:'black'}} src={counter} alt='stance'/>
                    </div>
                </div>
                <div>
                    <h3><u>Advanced Punching Combinations</u>:-</h3>
                    <div className='footwork' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                    <img style={{width:'250px',height:'250px'}} src={advPunch} alt='footwork img'/>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>Expand your repertoire of punching combinations beyond the basic punches (jab, cross, hook, and uppercut). Learn and practice advanced combinations that involve multiple punches, angles, and feints. This will help you confuse your opponent, create openings, and increase your offensive effectiveness.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Defense</u>:-</h3>
                    <div className='jab' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>Developing strong defensive skills is crucial as you advance in boxing. Work on your head movement, slipping punches, blocking, and parrying to minimize the impact of your opponent's strikes. Incorporate defensive drills into your training sessions to improve your reflexes and defensive instincts.</p>
                    <img  style={{width:'250px',height:'250px'}}  src={defense} alt='Jab_img'/>
                    </div>
                </div>
                <div> 
                    <h3><u>Sparring</u>:-</h3>
                    <div className='cross' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img  style={{width:'250px',height:'300px'}}  src={sparring} alt='Cross_img'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>Regular sparring sessions are essential for intermediate and advanced boxers. Sparring allows you to apply your skills in a realistic and dynamic environment while gaining valuable experience. Focus on implementing the techniques you've learned, improving your timing, and developing your overall ring awareness. Incorporate high-intensity interval training (HIIT), cardio exercises, and strength training into your routine to improve your endurance, power, and overall physical fitness.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Conditioning</u>:-</h3>
                    <div className='hook' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>As you progress in boxing, your conditioning becomes increasingly important. Incorporate high-intensity interval training (HIIT), cardio exercises, and strength training into your routine to improve your endurance, power, and overall physical fitness.</p>
                    <img  style={{width:'250px',height:'250px'}} src={conditioning} alt='Hook_img'/>
                    </div>
                </div>
                <div>
                    <h3><u>Footwork</u>:-</h3>
                    <div className='uppercut' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img  style={{width:'250px',height:'250px'}} src={footwork} alt='footwork_img'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>Footwork is essential in boxing as it allows you to maintain balance, move efficiently, and generate power. Practice various footwork drills, such as shadowboxing, ladder drills, and pivoting exercises, to improve your agility and speed in the ring.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Mental Preparation</u>:-</h3>
                    <div className='defense' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>Boxing is a mentally demanding sport, and as you reach advanced levels, mental preparation becomes crucial. Practice mental exercises such as visualization, focus drills, and meditation to improve your concentration, resilience, and ability to stay calm under pressure.</p>
                    <img  style={{width:'250px',height:'250px'}}  src={MentalPrep} alt='Defense_img'/>
                    </div>
                </div>
               
                <div style={{borderRadius:'25px'}}>
                <div style={{paddingBottom:'30px'}}>
                    <h3><u>Strategy & Ring Awareness</u>:-</h3>
                    <div className='boxingring' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img style={{width:'250px',height:'250px'}} src={awaRing} alt='Boxingring_img'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}> Boxing is not just about physical ability; it also requires strategic thinking. Study and analyze different boxing styles, learn how to read your opponent's movements and tendencies, and develop effective strategies to exploit their weaknesses. Developing ring awareness will enable you to control the pace and flow of the fight.</p>
                    </div>
                </div>
                </div>
            </div>
            <div style={{paddingBottom:'0px'}}>
                <center ><a href='/page3'><button className='btn btn-warning' style={{fontSize:'25px', paddind:'50px',width:'300px',height:'50px',borderRadius:'10px'}} >Register Now</button></a></center>
            </div>
            <div className='sk' style={{padding:'30px'}}>
            </div>
        </div>
    </div>
  );
};

export default ProgressBar2;