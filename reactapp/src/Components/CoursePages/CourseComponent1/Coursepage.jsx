import React from 'react';
import sss from './boxinglogo.png';
import stance from './stance.jpg';
import footwork from './footwork.jpg';
import jab from './Jab.jpg';
import cross from './cross.jpg';
import hook from './hook.jpg';
import uppercut from './uppercut.jpg';
import defense from './defense.jpg';
import combinations from './combinations.jpg';
import conditioning from './conditioning.jpg';
import boxingring from './boxingring.jpg';
// import './Coursepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function   BasicBoxing(){
    return(
        <div>
            <div className='Sk1' /*style={{display:'grid',gridTemplateColumns:'.5fr 1fr .5fr'}}*/>
            <div className='titleMain' style={{marginLeft:'2%'}}><img width={130} height={80} src={sss} alt='Logo'/></div>
            <div className='Sty'>Basic Boxing Fundamentals</div>
            {/* <div className='titleMain' ><img style={{marginRight:'0'}} width={200} height={50} src='{Image}' alt='Logo'/></div> */}
            </div>
            <div className='rrr' style={{width:'100',height:'100'}}>
                <div className='BoxingQuote'>
                    
                        <span>"Every champion starts</span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content" >&nbsp;&nbsp;their story as a</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;beginner,</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;laying the foundation for</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;their eventual trimph."</span></span>
                </div>
            </div>
            <div className='decorate'>
                <div></div>
            </div>
            <div className='Description'>
                <h2>About the Course</h2>
                <p style={{textAlign:'center',fontSize:'25px'}}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This course is designed for beginners and focuses on teaching the fundamental 
                    techniques and principles of boxing.</strong> 
                </p>
                <div className='Description1'>
                <div>The course provides the following :</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr', paddingLeft:'50px'}}>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Stance</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Footwork</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Jab</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Cross</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Hook</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Uppercut</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Defense</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Combinations</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Conditioning</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Ring Awareness</div>
                </div>
                </div>
            </div>
            <div style={{alignItems:'center',fontFamily:'-moz-initial'}}>
                <div >
                    <h3><u>Stance</u>:-</h3>
                    <div className='stance'style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>The boxing stance is a crucial aspect of the sport. A proper stance provides balance, stability, and allows for quick movement. In a basic stance, the lead foot (left foot for orthodox stance, right foot for southpaw stance) is slightly forward, with the feet shoulder-width apart. The knees are slightly bent, and the boxer's weight is distributed evenly between both legs.</p>
                    <img style={{width:'250px',height:'250px' ,border:'5px',borderColor:'black'}} src={stance} alt='stance'/>
                    </div>
                </div>
                <div>
                    <h3><u>Footwork</u>:-</h3>
                    <div className='footwork' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                    <img style={{width:'250px',height:'250px'}} src={footwork} alt='footwork img'/>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>Effective footwork is essential for maintaining balance, creating angles, and evading punches. Boxers should move on the balls of their feet, enabling quick pivots and smooth movement around the ring. Footwork involves stepping forward, backward, sidestepping, and shifting weight between the lead and rear foot.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Jab</u>:-</h3>
                    <div className='jab' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>The jab is the most basic and frequently used punch in boxing. It is a quick, straight punch thrown with the lead hand (left hand for orthodox stance, right hand for southpaw stance). The jab is primarily used for maintaining distance, setting up combinations, and probing the opponent's defense.</p>
                    <img  style={{width:'250px',height:'250px'}}  src={jab} alt='Jab_img'/>
                    </div>
                </div>
                <div> 
                    <h3><u>Cross (Straight Right/Left)</u>:-</h3>
                    <div className='cross' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img  style={{width:'250px',height:'250px'}}  src={cross} alt='Cross_img'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>The cross is a powerful punch thrown with the rear hand (right hand for orthodox stance, left hand for southpaw stance). It is a straight punch that generates power from the rotation of the hips and shoulders. The cross is usually thrown after a jab or as a counterpunch.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Hook</u>:-</h3>
                    <div className='hook' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>The hook is a wide, looping punch thrown with a bent arm. There are two types of hooks: lead hook (thrown with the lead hand) and rear hook (thrown with the rear hand). Hooks are effective for targeting the opponent's head or body from the side.</p>
                    <img  style={{width:'250px',height:'250px'}} src={hook} alt='Hook_img'/>
                    </div>
                </div>
                <div>
                    <h3><u>Uppercut</u>:-</h3>
                    <div className='uppercut' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img  style={{width:'250px',height:'250px'}} src={uppercut} alt='Uppercut_img'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>The uppercut is an upward punch thrown from a bent arm position. It is delivered from close range and targets the opponent's chin or body. There are lead uppercuts and rear uppercuts, and they are effective for generating power from the legs and core.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Defense</u>:-</h3>
                    <div className='defense' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}>Boxing also emphasizes effective defensive techniques. These include slipping (moving the head to evade punches), bobbing and weaving (moving the upper body to dodge punches), blocking (using the arms to absorb or deflect blows), and parrying (redirecting punches with the hands).</p>
                    <img  style={{width:'250px',height:'250px'}}  src={defense} alt='Defense_img'/>
                    </div>
                </div>
                <div>
                    <h3><u>Combinations</u>:-</h3>
                    <div className='combinations' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                    <img  style={{width:'250px',height:'250px'}} src={combinations} alt='Combinations_jpg'/>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}> Boxing relies on the strategic use of combinations, which involve chaining together different punches. Combinations can include jabs, crosses, hooks, and uppercuts in various sequences. They are used to create openings in the opponent's defense and maximize scoring opportunities.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Conditioning</u>:-</h3>
                    <div className='conditioning' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}> Boxing requires excellent physical conditioning. Boxers train to develop stamina, strength, speed, and agility through various exercises such as running, skipping rope, shadowboxing, heavy bag work, pad work, and sparring.</p>
                    <img  style={{width:'250px',height:'250px'}}  src={conditioning} alt='Conditioning_img'/>
                    </div>
                </div>
                <div style={{borderRadius:'25px'}}>
                <div style={{paddingBottom:'30px'}}>
                    <h3><u>Ring Awareness</u>:-</h3>
                    <div className='boxingring' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img style={{width:'250px',height:'250px'}} src={boxingring} alt='Boxingring_img'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px'}}> Boxers need to develop a keen sense of ring awareness, which includes understanding distance, controlling the pace of the fight, and being mindful of positioning. It involves utilizing footwork, angles, and timing to outmaneuver opponents and capitalize on opportunities.</p>
                    </div>
                </div>
                </div>
            </div>
            <div style={{paddingBottom:'0px'}}>
                <center><a href='/page2'><button className='btn btn-warning' style={{fontSize:'25px', paddind:'50px',width:'300px',height:'50px',borderRadius:'10px'}} >Register Now</button></a></center>
            </div>
            <div className='sk' style={{padding:'30px'}}>
            </div>
        </div>
    )
}

export default BasicBoxing;