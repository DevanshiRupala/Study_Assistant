import { Routes,Route, BrowserRouter as Router } from 'react-router-dom'; 
import Index from './components/index';
import Register from './components/register'
import StuDashboard from './components/studashboard';
import Tutor from './components/tutor_profile';
import Login from './components/login';
import TutorDashboard from './components/tutor_dashboard';
import TutorSearched from './components/tutor_search';
import StudentProfile from './components/student_profile';
import Add_Material from './components/add_material';
import Show from './components/show';

function App() {
  
  return (
    <>
    <Router>
     <Routes>
      <Route path="/" element={<Index/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/studashboard" element={<StuDashboard/>}/>
      <Route path="/tutor_profile" element={<Tutor/>}/>
      <Route path='/tutor_dashboard' element={<TutorDashboard/>}/>
      <Route path='/tutor' element={<TutorSearched/>}/>
      <Route path='/student_profile' element={<StudentProfile/>}/>
      <Route path='/add_material' element={<Add_Material/>}/>
      <Route path='/show' element={<Show/>}/>
     </Routes>
    </Router>
    </>
  );
}

export default App;
