import React, { useEffect, useState, ChangeEvent, FormEvent, FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton, Textarea } from '../../components/styledFrom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { updateRoomFetch, allRoomFetch } from '../redux/roomThunk';
import { RoomInterface } from '../../interfaces/RoomInterface';
import { RootState } from '../../Redux/store';

export const EditRoom: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const roomId = Number(id);

  const room = useAppSelector((state: RootState) =>
    state.rooms.value.find(r => r.room_number === roomId)
  );

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

  useEffect(() => {
    if (room) {
      setFormData(room);
    }
  }, [room]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const input = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: input.checked
      }));
    } else if (name === 'room_number' || name === 'price' || name === 'discount') {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateRoomFetch({ room_number: formData.room_number, room: formData })).unwrap();
    navigate('/Rooms');
  };

  return (
    <FormContainer>
      <FormTitle>Edit Room</FormTitle>
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
        <SubmitButton type="submit">Save Room</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default EditRoom;
