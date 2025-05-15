import React, { ChangeEvent, useState, FormEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton, Textarea } from '../../components/styledFrom';
import { createRoomFetch, allRoomFetch } from '../redux/roomThunk';
import { useAppDispatch } from '../../Redux/hooks';
import { RoomInterface } from '../../interfaces/RoomInterface';

export const NewRoom: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<RoomInterface>({
    room_number: 0,
    room_type: '',
    description: '',
    photos: '',
    offer: false,
    price: 0,
    discount: 0,
    cancellation_policy: '',
    amenities: ''
  });

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;
  
  if (type === 'checkbox') {
    const target = e.target as HTMLInputElement;
    setFormData(prev => ({...prev, [name]: target.checked}));
  } else {
    setFormData(prev => ({...prev, [name]: value}));
  }
};
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createRoomFetch(formData)).unwrap();
    await dispatch(allRoomFetch()).unwrap();
    navigate('/Room');
  };

  return (
    <FormContainer>
      <FormTitle>New Room</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>
          Room Number:
          <Input
            type="number"
            name="room_number"
            value={formData.room_number}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Room Type:
          <Input
            type="text"
            name="room_type"
            value={formData.room_type}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Description:
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Photos:
          <Input
            type="text"
            name="photos"
            value={formData.photos}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Price:
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Discount:
          <Input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Cancellation Policy:
          <Input
            type="text"
            name="cancellation_policy"
            value={formData.cancellation_policy}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Amenities:
          <Input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Offer:
          <Input
            type="checkbox"
            name="offer"
            checked={formData.offer}
            onChange={handleChange}
          />
        </Label>
        <SubmitButton type="submit">Create Room</SubmitButton>
      </Form>
    </FormContainer>
  );
};