import React, { useState } from 'react';

export function usePersonalDetails() {
  const [person, setPerson] = useState({
    first_name: "Emma",
    last_name: "Watson",
    email: "example@gmail.com",
    phone_number: "+23791936551",
    location: "example"
  });

  const updatePersonDetails = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedPerson = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      location: formData.get("location")
    };
    setPerson(updatedPerson);
  };

  return [person, updatePersonDetails];
}

export function profile() {
  const [personProfile, setProfile] = useState({
    profile_statement: "Write a powerful performance summary here. Highlight your most valuable skills, qualifications, achievements, and credentials as they support your current objective. Integrate keywords aligned with the company's needs. Demonstrate why you are uniquely qualified, focusing on key skills, industry expertise, companies you've worked for, degrees, certifications, awards, and other professional credentials."
  });

  const updateProfile = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedProfile = formData.get("profile_statement");
    setProfile({ profile_statement: updatedProfile });
    toggleAdd();
  };

  const [isAdding, setIsAdding] = useState(false);

  const toggleAdd = () => {
    setIsAdding(!isAdding);
  };

  const deleteProfile = () => {
    setProfile({ profile_statement: "" });
  };

  return [isAdding, toggleAdd, personProfile, updateProfile, deleteProfile];
}

export function useEducation() {
  const [educationList, setEducationList] = useState([
    {
      id: 1,
      institution: "TechnoLab-Ista",
      Degree: "Bachelor degree",
      Start_Date: "12/20/2023",
      End_Date: "12/20/2024"
    }
  ]);

  const [currentEducation, setCurrentEducation] = useState({
    id: null,
    institution: "",
    Degree: "",
    Start_Date: "",
    End_Date: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingE, setIsAddingE] = useState(false);

  const toggleAddE = () => {
    setIsAddingE(!isAddingE);
    setCurrentEducation({ id: null, institution: "", Degree: "", Start_Date: "", End_Date: "" });
  };

  const handleEdit = (id) => {
    const education = educationList.find(item => item.id === id);
    setCurrentEducation(education);
    setIsEditing(true);
    setIsAddingE(true);
  };

  const handleDelete = (id) => {
    setEducationList(educationList.filter(item => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEducationList(educationList.map(item => item.id === currentEducation.id ? currentEducation : item));
      setIsEditing(false);
    } else {
      const newEducation = { ...currentEducation, id: Date.now() };
      setEducationList([...educationList, newEducation]);
    }
    setIsAddingE(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation({ ...currentEducation, [name]: value });
  };

  return [educationList, isAddingE, toggleAddE, handleEdit, handleDelete, handleSubmit, currentEducation, handleChange];
}

export function useExperience() {
  const [experienceList, setExperienceList] = useState([
    {
      id: 1,
      organisation: "Google",
      job_title: "Software engineer",
      Start_Date: "12/20/2021",
      End_Date: "12/20/2024"
    }
  ]);

  const [currentExperience, setCurrentExperience] = useState({
    id: null,
    organisation: "",
    job_title: "",
    Start_Date: "",
    End_Date: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingEx, setIsAddingEx] = useState(false);

  const toggleAddEx = () => {
    setIsAddingEx(!isAddingEx);
    setCurrentExperience({ id: null, organisation: "", job_title: "", Start_Date: "", End_Date: "" });
  };

  const handleEditEx = (id) => {
    const experience = experienceList.find(item => item.id === id);
    setCurrentExperience(experience);
    setIsEditing(true);
    setIsAddingEx(true);
  };

  const handleDeleteEx = (id) => {
    setExperienceList(experienceList.filter(item => item.id !== id));
  };

  const handleSubmitEx = (e) => {
    e.preventDefault();
    if (isEditing) {
      setExperienceList(experienceList.map(item => item.id === currentExperience.id ? currentExperience : item));
      setIsEditing(false);
    } else {
      const newExperience = { ...currentExperience, id: Date.now() };
      setExperienceList([...experienceList, newExperience]);
    }
    setIsAddingEx(false);
  };

  const handleChangeEx = (e) => {
    const { name, value } = e.target;
    setCurrentExperience({ ...currentExperience, [name]: value });
  };

  return [experienceList, isAddingEx, toggleAddEx, handleEditEx, handleDeleteEx, handleSubmitEx, currentExperience, handleChangeEx];
}
