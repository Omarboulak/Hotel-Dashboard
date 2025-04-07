import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {FormContainer, FormTitle, Form, Label, Input, SubmitButton, Textarea} from '../../components/styledFrom'
import { useDispatch, useSelector } from "react-redux";
import { updateBookingFetch } from '../redux/bookinThunk';

export const EditBooking = () => {
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({});
  
  const booking = useSelector(state =>
    state.newBooking.value.find(b => b.ID === Number(bookingId))
  );

  useEffect(() => {
    if (booking) {
      setFormData(booking);
    }
  }, [booking]);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...formData, ID: Number(formData.ID) };
    dispatch(updateBookingFetch({ id: Number(bookingId), bookingData: updatedData }));
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
            name="First_Name" 
            value={formData.First_Name }
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Last Name:
          <Input 
            type="text" 
            name="Last_Name" 
            value={formData.Last_Name } 
            onChange={handleChange} 
          />
        </Label>
        <Label>
          ID:
          <Input 
            type="number" 
            name="ID" 
            value={formData.ID }
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Order Date:
          <Input 
            type="date" 
            name="OrderDate" 
            value={formData.OrderDate }
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Check In:
          <Input 
            type="date" 
            name="CheckIn" 
            value={formData.CheckIn }
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Check Out:
          <Input 
            type="date" 
            name="CheckOut" 
            value={formData.CheckOut } 
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Special Request:
          <Textarea 
            name="SpecialRequest" 
            value={formData.SpecialRequest }
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Room Type:
          <Input 
            type="text" 
            name="RoomType" 
            value={formData.RoomType } 
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Room Number:
          <Input 
            type="number" 
            name="RoomNumber" 
            value={formData.RoomNumber }
            onChange={handleChange} 
          />
        </Label>
        <Label>
          Status:
          <Input 
            type="text" 
            name="Status" 
            value={formData.Status } 
            onChange={handleChange} 
          />
        </Label>
        <SubmitButton type="submit">Add Booking</SubmitButton>
      </Form>
    </FormContainer>
  );
};


