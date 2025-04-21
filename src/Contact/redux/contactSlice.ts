import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addContactFetch, updateContactFetch, deleteContactFetch } from './contactThunk'
import { PromiseStatus } from '../../interfaces/promiseStatus';
import { ContactInterface } from '../../interfaces/ContactInterface';

interface ContactState {
  value: ContactInterface[];
  status: PromiseStatus;
  error: string | null;
  loading?: boolean;
}

const initialState: ContactState = {
  value: [],
  status: PromiseStatus.IDLE,
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactInterface>) => {
      state.value.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addContactFetch.pending, state => {
        state.status = PromiseStatus.PENDING;
      })
      .addCase(addContactFetch.fulfilled, (state, action: PayloadAction<ContactInterface[]>) => {
        state.status = PromiseStatus.FULFILLED;
        state.value = action.payload;
      })
      .addCase(addContactFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED;
        state.error = 'Failed to load contacts.';
      })

      .addCase(updateContactFetch.pending, state => {
        state.status = PromiseStatus.PENDING;
      })
      .addCase(
        updateContactFetch.fulfilled,
        (state, action: PayloadAction<{ id: number; editRow: Partial<ContactInterface> }>) => {
          const { id, editRow } = action.payload;
          state.value = state.value.map(contact =>
            contact.ID === id ? { ...contact, ...editRow } : contact
          );
          state.loading = false;
        }
      )
      .addCase(updateContactFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED;
        state.error = 'Failed to update contact.';
      })

      .addCase(deleteContactFetch.pending, state => {
        state.status = PromiseStatus.PENDING;
        state.error = null;
      })
      .addCase(deleteContactFetch.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = PromiseStatus.FULFILLED;
        state.value = state.value.filter(contact => contact.ID !== action.payload);
        state.loading = false;
      })
      .addCase(deleteContactFetch.rejected, state => {
        state.status = PromiseStatus.REJECTED;
        state.error = 'Failed to delete contact.';
      });
  },
});

export const { addContact } = contactSlice.actions;
export default contactSlice.reducer;
