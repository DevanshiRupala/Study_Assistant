// //studentdetails.js
// import React from 'react';
// import '../CSS/student.css';
// //import TwitterLogo from '../images/twitter-logo.png';
// //import GitHubLogo from '../images/github-logo.png';
// //import FacebookLogo from '../images/facebook-logo.png';
// import Stuprofile from './student_sidebar';


// class StudentDetails extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isEditing: false,
//             studentData: {
//                 fullname:'John Doe',
//                 email: 'johndoe@gmail.com',
//                 birthDate: '2000-01-03',
//                 educationLevel: '12',
//                 schoolName: 'Springfield High School',
//                 address: {
//                     city: 'New York',
//                     state: 'NY',
//                     zipcode: '10001',
//                 },
//                 links: {
//                     twitter: '@johndoe',
//                     facebook: 'facebook.com/johndoe',
//                     github: 'github.com/johndoe',
//                 },
//             },
//         };
//     }

//     handleEdit = () => {
//         this.setState({ isEditing: true });
//     };

//     handleSave = () => {
//         // Implement save logic here
//         this.setState({ isEditing: false });
//     };

//     handleInputChange = (field, value) => {
//         const { studentData } = this.state;
//         const updatedStudentData = { ...studentData };
//         const fieldParts = field.split('.');

//         if (fieldParts.length === 2) {
//             updatedStudentData[fieldParts[0]][fieldParts[1]] = value;
//         } else {
//             updatedStudentData[field] = value;
//         }

//         this.setState({ studentData: updatedStudentData });
//     };

//     render() {
//         const { isEditing, studentData } = this.state;

//         return (
//             <div className='wrapper'> 
//                 <Stuprofile/>
//                 <div className="student-profile-container">
//                     <div className="student-info-container">
//                         <div className="student-info-left-box">
//                             <div className="photo-container">
//                                 <div className="placeholder">Photo</div>
//                             </div>
//                             <div className='fullname'>
//                             {isEditing ? (
//                                     <div className="input-row">
//                                         <label htmlFor="fullname">Full Name:</label>
//                                         <input type="text" value={studentData.fullname} onChange={(e) => this.handleInputChange('fullname', e.target.value)} />
//                                     </div>
//                                 ) : (
//                                     <h2>{studentData.fullname}</h2>
//                                 )}
//                             </div>
//                             <div className='links'>
//                                 {Object.entries(studentData.links).map(([key, value]) => (
//                                     <div key={key}>
//                                         {isEditing ? (
//                                             <div className="input-row">
//                                                 <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
//                                                 <input type="text" value={value} onChange={(e) => this.handleInputChange('links.${key}', e.target.value)} />
//                                             </div>
//                                         ) : (
//                                             <a href={'https://${key}.com/${value}'}>
//                                                 {/* <img src={key === 'twitter' ? TwitterLogo : key === 'facebook' ? FacebookLogo : GitHubLogo} alt={key.charAt(0).toUpperCase() + key.slice(1)} /> */}
//                                                 <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
//                                             </a>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="student-info-right-box">
//                             {!isEditing ? (
//                                 <>
//                                     <p><strong>Email:</strong> {studentData.email}</p>
//                                     <p><strong>Birth Date:</strong> {studentData.birthDate}</p>
//                                     <p><strong>Education Level:</strong> {studentData.educationLevel}</p>
//                                     <p><strong>School Name:</strong> {studentData.schoolName}</p>
//                                     <p><strong>City:</strong> {studentData.address.city}</p>
//                                     <p><strong>State:</strong> {studentData.address.state}</p>
//                                     <p><strong>Zipcode:</strong> {studentData.address.zipcode}</p>
//                                 </>
//                             ) : (
//                                 <>
//                                     <div className="input-row">
//                                         <label htmlFor="email">Email:</label>
//                                         <input type="email" value={studentData.email} onChange={(e) => this.handleInputChange('email', e.target.value)} />
//                                     </div>
//                                     <div className="input-row">
//                                         <label htmlFor="birthDate">Birth Date:</label>
//                                         <input type="date" value={studentData.birthDate} onChange={(e) => this.handleInputChange('birthDate', e.target.value)} />
//                                     </div>
//                                     <div className="input-row">
//                                         <label htmlFor="educationLevel">Education Level:</label>
//                                         <input type="text" value={studentData.educationLevel} onChange={(e) => this.handleInputChange('educationLevel', e.target.value)} />
//                                     </div>
//                                     <div className="input-row">
//                                         <label htmlFor="schoolName">School Name:</label>
//                                         <input type="text" value={studentData.schoolName} onChange={(e) => this.handleInputChange('schoolName', e.target.value)} />
//                                     </div>
//                                     <div className="input-row">
//                                         <label htmlFor="city">City:</label>
//                                         <input type="text" value={studentData.address.city} onChange={(e) => this.handleInputChange('address.city', e.target.value)} />
//                                     </div>
//                                     <div className="input-row">
//                                         <label htmlFor="state">State:</label>
//                                         <input type="text" value={studentData.address.state} onChange={(e) => this.handleInputChange('address.state', e.target.value)} />
//                                     </div>
//                                     <div className="input-row">
//                                         <label htmlFor="zipcode">Zipcode:</label>
//                                         <input type="text" value={studentData.address.zipcode} onChange={(e) => this.handleInputChange('address.zipcode', e.target.value)} />
//                                     </div>
//                                 </>
//                             )}
//                             {!isEditing ? (
//                                 <button onClick={this.handleEdit}>Edit Profile</button>
//                             ) : (
//                                 <button onClick={this.handleSave}>Save</button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//            </div>
//         );
//     }
// }

