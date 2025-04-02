import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const newBooking = createAsyncThunk('booking/add', async () =>{
    const response = await fetch('../../../../public/Booking.json');
    return await response.json();
})

const initialState = {
    value: [],
    status: "idle",
}

export const newBookingSlice = createSlice({
    name: "newBooking",
    initialState,

    extraReducers: builder => {
        builder
            .addCase(newBooking.pending, state => {
                state.status = "loading"
                state.error = null;
            })
            .addCase(newBooking.fulfilled, (state, action) => {
                state.status = "idle"
                const newB = action.payload
                state.value = {...state.value, ...newB}
                state.loading = false;
            })
            .addCase(newBooking.rejected, state => {
                state.status = "failed"
                state.error = null;
            })
    },
})

export default newBookingSlice.reducer;