import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createContactFetch,allContactsFetch, updateContactFetch, deleteContactFetch } from "./contactThunk";
import { ContactInterface } from "../../interfaces/ContactInterface";

interface ContactState {
  value: ContactInterface[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: ContactState = {
  value: [],
  status: 'idle',
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allContactsFetch.pending, (state) => { state.status = 'loading'; })
      .addCase(allContactsFetch.fulfilled, (state, action: PayloadAction<ContactInterface[]>) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(allContactsFetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createContactFetch.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(updateContactFetch.fulfilled, (state, action: PayloadAction<ContactInterface>) => {
        const idx = state.value.findIndex(c => c.ID === action.payload.ID);
        if (idx >= 0) state.value[idx] = action.payload;
      })
      .addCase(deleteContactFetch.fulfilled, (state, action: PayloadAction<number>) => {
        state.value = state.value.filter(c => c.ID !== action.payload);
      });
  }
});

export default contactSlice.reducer;
