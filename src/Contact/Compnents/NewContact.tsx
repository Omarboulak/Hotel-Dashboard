import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { ContactInterface } from '../../interfaces/ContactInterface';
import { addContact } from '../redux/contactSlice';
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
    ARCHIVE: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newContactData: ContactInterface = {
      ...formData,
      ID: Number(formData.ID),
    };
    dispatch(addContact(newContactData));
    navigate('/Contact');
  };

  return (
    <FormContainer>
      <FormTitle>New Contact</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>
          Date:
          <Input
            type="date"
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
            type="email"
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
            type="checkbox"
            name="ARCHIVE"
            checked={formData.ARCHIVE}
            onChange={handleChange}
          />
        </Label>

        <SubmitButton type="submit">Create Contact</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default NewContact;