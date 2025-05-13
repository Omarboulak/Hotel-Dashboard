import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersInterface } from "../../interfaces/UsersInterface";

export const allUsersFetch = createAsyncThunk<UsersInterface[]>("users/fetchAll",
  async () => {
    const token = localStorage.getItem("jwtToken");
    const res = await fetch("http://localhost:3001/api/v1/users", {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (res.status === 401) {
      throw new Error("No autorizado");
    }
    return await res.json();
  }
);

export const createUserFetch = createAsyncThunk<UsersInterface, UsersInterface>("users/create",
  async (user) => {
    const token = localStorage.getItem("jwtToken");
    const { id, ...body } = user;
    const response = await fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(user),
    });
    if (response.status === 401) {
    throw new Error('token invalido')
  }
    return await response.json();
  }
);

export const updateUserFetch = createAsyncThunk<UsersInterface, { id: string; data: Partial<UsersInterface> }>(
  "users/update",
  async ({ id, data }) => {
    const token = localStorage.getItem("jwtToken");
    const res = await fetch(`http://localhost:3001/api/v1/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error actualizando usuario");
    return await res.json();
  }
);

export const deleteUserFetch = createAsyncThunk<string, string>(
  "users/delete",
  async (id) => {
    const token = localStorage.getItem("jwtToken");
    const res = await fetch(`http://localhost:3001/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (res.status !== 204) throw new Error("Error borrando usuario");
    return id;
  }
);
