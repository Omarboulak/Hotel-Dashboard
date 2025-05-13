import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { useNavigate } from 'react-router-dom';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton } from '../../components/styledFrom';
import { UsersInterface } from '../../interfaces/UsersInterface';
import { createUserFetch, allUsersFetch } from '../redux/usersThunk';

export const NewUsers: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<UsersInterface>({
    Photo: 'https://robohash.org/undevoluptatembeatae.png?size=50x50&set=set1',
    FullName: '',
    Email: '',
    StartDate: '',
    JobDescription: '',
    Contact: 0,
    status: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createUserFetch(formData)).unwrap();
    await dispatch(allUsersFetch()).unwrap();
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
            value={formData.status}
            onChange={handleChange}
          />
        </Label>
        <SubmitButton type="submit">Add User</SubmitButton>
      </Form>
    </FormContainer>
  );
};
