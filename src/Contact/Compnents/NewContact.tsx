import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { createContactFetch, allContactsFetch } from '../redux/contactThunk';
import { ContactInterface } from '../../interfaces/ContactInterface';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton, Textarea } from '../../components/styledFrom';

export const NewContact: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ContactInterface>({
    ID: 0,
    Date: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    Subject: '',
    Comment: '',
    ARCHIVE: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(createContactFetch(formData)).unwrap();
      dispatch(allContactsFetch());
      navigate('/Contact');
    } catch (err: any) {
      console.error('Error creando contact', err);
    }
  };

  return (
    <FormContainer>
      <FormTitle>New Contact</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>
          Date:
          <Input
            type="text"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
          />
        </Label>

        <Label>
          First Name:
          <Input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Last Name:
          <Input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Email:
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Phone:
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Subject:
          <Input
            type="text"
            name="Subject"
            value={formData.Subject}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Comment:
          <Input
            name="Comment"
            value={formData.Comment}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Archive:
          <Input
            type="text"
            name="ARCHIVE"
            value={formData.ARCHIVE}
            onChange={handleChange}
          />
        </Label>

        <SubmitButton type="submit">Create Contact</SubmitButton>
      </Form>
    </FormContainer>
  );
};

