import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {FormContainer, FormTitle, Form, Label, Input, SubmitButton, Textarea} from '../../components/styledFrom'
import { useDispatch, useSelector } from "react-redux";
import { updateUsersFetch } from '../redux/usersThunk';

export const EditUser = () => {
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [formData, setFormData] = useState({});
  
  const users = useSelector(state =>
    state.users.value.find(b => b.ID === Number(userId))
  );

  useEffect(() => {
    if (users) {
      setFormData(users);
    }
  }, [users]);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...formData, ID: Number(formData.ID) };
    dispatch(updateUsersFetch({ id: Number(userId), userData: updatedData }));
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


