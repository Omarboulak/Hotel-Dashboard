import React, { useEffect, useState, ChangeEvent, FormEvent, FC} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton } from '../../components/styledFrom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { updateContactFetch, allContactsFetch } from '../redux/contactThunk';
import { ContactInterface } from '../../interfaces/ContactInterface';
import { RootState } from '../../Redux/store';
import { PromiseStatus } from '../../interfaces/promiseStatus';

export const EditContact: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const contactId = Number(id);

  const status = useAppSelector((s: RootState) => s.contacts.status);
  const contacts = useAppSelector((s: RootState) => s.contacts.value);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(allContactsFetch());
    }
  }, [dispatch, status]);

  const contact = contacts.find(c => c.id === contactId);

  const [formData, setFormData] = useState<ContactInterface>({
    id: contactId,
    booking_id: 0, 
    Date: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    Subject: '',
    Comment: '',
    ARCHIVE: '',
  });

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  if (status === PromiseStatus.PENDING) {
    return <p>Cargando...</p>;
  }
  if (status === PromiseStatus.FULFILLED && !contact) {
    return <p>Contacto con ID {contactId} no encontrado</p>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked.toString() : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateContactFetch({ id: contactId, contact: formData })).unwrap();
      navigate('/Contact');
    } catch (err: any) {
      console.error('Error updating contact', err);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Edit Contact</FormTitle>
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
            type="text"
            name="ARCHIVE"
            value={formData.ARCHIVE}
            onChange={handleChange}
          />
        </Label>

        <SubmitButton type="submit">Save Contact</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default EditContact;
