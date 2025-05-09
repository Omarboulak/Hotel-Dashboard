import { createAsyncThunk } from "@reduxjs/toolkit"
import { BookingInterface } from '../../interfaces/BookingInterface'

export const allBookingFetch = createAsyncThunk<BookingInterface[]>('booking', async() =>{
  const token = localStorage.getItem('jwtToken');
  const response = await fetch('http://localhost:3001/api/v1/booking',{
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}`} : {})
    }
  });

  if (response.status === 4001) {
    throw new Error('token invalido')
  }
  return await response.json();
})

export const createBookingFetch = createAsyncThunk<BookingInterface, BookingInterface>('booking/create', async (booking) =>{
  const token = localStorage.getItem('jwtToken');
  const {id, ...body} = booking
  const response = await fetch('http://localhost:3001/api/v1/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      ...(token ? { Authorization: `Barer ${token}` } : {})
    },
    body: JSON.stringify(body),
  });
  if (response.status === 401) {
    throw new Error('token invalido')
  }
  return await response.json();
})

export const updateBookingFetch = createAsyncThunk<BookingInterface, { id: string; booking: Partial<BookingInterface>} >('booking/update',
  async ({ id, booking }) => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`http://localhost:3001/api/v1/booking/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}`} : {})
      },
      body: JSON.stringify(booking)
    });
    if (!response.ok) {
      throw new Error('Error actualizando contacto');
    }
    return await response.json();
  }
);
export const deleteBookingFetch = createAsyncThunk<string, string>('booking/delete', async (id) => {
  const token = localStorage.getItem('jwtToken');
  const response = await fetch(`http://localhost:3001/api/v1/booking/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',  
      ...(token ? { Authorization: `Bearer ${token}`} : {})
    },
  })
  if (response.status !== 204) {
    throw new Error('Error borrando booking');
  }
  return id;
})