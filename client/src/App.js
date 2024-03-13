import { Routes,Route, BrowserRouter as Router } from 'react-router-dom'; 
import Index from './components/Pages/index';
import Register from './components/Pages/register'
import StuDashboard from './components/Pages/studashboard';
import TutorProfile from './components/Pages/tutor_profile';
import Login from './components/Pages/login';
import TutorDashboard from './components/Pages/tutor_dashboard';
import StudentProfile from './components/Pages/student_profile';
import Add_Material from './components/Pages/add_material';
import Show from './components/Pages/show';
import Session from './components/Pages/session';
import Student from './components/Pages/student';
import Tutor from './components/Pages/tutor';
import TutorS from './components/Pages/tutorsearched';
import ViewSession from './components/Pages/viewsession';

function App() {
  
  return (
    <>
    <Router>
     <Routes>
      <Route path="/" element={<Index/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/studashboard" element={<StuDashboard/>}/>
      <Route path="/tutor_profile" element={<TutorProfile/>}/>
      <Route path='/tutor_dashboard' element={<TutorDashboard/>}/>
      <Route path='/tutor' element={<Tutor/>}/>
      <Route path='/student_profile' element={<StudentProfile/>}/>
      <Route path='/add_material' element={<Add_Material/>}/>
      <Route path='/show' element={<Show/>}/>
      <Route path='/session' element={<Session/>}/>
      <Route path='/student' element={<Student/>}/>
      <Route path='/tutorsearched' element={<TutorS/>}/>
      <Route path='/viewsession' element={<ViewSession/>}/>
     </Routes>
    </Router>
    </>
  );
}

export default App;
