import React, { useEffect, useState, ChangeEvent, FormEvent, FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton } from '../../components/styledFrom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { updateRoomFetch } from '../redux/roomThunk';
import { RoomInterface } from '../../interfaces/RoomInterface';
import { RootState } from '../../Redux/store';

export const EditRoom: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const roomId = Number(id);

  const room = useAppSelector((state: RootState) =>
    state.rooms.value.find(r => r.room_id === roomId)
  );

  const [formData, setFormData] = useState<RoomInterface>({
    room_id: 0,
    room_type: '',
    description: '',
    photos: '',
    offer: false,
    price: 0,
    discount: 0,
    cancellation_policy: '',
    amenities: ''
  });

  useEffect(() => {
    if (room) {
      setFormData(room);
    }
  }, [room]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateRoomFetch({ id: formData.room_id, roomData: formData }));
    navigate('/Rooms');
  };

  return (
    <FormContainer>
      <FormTitle>Edit Room</FormTitle>
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
            type="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Photo URL:
          <Input
            type="text"
            name="photos"
            value={formData.photos ?? ''}
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
            type="textarea"
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
        <SubmitButton type="submit">Save Room</SubmitButton>
      </Form>
    </FormContainer>
  );
};
