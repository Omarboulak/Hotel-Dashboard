import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton } from '../../components/styledFrom';
import { addUser } from '../redux/userSlice';

export const NewUsers = () => {
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  

  const [formData, setFormData] = useState({
    Photo: 'https://robohash.org/undevoluptatembeatae.png?size=50x50&set=set1', 
    FullName: '',
    ID: '',
    Email: '',
    StartDate: '',
    JobDescription: '',
    Contact: '',
    Status: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = { 
      ...formData, 
      ID: Number(formData.ID) 
    };
    dispatch(addUser(newUserData));
    navigate('/Users');
  };

  return (
    <FormContainer>
      <FormTitle>Add New User</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>
          Full Name:
          <Input 
            type="text" 
            name="FullName" 
            value={formData.FullName} 
            onChange={handleChange} 
          />
        </Label>
        <Label>
          ID:
          <Input 
            type="number" 
            name="ID" 
            value={formData.ID} 
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Email:
          <Input 
            type="email" 
            name="Email" 
            value={formData.Email} 
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Start Date:
          <Input 
            type="date" 
            name="StartDate" 
            value={formData.StartDate} 
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Job Description:
          <Input 
            type="text" 
            name="JobDescription" 
            value={formData.JobDescription} 
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Contact:
          <Input 
            type="text" 
            name="Contact" 
            value={formData.Contact} 
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Status:
          <Input 
            type="text" 
            name="Status" 
            value={formData.Status} 
            onChange={handleChange} 
          />
        </Label>
        <SubmitButton type="submit">Add User</SubmitButton>
      </Form>
    </FormContainer>
  );
};
