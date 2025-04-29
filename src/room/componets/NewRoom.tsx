import React, { ChangeEvent, useState, FormEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { RoomInterface } from '../../interfaces/RoomInterface';
import { addRoom } from '../redux/roomSlice';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton, Textarea } from '../../components/styledFrom';

export const NewRoom: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RoomInterface>({
    room_id: 0,
    room_type: '',
    description: '',
    photos: '',
    offer: false,
    price: 0,
    discount: 0,
    cancellation_policy: '',
    amenities: '',
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRoomData = {
      ...formData,
      ID: Number(formData.room_id)
    };
    dispatch(addRoom(newRoomData));
    navigate('/Room');
  };

  return (
    <FormContainer>
      <FormTitle>New Room</FormTitle>
      <Form onSubmit={handleSubmit}>
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
          <Input
            name="description"
            value={formData.description}
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

