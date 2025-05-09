import React, { useEffect, useState, ChangeEvent, FormEvent, FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton, Textarea } from '../../components/styledFrom';
import { createBookingFetch, allBookingFetch } from '../redux/bookinThunk';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { BookingInterface } from '../../interfaces/BookingInterface';
import { RootState } from '../../Redux/store';

export const NewBooking: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const [formData, setFormData] = useState<BookingInterface>({
    first_Name: '',
    last_Name: '',
    orderDate: '',
    checkIn: '',
    checkOut: '',
    specialRequest: '',
    roomType: '',
    roomNumber: 0,
    status: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createBookingFetch(formData)).unwrap();
    await dispatch(allBookingFetch()).unwrap();
    navigate('/Bookings');
  };

  return (
    <FormContainer>
      <FormTitle>Edit Booking</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>
          First Name:
          <Input
            type="text"
            name="first_Name"
            value={formData.first_Name}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Last Name:
          <Input
            type="text"
            name="last_Name"
            value={formData.last_Name}
            onChange={handleChange}
          />
        </Label>
        <Label>
          ID:
          <Input
            type="number"
            name="ID"
            value={formData.id}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Order Date:
          <Input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Check In:
          <Input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Check Out:
          <Input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Special Request:
          <Textarea
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Room Type:
          <Input
            type="text"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Room Number:
          <Input
            type="number"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Status:
          <Input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </Label>
        <SubmitButton type="submit">Save Booking</SubmitButton>
      </Form>
    </FormContainer>
  );
};