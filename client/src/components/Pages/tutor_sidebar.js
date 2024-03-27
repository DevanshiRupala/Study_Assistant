
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/tutor_sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BookIcon from '@mui/icons-material/Book';

function Sidebar ({tutor}) {
    console.log(tutor);
        return (
            <div className="ss_dashboard">
                    <div className="s_sidebar">
                        <ul>
                            {tutor && <li><DashboardIcon className='s_dashboard' /><Link to={`/tutor_dashboard?state=${tutor.tutor_id}`}>Dashboard</Link></li> }<br></br> 
                            <li><PersonIcon className='s_person' /><Link to='/tutor' state= {tutor}>Profile</Link></li>
                            <li><ScheduleIcon className='s_session'/><Link to="/session" state={tutor}>Add Session</Link></li>
                            <li><BookIcon className='s_chart'/><Link to="/add_material" state={tutor}>Materials</Link></li>
                            <li><ExitToAppIcon className='s_logout'/><Link to="/">Logout</Link></li>
                        </ul>
                    </div>
            </div>
        );
    }

export default Sidebar;