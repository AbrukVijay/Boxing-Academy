import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import StudentEdit from './Components/AdminStudent/AdminstudentEdit';
import Home3 from './UserHome/Home3';
import Enrolledcourse from './Components/Enrolledcourse/Enrolledcourse';
import Editenrolled from './Components/Enrolledcourse/Edit';
// import Viewacademy from './Components/Viewacademy/Viewacademy';
import Viewacademy1 from './Components/Viewacademy/Card';
import Rating from './Components/Viewacademy/Rating';
import Cardss from './Components/Viewacademy/Cardss';
// import Cardss from './Components/Viewacademy/Cardss';
// import Form from './Components/Viewacademy/Forms';
// import Viewacademy from './Components/User/ViewAcademy';

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
          path="/admin/editacademy/:id"
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
          path="/admin/editstudent"
          element={<PrivateRoute element={<StudentEdit />} authRole="Admin" allowedRoles={['Admin']} />}
        />
        <Route
          path="/admin/addstudent"
          element={<PrivateRoute element={<AddStudent />} authRole="Admin" allowedRoles={['Admin']} />}
        />
        <Route path="/user/viewacademy"
          element={<PrivateRoute element={<Viewacademy1 />} authRole="User" allowedRoles={['User']} />}
        />
        <Route path="/rating/:id"
          element={<PrivateRoute element={<Rating />} authRole="User" allowedRoles={['User']} />}
        />
        <Route path="/user/courses"
          element={<PrivateRoute element={<Cardss/>} authRole="User" allowedRoles={['User']} />}
        />
        <Route path="/user/enrolledcourse"
          element={<PrivateRoute element={<Enrolledcourse />} authRole="User" allowedRoles={['User']} />}
        />
        <Route path="/user/userhome"
          element={<PrivateRoute element={<Home3 />} authRole="User" allowedRoles={['User']} />}
        />
        <Route path="/user/enrolledcourseedit"
          element={<PrivateRoute element={<Editenrolled />} authRole="User" allowedRoles={['User']} />}
        /> 

      </Routes>
    </Router>
  );
}

export default App;
