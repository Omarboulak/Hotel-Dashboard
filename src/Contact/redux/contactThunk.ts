import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../interfaces/ContactInterface";

export const createContactFetch = createAsyncThunk<ContactInterface, ContactInterface>('contacts/create', async (contact) => {
    const response = await fetch('http://localhost:3001/api/v1/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Error creando contacto');
    }
    return await response.json();
  }
);

export const updateContactFetch = createAsyncThunk<ContactInterface, { id: number; contact: Partial<ContactInterface> } >( 'contacts/update', async ({ id, contact }) => {
    const response = await fetch(`http://localhost:3001/api/v1/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Error actualizando contacto');
    }
    return await response.json();
  }
);

export const deleteContactFetch = createAsyncThunk<number, number>('contacts/delete', async (id) => {
    const response = await fetch(`http://localhost:3001/api/v1/contact/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      return id;
    }
    throw new Error('Error borrando contacto');
  }
);

export const allContactsFetch = createAsyncThunk< ContactInterface[]>('contacts/fetchAll', async () => {
    const response = await fetch('http://localhost:3001/api/v1/contact');
    if (!response.ok) {
      throw new Error('Error cargando contactos');
    }
    return await response.json();
  }
);