// export default StudentDetails;


//studentdetails.js
import React from 'react';
import '../CSS/student.css';
// import TwitterLogo from '../images/twitter-logo.png';
// import GitHubLogo from '../images/github-logo.png';
// import FacebookLogo from '../images/facebook-logo.png';
import Stuprofile from './student_sidebar';

class StudentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            studentData: {
                fullname:'John Doe',
                email: 'johndoe@gmail.com',
                birthDate: '2000-01-03',
                educationLevel: '12',
                schoolName: 'Springfield High School',
                address: {
                    city: 'New York',
                    state: 'NY',
                    zipcode: '10001',
                },
                links: {
                    twitter: '@johndoe',
                    facebook: 'facebook.com/johndoe',
                    github: 'github.com/johndoe',
                },
            },
        };
    }

    handleEdit = () => {
        this.setState({ isEditing: true });
    };

    handleSave = () => {
        // Implement save logic here
        this.setState({ isEditing: false });
    };

    handleInputChange = (field, value) => {
        const { studentData } = this.state;
        const updatedStudentData = { ...studentData };
        const fieldParts = field.split('.');

        if (fieldParts.length === 2) {
            updatedStudentData[fieldParts[0]][fieldParts[1]] = value;
        } else {
            updatedStudentData[field] = value;
        }

        this.setState({ studentData: updatedStudentData });
    };

    render() {
        const { isEditing, studentData } = this.state;

        return (
            <div className='wrapper'> 
                <Stuprofile/>
                <div className="student-profile-container">
                    <div className="student-info-container">
                        <div className="student-info left-box">
                            <div className="photo-container">
                                <div className="placeholder">Photo</div>
                            </div>
                            <div className='fullname'>
                            {isEditing ? (
                                    <div className="fullname-row">
                                        <label htmlFor="fullname">Full Name:</label>
                                        <input type="text" value={studentData.fullname} onChange={(e) => this.handleInputChange('fullname', e.target.value)} />
                                    </div>
                                ) : (
                                    <h2>{studentData.fullname}</h2>
                                )}
                            </div>
                            {/* <div className='links'>
                                {Object.entries(studentData.links).map(([key, value]) => (
                                    <div key={key}>
                                        {isEditing ? (
                                            <div className="input-row">
                                                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                                <input type="text" value={value} onChange={(e) => this.handleInputChange(`links.${key}, e.target.value`)} />
                                            </div>
                                        ) : (
                                            <a href={`https://${key}.com/${value}`}>
                                                {/* <img src={key === 'twitter' ? TwitterLogo : key === 'facebook' ? FacebookLogo : GitHubLogo} alt={key.charAt(0).toUpperCase() + key.slice(1)} /> 
                                                <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div> */}
                        </div>
                        <div className="student-info right-box">
                            {!isEditing ? (
                                <>
                                    <p><strong>Email:</strong> {studentData.email}</p>
                                    <p><strong>Birth Date:</strong> {studentData.birthDate}</p>
                                    <p><strong>Education Level:</strong> {studentData.educationLevel}</p>
                                    <p><strong>School Name:</strong> {studentData.schoolName}</p>
                                    <p><strong>City:</strong> {studentData.address.city}</p>
                                    <p><strong>State:</strong> {studentData.address.state}</p>
                                    <p><strong>Zipcode:</strong> {studentData.address.zipcode}</p>
                                </>
                            ) : (
                                <>
                                    <div className="input-row">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" value={studentData.email} onChange={(e) => this.handleInputChange('email', e.target.value)} />
                                    </div>
                                    <div className="input-row">
                                        <label htmlFor="birthDate">Birth Date:</label>
                                        <input type="date" value={studentData.birthDate} onChange={(e) => this.handleInputChange('birthDate', e.target.value)} />
                                    </div>
                                    <div className="input-row">
                                        <label htmlFor="educationLevel">Education Level:</label>
                                        <input type="text" value={studentData.educationLevel} onChange={(e) => this.handleInputChange('educationLevel', e.target.value)} />
                                    </div>
                                    <div className="input-row">
                                        <label htmlFor="schoolName">School Name:</label>
                                        <input type="text" value={studentData.schoolName} onChange={(e) => this.handleInputChange('schoolName', e.target.value)} />
                                    </div>
                                    <div className="input-row">
                                        <label htmlFor="city">City:</label>
                                        <input type="text" value={studentData.address.city} onChange={(e) => this.handleInputChange('address.city', e.target.value)} />
                                    </div>
                                    <div className="input-row">
                                        <label htmlFor="state">State:</label>
                                        <input type="text" value={studentData.address.state} onChange={(e) => this.handleInputChange('address.state', e.target.value)} />
                                    </div>
                                    <div className="input-row">
                                        <label htmlFor="zipcode">Zipcode:</label>
                                        <input type="text" value={studentData.address.zipcode} onChange={(e) => this.handleInputChange('address.zipcode', e.target.value)} />
                                    </div>
                                </>
                            )}
                            {!isEditing ? (
                                <button onClick={this.handleEdit}>Edit Profile</button>
                            ) : (
                                <button onClick={this.handleSave}>Save</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentDetails;