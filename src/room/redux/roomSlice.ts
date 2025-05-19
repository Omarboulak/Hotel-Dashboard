import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allRoomFetch, createRoomFetch, updateRoomFetch, deleteRoomFetch } from "./roomThunk";
import { PromiseStatus } from "../../interfaces/promiseStatus";
import { RoomInterface } from '../../interfaces/RoomInterface';

export interface NewRoomState {
  value: RoomInterface[];
  status: PromiseStatus;
  error: string | null;
  loading: boolean;
}

const initialState: NewRoomState = {
  value: [],
  status: PromiseStatus.IDLE,
  error: null,
  loading: true
};

export const newRoomSlice = createSlice({
  name: "newRoom",
  initialState,
  reducers: {
    addRoom: (state: NewRoomState, action: PayloadAction<RoomInterface>) => {
      state.value.push(action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(allRoomFetch.pending, (state) => {
        state.status = PromiseStatus.PENDING;
      })
      .addCase(allRoomFetch.fulfilled, (state, action: PayloadAction<RoomInterface[]>) => {
        state.status = PromiseStatus.FULFILLED;
        state.value = action.payload;
      })
      .addCase(allRoomFetch.rejected, (state, action) => {
        state.status = PromiseStatus.REJECTED;
      })
      .addCase(createRoomFetch.pending, (state: NewRoomState) => {
        state.status = PromiseStatus.PENDING;
      })
      .addCase(createRoomFetch.fulfilled, (state, action) => {
        state.status = PromiseStatus.FULFILLED;
        state.value.push(action.payload);
      })
      .addCase(createRoomFetch.rejected, (state, action) => {
        state.status = PromiseStatus.REJECTED;
      })
      .addCase(updateRoomFetch.pending, state => {
        state.status = PromiseStatus.PENDING;
        state.error = null;
      })
      .addCase(updateRoomFetch.fulfilled, (state, action) => {
        state.status = PromiseStatus.FULFILLED;         
        const idx = state.value.findIndex( c => c.room_number === action.payload.room_number);
        if (idx >= 0) state.value[idx] = action.payload;
      })
      .addCase(updateRoomFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED;
        state.error = null;
      })
      .addCase(deleteRoomFetch.pending, state => {
        state.status = PromiseStatus.PENDING;
        state.error = null;
      })
      .addCase(deleteRoomFetch.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = PromiseStatus.FULFILLED;
        state.value = state.value.filter(c => c.room_number !== action.payload);
      })
      .addCase(deleteRoomFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED;
        state.error = null;
      });
  }
});

export default newRoomSlice.reducer;
