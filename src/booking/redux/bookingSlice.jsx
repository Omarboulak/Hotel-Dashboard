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

    reducers:{
        addBooking: (state, action) => {
            state.value.push(action.payload);
        }
    },

    extraReducers: builder => {
        builder
            .addCase(newBooking.pending, state => {
                state.status = "loading"
                state.error = null;
            })
            .addCase(newBooking.fulfilled, (state, action) => {
                state.status = "idle"
                state.value = action.payload
                state.loading = false;
            })
            .addCase(newBooking.rejected, state => {
                state.status = "failed"
                state.error = null;
            })
    },
})

export const {addBooking} = newBookingSlice.actions;
export default newBookingSlice.reducer;