import { createAsyncThunk } from "@reduxjs/toolkit"
import { BookingInterface } from '../../interfaces/BookingInterface'

export const addBookingFetch = createAsyncThunk<BookingInterface[], void>('booking/add', async () =>{
    const response = await fetch('/Booking.json');
    return await response.json();
})

export const updateBookingFetch = createAsyncThunk<{ id: number; editRow: Partial<BookingInterface> }, { id: number; bookingData: Partial<BookingInterface> } >(
  'booking/update',
  async ({ id, bookingData }) => {
    // Aquí podrías hacer el fetch u otra operación asíncrona.
    return { id, editRow: bookingData };
  }
);
export const deleteBookingFetch = createAsyncThunk<number, number>('booking/delete', async (id) => {
    return id
})