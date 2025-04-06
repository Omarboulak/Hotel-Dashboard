import { createAsyncThunk } from "@reduxjs/toolkit"

export const addBookingFetch = createAsyncThunk('booking/add', async () =>{
    const response = await fetch('/Booking.json');
    return await response.json();
})

export const updateBookingFetch = createAsyncThunk('booking/update', async (id, bookingId) => {
    return {id, ...bookingId};
})

export const deleteBookingFetch = createAsyncThunk('booking/delete', async (id) => {
    return id
})