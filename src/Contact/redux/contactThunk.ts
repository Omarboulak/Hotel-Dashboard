import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from '../../interfaces/ContactInterface';

export const addContactFetch = createAsyncThunk<ContactInterface[], void>(
  'contacts/add',
  async () => {
    const response = await fetch('/Contact.json');
    return await response.json();
  }
);

export const updateContactFetch = createAsyncThunk<
  { id: number; editRow: Partial<ContactInterface> },
  { id: number; contactData: Partial<ContactInterface> }
>(
  'contacts/update',
  async ({ id, contactData }) => {
    return { id, editRow: contactData };
  }
);

export const deleteContactFetch = createAsyncThunk<number, number>(
  'contacts/delete',
  async (id) => {
    return id;
  }
);