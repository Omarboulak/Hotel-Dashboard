import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../interfaces/ContactInterface";

export const createContactFetch = createAsyncThunk<ContactInterface, ContactInterface>('contacts/create', async (contact) => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch('http://localhost:3001/api/v1/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {})},
      body: JSON.stringify(contact),
    });
    if (response.status === 401) {
      throw new Error('No autorizado: token inválido o expirado');
    }
    return await response.json();
  }
);

export const updateContactFetch = createAsyncThunk<ContactInterface, { id: number; contact: Partial<ContactInterface> }>('contacts/update',
  async ({ id, contact }) => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`http://localhost:3001/api/v1/contact/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Error actualizando contacto');
    }
    return await response.json();
  }
);


export const deleteContactFetch = createAsyncThunk<number, number>('contacts/delete', async (id) => {
    const response = await fetch(`http://localhost:3001/api/v1/contact/${id}`, {method: 'DELETE'});
    if (response.status === 204) {
      return id;
    }
    throw new Error('Error borrando contacto');
  }
);

export const allContactsFetch = createAsyncThunk<ContactInterface[]>('contacts/fetchAll', async () => {
  const token = localStorage.getItem('jwtToken');
  const response = await fetch('http://localhost:3001/api/v1/contact', {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  if (response.status === 401) {
    throw new Error('token inválido');
  }
  if (!response.ok) {
    throw new Error('Error cargando contactos');
  }
  return await response.json();
});

