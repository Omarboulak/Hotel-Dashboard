import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserFetch, updateUserFetch, deleteUserFetch, allUsersFetch } from './usersThunk';
import { PromiseStatus } from '../../interfaces/promiseStatus';
import { UsersInterface } from '../../interfaces/UsersInterface'


export interface NewUsersState {
  value: UsersInterface[];
  status: PromiseStatus;
  error: string | null;
  loading?: boolean;
}

const initialState: NewUsersState = {
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
  extraReducers: (builder) => {
    builder
      .addCase(allUsersFetch.pending, (state) => {
        state.status = PromiseStatus.PENDING;
      })
      .addCase(
        allUsersFetch.fulfilled,
        (state, action: PayloadAction<UsersInterface[]>) => {
          state.status = PromiseStatus.FULFILLED;
          state.value = action.payload;
        }
      )
      .addCase(allUsersFetch.rejected, (state) => {
        state.status = PromiseStatus.REJECTED;
      })

      .addCase(createUserFetch.pending, (state: NewUsersState) => {
        state.status = PromiseStatus.PENDING;
      })
      .addCase(createUserFetch.fulfilled, (state, action) => {
        state.status = PromiseStatus.FULFILLED;
        state.value.push(action.payload);
      })
      .addCase(createUserFetch.rejected, (state) => {
        state.status = PromiseStatus.REJECTED;
      })

      .addCase(updateUserFetch.pending, (state) => {
        state.status = PromiseStatus.PENDING;
        state.error = null;
      })
      .addCase(updateUserFetch.fulfilled, (state, action) => {
        const idx = state.value.findIndex((u) => u.id === action.payload.id);
        if (idx >= 0) state.value[idx] = action.payload;
      })
      .addCase(updateUserFetch.rejected, (state) => {
        state.status = PromiseStatus.REJECTED;
        state.error = null;
      })

      .addCase(deleteUserFetch.pending, (state) => {
        state.status = PromiseStatus.PENDING;
        state.error = null;
      })
      .addCase(deleteUserFetch.fulfilled, (state, action) => {
        state.status = PromiseStatus.FULFILLED;
        state.value = state.value.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUserFetch.rejected, (state) => {
        state.status = PromiseStatus.REJECTED;
        state.error = null;
      });
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;