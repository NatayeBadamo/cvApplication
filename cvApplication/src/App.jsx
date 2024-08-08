import React from 'react';
import './App.css';
import { usePersonalDetails, profile, useEducation, useExperience } from './components';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [person, updatePersonDetails] = usePersonalDetails();
  const  [isAdding, toggleAdd, personProfile, updateProfile, deleteProfile] = profile();
  const [educationList, isAddingE, toggleAddE, handleEdit, handleDelete, handleSubmit, currentEducation, handleChange] = useEducation();
  const [experienceList, isAddingEx, toggleAddEx, handleEditEx, handleDeleteEx, handleSubmitEx, currentExperience, handleChangeEx] = useExperience();

  const downloadPDF = () => {
    const cvContent = document.querySelector('.cv');

    html2canvas(cvContent, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('CV.pdf');
    });
  };

  return (
    <>
      <header>Generate Your CV</header>
      <div className="main_grid">
        <div className="grid_one">
          <div className="clear_load">
            <button className="clear_data">Clear Data</button>
            <button className="load_template">Load Template</button>
          </div>

          <div className="personal_details">
            <div className="container_form">
              <form onSubmit={updatePersonDetails}>
                <h1>Personal Details</h1>
                <div className="form">
                  <div className="first_name">
                    <div className="first">
                      <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="name">
                      <input type="text" name="first_name" defaultValue={person.first_name} />
                    </div>
                  </div>

                  <div className="last_name">
                    <div className="last">
                      <label htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="name">
                      <input type="text" name="last_name" defaultValue={person.last_name} />
                    </div>
                  </div>

                  <div className="email">
                    <div className="email">
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="name">
                      <input type="text" name="email" defaultValue={person.email} />
                    </div>
                  </div>

                  <div className="phone_number">
                    <div className="phone">
                      <label htmlFor="phone_number">Phone Number</label>
                    </div>
                    <div className="number">
                      <input type="text" name="phone_number" defaultValue={person.phone_number} />
                    </div>
                  </div>

                  <div className="location">
                    <div className="location2">
                      <label htmlFor="location">Location</label>
                    </div>
                    <div className="name">
                      <input type="text" name="location" defaultValue={person.location} />
                    </div>
                  </div>
                </div>
                <br />
                <button className="submit" type="submit">Submit</button>
              </form>
            </div>
          </div>

          <div className="profile">
            <h1>Profile</h1>
            <div className="button_profile">
              <button className="add_profile" onClick={toggleAdd}>
                {isAdding ? 'Cancel' : 'Add profile'}
              </button><br /><br />
              {personProfile.profile_statement && !isAdding && (
                <button className="delete_profile" onClick={deleteProfile}>
                  <i className="material-icons">delete</i>
                </button>
              )}
            </div>

            {isAdding ? (
              <div className="container_form">
                <form onSubmit={updateProfile}>
                  <div className="form">
                    <textarea name="profile_statement" defaultValue={personProfile.profile_statement} maxLength={400}></textarea>
                    <button className="addProfile" type="submit">
                      Save Profile
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              null
            )}
          </div>

          <div className="education">
            <h1>Education</h1>
            {educationList.map((edu) => (
              <div key={edu.id} className="grid_sub">
                <div className="subE"><p>{edu.institution} </p></div>
                <div className='subButton'>
                  <div className="subButton_one">
                    <button onClick={() => handleEdit(edu.id)}><i className="material-icons">edit</i></button>                 
                  </div>
                  <div className="subButton_two">
                    <button onClick={() => handleDelete(edu.id)}><i className="material-icons">delete</i></button>                  
                  </div>
                </div>
              </div>
            ))}
            <button className="add_education" onClick={toggleAddE}>
                {isAddingE ? 'Cancel' : 'Add Education'}
            </button>

            {isAddingE ? (
              <div className="education_form">
                <form onSubmit={handleSubmit}>
                  <div className="formE">
                    <div className="gridInstitution">
                      <label htmlFor="institution">Institution</label>
                      <input type="text" name='institution' value={currentEducation.institution} onChange={handleChange} />
                    </div>
                    <div className="gridDegree">
                      <label htmlFor="degree">Degree or Qualification</label>
                      <input type="text" name='Degree' value={currentEducation.Degree} onChange={handleChange} />
                    </div>
                    <div className="gridStart">
                      <label htmlFor="startdate">Start Date</label>
                      <input type="date" name='Start_Date' value={currentEducation.Start_Date} onChange={handleChange} />
                    </div>
                    <div className="gridEnd">
                      <label htmlFor="enddate">End Date</label>
                      <input type="date" name='End_Date' value={currentEducation.End_Date} onChange={handleChange} />
                    </div>
                    <button className='saveEducation' type='submit'>Save</button>
                  </div>
                </form>
              </div>
            ) : (
              null
            )}
          </div>

          <div className="experience">
            <h1>Experience</h1>
            {experienceList.map((exp) => (
              <div key={exp.id} className="grid_sub">
                <div className="subE"><p>{exp.organisation} </p></div>
                <div className='subButton'>
                  <div className="subButton_one">
                    <button onClick={() => handleEditEx(exp.id)}><i className="material-icons">edit</i></button>                 
                  </div>
                  <div className="subButton_two">
                    <button onClick={() => handleDeleteEx(exp.id)}><i className="material-icons">delete</i></button>                  
                  </div>
                </div>
              </div>
            ))}
            <button className="add_experience" onClick={toggleAddEx}>
                {isAddingEx ? 'Cancel' : 'Add Experience'}
            </button>

            {isAddingEx ? (
              <div className="experience_form">
                <form onSubmit={handleSubmitEx}>
                  <div className="formE">
                    <div className="gridInstitution">
                      <label htmlFor="organisation">Organisation</label>
                      <input type="text" name='organisation' value={currentExperience.organisation} onChange={handleChangeEx} />
                    </div>
                    <div className="gridDegree">
                      <label htmlFor="job_title">Job Position</label>
                      <input type="text" name='job_title' value={currentExperience.job_title} onChange={handleChangeEx} />
                    </div>
                    <div className="gridStart">
                      <label htmlFor="startdate">Start Date</label>
                      <input type="date" name='Start_Date' value={currentExperience.Start_Date} onChange={handleChangeEx} />
                    </div>
                    <div className="gridEnd">
                      <label htmlFor="enddate">End Date</label>
                      <input type="date" name='End_Date' value={currentExperience.End_Date} onChange={handleChangeEx} />
                    </div>
                    <button className='saveExperience' type='submit'>Save</button>
                  </div>
                </form>
              </div>
            ) : (
              null
            )}
          </div>

          <div className="certification">
            <h1>Certification</h1>
            <button className="add_certification">Add Certification</button>
          </div>
        </div>

        <div className="grid_two">
          <button className="download" onClick={downloadPDF}>Download PDF</button>
          <div className="cv">
            <header className='header_name'>
              <h3>{`${person.first_name} ${person.last_name}`}</h3>
            </header>
            <div className="cv_content">
              <div className="content_one">
                <h3>Contact</h3>
                <div className="contact">
                  <i className="material-icons">phone</i>
                  <p>{person.phone_number}</p>
                </div>
                <div className="contact">
                  <i className="material-icons">email</i>
                  <p>{person.email}</p>
                </div>
                <div className="contact">
                  <i className="material-icons">place</i>
                  <p>{person.location}</p>
                </div>
                <h3>Education and Degrees</h3>
                {educationList.map((edu) => (
                  <div key={edu.id} className="sectionEducation">
                    <p><span>Institution: </span>{edu.institution}</p>
                    <p><span>Degree/Qualification:</span>{edu.Degree}</p>
                    <p><span>Start date: </span>{edu.Start_Date}</p>
                    <p><span>End date: </span>{edu.End_Date}</p>
                  </div>
                ))}
              </div>
              <div className="content_two">
                <div className="gridContent_two">
                  <div className="gridProfile">
                    <h3>Profile</h3>
                    <p>{personProfile.profile_statement}</p>
                  </div>
                  <div className="gridProfessional">
                    <h3>Professional Experience</h3>
                    {experienceList.map((exp) => (
                      <div key={exp.id} className="sectionExperience">
                        <p><span>Organisation: </span>{exp.organisation}</p>
                        <p><span>Job Position:</span>{exp.job_title}</p>
                        <p><span>Start date: </span>{exp.Start_Date}</p>
                        <p><span>End date: </span>{exp.End_Date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
