import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createContactFetch, allContactsFetch, updateContactFetch, deleteContactFetch } from "./contactThunk";
import { ContactInterface } from "../../interfaces/ContactInterface";
import { PromiseStatus } from "../../interfaces/promiseStatus";

interface ContactState {
  value: ContactInterface[];
  status: PromiseStatus;
  error?: string;
}

const initialState: ContactState = {
  value: [],
  status: PromiseStatus.IDLE,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allContactsFetch.pending, (state) => {
        state.status = PromiseStatus.PENDING;
      })
      .addCase(allContactsFetch.fulfilled, (state, action: PayloadAction<ContactInterface[]>) => {
        state.status = PromiseStatus.FULFILLED;
        state.value = action.payload;
      })
      .addCase(allContactsFetch.rejected, (state, action) => {
        state.status = PromiseStatus.REJECTED;
        state.error = action.error.message;
      })
      .addCase(createContactFetch.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(updateContactFetch.fulfilled, (state, action) => {
        const idx = state.value.findIndex(c => c.id === action.payload.id);
        if (idx >= 0) state.value[idx] = action.payload;
      })
      .addCase(deleteContactFetch.fulfilled, (state, action) => {
        state.value = state.value.filter(c => c.id !== action.payload);
      });
  }
});

export default contactSlice.reducer;
