import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from '../../interfaces/RoomInterface';

export const addRoomFetch = createAsyncThunk<RoomInterface[], void>('rooms/add', async () => {
  const response = await fetch('/Rooms.json');
  return await response.json();
});

export const updateRoomFetch = createAsyncThunk<
  { id: number; editRow: Partial<RoomInterface> },
  { id: number; roomData: Partial<RoomInterface> }>
  ('rooms/update',
  async ({ id, roomData }) => {
    return { id, editRow: roomData };
  }
);

export const deleteRoomFetch = createAsyncThunk<number, number>('rooms/delete', async (id) => {
  return id;
});
