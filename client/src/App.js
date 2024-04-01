import { Routes,Route, BrowserRouter as Router } from 'react-router-dom'; 
import Index from './components/Pages/index';
import Register from './components/Pages/register';
import StuDashboard from './components/Pages/studashboard';
import TutorProfile from './components/Pages/tutor_profile';
import Login from './components/Pages/login';
import TutorDashboard from './components/Pages/tutor_dashboard';
import StudentProfile from './components/Pages/student_profile';
import Show from './components/Pages/show';
import Session from './components/Pages/session';
import Student from './components/Pages/student';
import Tutor from './components/Pages/tutor';
import TutorS from './components/Pages/tutorsearched';
import ViewSession from './components/Pages/viewsession';
import ContactUs from './components/Pages/contact'
import KnowMore from './components/Pages/KnowMore';
import BookedStudent from './components/Pages/bookedstudent';
import StudentSession from './components/Pages/studentsession';
import ViewStudent from './components/Pages/viewstudent';

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
      <Route path='/show' element={<Show/>}/>
      <Route path='/session' element={<Session/>}/>
      <Route path='/student' element={<Student/>}/>
      <Route path='/tutorsearched' element={<TutorS/>}/>
      <Route path='/viewsession' element={<ViewSession/>}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/knowmore' element={<KnowMore/>}/>
      <Route path='/bookedstudent' element={<BookedStudent/>}/>
      <Route path='/studentsession' element={<StudentSession/>}/>
      <Route path='/viewstudent' element={<ViewStudent/>}/>
     </Routes>
    </Router>
    </>
  );
}

export default App;
