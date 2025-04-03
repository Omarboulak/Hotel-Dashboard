import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const newUsersFetch = createAsyncThunk('users/fetchAll', async () => {
  const response = await fetch('/users.json');
  return await response.json();
});

const initialState = {
  users: [],
  status: 'idle',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(newUsersFetch.pending, state => {
        state.status = 'loading';
      })
      .addCase(newUsersFetch.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(newUsersFetch.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
