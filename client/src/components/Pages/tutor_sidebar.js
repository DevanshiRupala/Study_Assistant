// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../CSS/tutor_sidebar.css';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PersonIcon from '@mui/icons-material/Person';
// import ScheduleIcon from '@mui/icons-material/Schedule';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// function Sidebar ({tutor}) {
//     console.log(tutor);
//         return (
//             <div className="ss_dashboard">
//                     <div className="s_sidebar">
//                         <ul>
//                             <li><DashboardIcon className='s_dashboard' /><Link to={{  pathname : "/tutor_dashboard", state: { tutor } }}>Dashboard</Link></li><br></br> 
//                             <li><PersonIcon className='s_person' /><Link to={{  pathname : "/tutor", state: { tutor } }}>Profile</Link></li>
//                             <li><ScheduleIcon className='s_session'/><Link href="/session">Add Session</Link></li>
//                             <li><BarChartIcon className='s_chart'/><Link href="#">Analytics</Link></li>
//                             <li><ExitToAppIcon className='s_logout'/><Link href="/">Logout</Link></li>
//                         </ul>
//                     </div>
//             </div>
//         );
//     }

// export default Sidebar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/tutor_sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Sidebar ({tutor}) {
    const navigate = useNavigate();

    console.log(tutor);
        return (
            <div className="ss_dashboard">
                    <div className="s_sidebar">
                        <ul>
                            <li><DashboardIcon className='s_dashboard' /><Link to='/tutor_dashboard' state={tutor}>Dashboard</Link></li><br></br> 
                            <li><PersonIcon className='s_person' /><Link to='/tutor' state= {tutor}>Profile</Link></li>
                            <li><ScheduleIcon className='s_session'/><Link to="/session" state={tutor}>Add Session</Link></li>
                            <li><BarChartIcon className='s_chart'/><Link to="#">Analytics</Link></li>
                            <li><ExitToAppIcon className='s_logout'/><Link to="/">Logout</Link></li>
                        </ul>
                    </div>
            </div>
        );
    }

export default Sidebar;