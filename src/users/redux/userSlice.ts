import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addUsersFetch, updateUsersFetch, deleteUsersFetch } from './usersThunk';
import { PromiseStatus } from '../../interfaces/promiseStatus';
import { UsersInterface } from '../../interfaces/UsersInterface'


export interface NewBookingState {
  value: UsersInterface[];
  status: PromiseStatus;
  error: string | null;
  loading?: boolean;
}

const initialState: NewBookingState = {
  value: [],
  status: PromiseStatus.IDLE,
  error: null,
};



const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UsersInterface>) => {
      state.value.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addUsersFetch.pending, state => {
        state.status = PromiseStatus.PENDING;
      })
      .addCase(addUsersFetch.fulfilled, (state, action: PayloadAction<UsersInterface[]>) => {
        state.status = PromiseStatus.IDLE;
        state.value = action.payload;
      })
      .addCase(addUsersFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED;
      })
      .addCase(updateUsersFetch.pending, state => {
        state.status = PromiseStatus.PENDING;
      })
      
      .addCase(updateUsersFetch.fulfilled, (state, action: PayloadAction<{ id: number, editRow: Partial<UsersInterface> }>) => {
        const { id, editRow } = action.payload;
        state.value = state.value.map((row) =>
          row.ID === id ? { ...row, ...editRow } : row
        );
        state.loading = false;
      })
      .addCase(updateUsersFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED;
      })

      .addCase(deleteUsersFetch.pending, state => {
        state.status = PromiseStatus.PENDING
        state.error = null;
      })
      .addCase(deleteUsersFetch.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = PromiseStatus.FULFILLED
        state.value = state.value.filter(cell => cell.ID !== action.payload)
        state.loading = false;
      })
      .addCase(deleteUsersFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED
        state.error = null;
      })
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
