import React from 'react';
import { BrowserRouter as Router, Routes, Route,useParams } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Components/auth/Login';
import Signup from './Components/auth/Signup';
import AdminAcademyhome from './Components/AdminHome/AdminAcademyHome';
import AdminAcademyAdd from './Components/AdminHome/AdminacademyAdd';
import AdmineditAcademy from './Components/AdminHome/AdmineditAcademy';
import AdminCourse from './Components/Admincourse/adminCourse';
import AddCourse from './Components/Admincourse/AddCourse';
import EditCourse from './Components/Admincourse/EditCourse';
import Adminstudent from './Components/AdminStudent/Adminstudent';
import AddStudent from './Components/AdminStudent/AdminstudentAdd';
import Home3 from './UserHome/Home3';
import Enrolledcourse from './Components/Enrolledcourse/Enrolledcourse';
import EditStudent from './Components/Enrolledcourse/Edit';
import Viewacademy1 from './Components/Viewacademy/Card';
import Rating from './Components/Viewacademy/Rating';
import Cardss from './Components/Viewacademy/Cardss';
import Forms from './Components/Viewacademy/Forms';
import EditStudent1 from './Components/AdminStudent/AdminstudentEdit';
import ProgressBar1 from './Components/CoursePages/CourseComponent1/BasicBoxing';
import ProgressBar2 from './Components/CoursePages/CourseComponent2/IntermediateBoxing';
import ProgressBar3 from './Components/CoursePages/CourseComponent3/StrengthBoxing';
import ProgressBar4 from './Components/CoursePages/CourseComponent4/SparringBoxing';
import ProgressBarrr from './Components/CoursePages/AlternateCoursePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
         <Route
          path="/admin/adminacademy"
          element={<PrivateRoute element={<AdminAcademyhome />} authRole="Admin" allowedRoles={['Admin']} />}
        />
        <Route
          path="/admin/addacademy"
          element={<PrivateRoute element={<AdminAcademyAdd />} authRole="Admin" allowedRoles={['Admin']} />}
        />
        <Route
          path="/admin/editacademy/:id1"
          element={<PrivateRoute element={<AdmineditAcademy />} authRole="Admin" allowedRoles={['Admin']} />}
        />
         <Route
          path="/admin/course"
          element={<PrivateRoute element={<AdminCourse />} authRole="Admin" allowedRoles={['Admin']} />}
        />
        <Route
          path="/admin/addcourse"
          element={<PrivateRoute element={<AddCourse />} authRole="Admin" allowedRoles={['Admin']} />}
        />
        <Route
          path="/admin/editcourse/:id"
          element={<PrivateRoute element={<EditCourse />} authRole="Admin" allowedRoles={['Admin']} />}
        />
        <Route
          path="/admin/students"
          element={<PrivateRoute element={<Adminstudent />} authRole="Admin" allowedRoles={['Admin']} />}
        />
        <Route
          path="/admin/updatestudent/:id"
          element={<PrivateRoute element={<EditStudent1 />} authRole="Admin" allowedRoles={['Admin']} />}
        />
        <Route
          path="/admin/addstudent"
          element={<PrivateRoute element={<AddStudent />} authRole="Admin" allowedRoles={['Admin']} />}
        />
       <Route path="/user/viewacademy"
          element={<PrivateRoute element={<Viewacademy1 />} authRole="User" allowedRoles={['User']} />}
        />
         <Route path="/user/rating/:instituteId"
          element={<PrivateRoute element={<Rating />} authRole="User" allowedRoles={['User']} />}
        />
        <Route path="/user/courses/:instituteId"
          element={<PrivateRoute element={<Cardss/>} authRole="User" allowedRoles={['User']} />}
        />
        <Route path="/user/enrolledcourse"
          element={<PrivateRoute element={<Enrolledcourse />} authRole="User" allowedRoles={['User']} />}
        />
        <Route path="/user/userhome"
          element={<PrivateRoute element={<Home3 />} authRole="User" allowedRoles={['User']} />}
        />
        <Route path="/user/enrolledcourseedit/:id"
          element={<PrivateRoute element={<EditStudent/>} authRole="User" allowedRoles={['User']} />}
        /> 
        <Route path="/user/enrollform/:instituteId/:courseId"
          element={<PrivateRoute element={<Forms/>} authRole="User" allowedRoles={['User']} />}
        />
        <Route path="/user/learn/:course/:Id/:courseId"
          element={<PrivateRoute element={<RenderComponent/>} authRole="User" allowedRoles={['User']} />}
        />   
      </Routes>
    </Router>

    
  );
}
const RenderComponent = ({})=>{
  const { course } = useParams();
  let componentToRender;
  if(course === 'Strength training'){
      componentToRender = <ProgressBar1/>;
  }
  else if(course === 'Cardio Boxing'){
    componentToRender = <ProgressBar2/>;
  }
  else if(course === 'Amateur Boxing'){
    componentToRender = <ProgressBar3/>;
  }else if(course === 'Professional Boxing'){
    componentToRender = <ProgressBar4/>;
  }else{
    componentToRender = <ProgressBarrr/>;
  }
  return(
    <div>
      {componentToRender}
    </div>
  )
}
export default App;
