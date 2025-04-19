import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton } from '../../components/styledFrom';
import { useDispatch, useSelector } from "react-redux";
import { updateUsersFetch } from '../redux/usersThunk';
import { UsersInterface } from '../../interfaces/UsersInterface';
import { RootState } from '../../Redux/store';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';

export const EditUser: React.FC = () => {
  const navigate = useNavigate();  
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  
  const user = useAppSelector((state: RootState) =>
    state.users.value.find(u => u.ID === Number(userId))
  );

  const [formData, setFormData] = useState<UsersInterface>({
    Photo: '',
    FullName: '',
    ID: 0,
    Email: '',
    StartDate: '',
    JobDescription: '',
    Contact: 0,
    Status: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    const updatedData: UsersInterface = {
      ...formData,
      ID: Number(formData.ID),
    };

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


