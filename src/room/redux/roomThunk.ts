import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from '../../interfaces/RoomInterface';

export const allRoomFetch = createAsyncThunk<RoomInterface[]>('room', async () => {
  const token = localStorage.getItem('jwtToken');
  const response = await fetch('http://localhost:3001/api/v1/room', {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  if (response.status === 401) {
    throw new Error('token invalido');
  }
  return await response.json();
});

export const createRoomFetch = createAsyncThunk<RoomInterface, RoomInterface>(
  'room/create',
  async (room) => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch('http://localhost:3001/api/v1/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(room),
    });
    if (response.status === 401) {
      throw new Error('token invalido');
    }
    return await response.json();
  }
);

export const updateRoomFetch = createAsyncThunk<RoomInterface, { room_number: number; room: Partial<RoomInterface> }>('room/update',
  async ({ room_number, room }) => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`http://localhost:3001/api/v1/room/${room_number}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(room)
    });
    if (!response.ok) {
      throw new Error('Error actualizando contacto');
    }
    return await response.json();
  }
);

export const deleteRoomFetch = createAsyncThunk<number, number>('room/delete', async (room_number) => {
  const token = localStorage.getItem('jwtToken');
  const response = await fetch(`http://localhost:3001/api/v1/room/${room_number}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
  });
  if (response.status !== 204) {
    throw new Error('Error borrando room');
  }
  return room_number;
});
