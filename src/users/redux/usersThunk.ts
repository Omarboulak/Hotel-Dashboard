import { createAsyncThunk } from "@reduxjs/toolkit"
import { UsersInterface } from "../../interfaces/UsersInterface";

export const addUsersFetch = createAsyncThunk<UsersInterface[], void>('users/add', async () =>{
    const response = await fetch('/users.json');
    return await response.json();
})

export const updateUsersFetch = createAsyncThunk<{ id: number; editRow: Partial<UsersInterface> }, { id: number; userData: Partial<UsersInterface> } >(
  'users/update',
  async ({ id, userData }) => {
    return { id, editRow: userData };
  }
);

export const deleteUsersFetch = createAsyncThunk<number, number>('users/delete', async (id) => {
    return id
})