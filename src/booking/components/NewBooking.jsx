import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FormContainer, FormTitle, Form, Label, Input, SubmitButton, Textarea} from '../../components/styledFrom'
import { addBookingFetch } from '../redux/bookinThunk';
import { addBooking } from '../redux/bookingSlice';
import { useDispatch, useSelector } from "react-redux";

export const NewBooking = () => {
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.newBooking);
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    ID: '',
    orderDate: '',
    checkIn: '',
    checkOut: '',
    specialRequest: '',
    roomType: '',
    roomNumber: '',
    status: ''
  });
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { 
      ...formData, 
      ID: Number(formData.ID)  
    };
    dispatch(addBooking(newData))
    navigate('/Bookings');
  };


  
  return (
    <FormContainer>
      <FormTitle>Add New Booking</FormTitle>
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
            value={formData.ID} 
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
          status:
          <Input 
            type="text" 
            name="status" 
            value={formData.status} 
            onChange={handleChange} 
          />
        </Label>
        <SubmitButton type="submit">Add Booking</SubmitButton>
      </Form>
    </FormContainer>
  );
};


