import React,{useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/viewstudent.css';

const Showstudentdetails = () => {
    const location = useLocation();
    console.log(location.state.student)
    const student = location.state.student;
    
    // useEffect(() => {
    //     console.log(location.state.student)
    //     setStudent(location.state.student);
    // },[])

    return (
        <div className="background-container">
            <div className="viewstudent-profile">
                <div className="viewcontainer" style={{display:'flex'}}>
                    <div className="row">
                        <div className="viewstudent1">
                            <div className="card-shadow">
                                <div className="card-header">
                                    <img className="profile_img" src={student.profile_picture} alt="student dp" />
                                    <h3>{student.fullName}</h3>
                                </div>
                                <div className="card-body">
                                    <p><strong>Email:</strong>&nbsp;{student.email}</p>
                                    <p><strong>Birthdate:</strong>&nbsp;{new Date(student.birthday).getDate()+'-'+new Date(student.birthday).getMonth()+'-'+new Date(student.birthday).getFullYear()}</p>
                                    <p><strong>School:</strong>&nbsp;{student.school}</p>
                                    <p><strong>Grade:</strong>&nbsp;{student.grade}</p>
                                </div>
                            </div>
                        </div>

                        <div className="viewstudent2">
                            <div className="card-shadow">
                                <div className="card-header">
                                    <h3 className="text-center">General Information</h3>
                                </div>
                                <div className="card-body pt-0">
                                    <table className="s-table">
                                        <tbody>
                                            <tr>
                                                <th>city</th>
                                                <td>{student.city}</td>
                                            </tr>
                                            <tr>
                                                <th>State</th>
                                                <td>{student.state}</td>
                                            </tr>
                                            <tr>
                                                <th>Zipcode</th>
                                                <td>{student.zipCode}</td>
                                            </tr>
                                            <tr>
                                                <th>FacebookProfile</th>
                                                <td><a href={student.facebookProfile}>{student.facebookProfile}</a></td>
                                            </tr>
                                            <tr>
                                                <th>InstagramProfile</th>
                                                <td><a href={student.instagramProfile}>{student.instagramProfile}</a></td>
                                            </tr>
                                            <tr>
                                                <th>TwitterProfile</th>
                                                <td><a href={student.twitterProfile}>{student.twitterProfile}</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Showstudentdetails;