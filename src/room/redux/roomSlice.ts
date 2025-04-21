import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addRoomFetch, updateRoomFetch, deleteRoomFetch } from './roomThunk';
import { PromiseStatus } from '../../interfaces/promiseStatus';
import { RoomInterface } from '../../interfaces/RoomInterface';

interface RoomState {
  value: RoomInterface[];
  status: PromiseStatus;
  error: string | null;
  loading?: boolean;
}

const initialState: RoomState = {
  value: [],
  status: PromiseStatus.IDLE,
  error: null,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<RoomInterface>) => {
      state.value.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addRoomFetch.pending, state => {
        state.status = PromiseStatus.PENDING;
      })
      .addCase(addRoomFetch.fulfilled, (state, action: PayloadAction<RoomInterface[]>) => {
        state.status = PromiseStatus.FULFILLED;
        state.value = action.payload;
      })
      .addCase(addRoomFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED;
        state.error = 'Failed to load rooms.';
      })

      .addCase(updateRoomFetch.pending, state => {
        state.status = PromiseStatus.PENDING;
      })
      .addCase(updateRoomFetch.fulfilled, (state, action: PayloadAction<{ id: number; editRow: Partial<RoomInterface> }>) => {
        const { id, editRow } = action.payload;
        state.value = state.value.map((room) =>
          room.room_id === id ? { ...room, ...editRow } : room
        );
        state.loading = false;
      })
      .addCase(updateRoomFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED;
        state.error = 'Failed to update room.';
      })

      .addCase(deleteRoomFetch.pending, state => {
        state.status = PromiseStatus.PENDING;
        state.error = null;
      })
      .addCase(deleteRoomFetch.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = PromiseStatus.FULFILLED;
        state.value = state.value.filter(room => room.room_id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteRoomFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED;
        state.error = 'Failed to delete room.';
      });
  },
});

export const { addRoom } = roomSlice.actions;
export default roomSlice.reducer;
