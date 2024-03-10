import React from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/tutordashboard.css';
import Sidebar from './tutor_sidebar';
import { FaRupeeSign } from 'react-icons/fa';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import ScheduleIcon from '@mui/icons-material/Schedule';


function TutorDashboard () {
    const location = useLocation();
    const { tutor } = location.state;
    console.log(tutor)
        return (
            <div>
                <div className="dashboard">
                    {/* Left Sidebar */}
                    <Sidebar tutor = {tutor}/>
                    
                    {/* Main Content */}
                    <div className="main-content">
                    <div className='box'>
                     <ScheduleIcon className='icon' style={{ fontSize: 30,color:'white' }} />
                            <label className='lab'>29</label>
                            <h2>Current Session</h2>
                            {/* Content for current session goes here */}
                        </div>
                        <div className="box">
                    <FaRupeeSign className='icon' style={{ fontSize: 30,color:'white' }} />
                        <label className='lab'>29</label>
                        <h2>Earnings</h2>
                            {/* Content for earnings goes here */}
                        </div>
                        <div className="box">
                        <GroupIcon className='icon' style={{ fontSize: 30,color:'white' }}/>
                            <label className='lab'>29</label>
                            <h2>Total Students</h2>
                            {/* Content for total students goes here */}
                        </div>
                        <div className="box">
                        <StarIcon className='icon' style={{ fontSize: 30,color:'white' }}/>
                            <label className='lab'>29</label>
                            <h2>Reviews</h2>
                            {/* Content for reviews goes here */}
                        </div>
                    </div>
                    
                    {/* Big Box below four smaller boxes */}
                    <div className="big-box1">
                        <label className='upcoming'><b>Upcoming Session :</b> </label><br></br><br></br>
                     <table className='border'>
                        <tr>
                            <td className='left'><b>Upcoming Session</b></td>
                            <td className='topic'><b>Topic</b></td>
                            <td className='right'><b>Timing</b></td>
                        </tr>
                        <tr>
                            <td className='left'>Upcoming Session</td>
                            <td className='topic'>Topic</td>
                            <td className='right'>Timing</td>
                        </tr>
                        <tr>
                            <td className='left'>Upcoming Session</td>
                            <td className='topic'>Topic</td>
                            <td className='right'>Timing</td>
                        </tr>
                        <tr>
                            <td className='left'>Upcoming Session</td>
                            <td className='topic'>Topic</td>
                            <td className='right'>Timing</td>
                        </tr>
                        <tr>
                            <td className='left'>Upcoming Session</td>
                            <td className='topic'>Topic</td>
                            <td className='right'>Timing</td>
                        </tr>
                        <tr>
                            <td className='left'>Upcoming Session</td>
                            <td className='topic'>Topic</td>
                            <td className='right'>Timing</td>
                        </tr>
                        <tr>
                            <td className='left'>Upcoming Session</td>
                            <td className='topic'>Topic</td>
                            <td className='right'>Timing</td>
                        </tr>
                        <tr>
                            <td className='left'>Upcoming Session</td>
                            <td className='topic'>Topic</td>
                            <td className='right'>Timing</td>
                        </tr>
                        <tr>
                            <td className='left'>Upcoming Session</td>
                            <td className='topic'>Topic</td>
                            <td className='right'>Timing</td>
                        </tr>
                        <tr>
                            <td className='left'>Upcoming Session</td>
                            <td className='topic'>Topic</td>
                            <td className='right'>Timing</td>
                        </tr>
                    </table>
                    </div>   
                </div>
            </div>
        );
}

export default TutorDashboard;
