import { createSlice } from "@reduxjs/toolkit"
import { addBookingFetch, updateBookingFetch, deleteBookingFetch } from "./bookinThunk";

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
            .addCase(addBookingFetch.pending, state => {
                state.status = "loading"
                state.error = null;
            })
            .addCase(addBookingFetch.fulfilled, (state, action) => {
                state.status = "idle"
                state.value = action.payload
                state.loading = false;
            })
            .addCase(addBookingFetch.rejected, state => {
                state.status = "failed"
                state.error = null;
            })

            .addCase(updateBookingFetch.pending, state => {
                state.status = "loading"
                state.error = null;
            })
            .addCase(updateBookingFetch.fulfilled, (state, action) => {
                state.status = "idle"
                const index =  state.value.findIndex(room => room.id === action.payload.id);
                if (index !== -1) {
                    state.rooms[index] = action.payload
                }   
                state.loading = false;
            })
            .addCase(updateBookingFetch.rejected, state => {
                state.status = "failed"
                state.error = null;
            })

            .addCase(deleteBookingFetch.pending, state => {
                state.status = "loading"
                state.error = null;
            })
            .addCase(deleteBookingFetch.fulfilled, (state, action) => {
                state.status = "idle"
                state.value = state.value.filter(cell => cell.ID !== action.payload)
                state.loading = false;
            })
            .addCase(deleteBookingFetch.rejected, state => {
                state.status = "failed"
                state.error = null;
            })
    },
})

export const {addBooking} = newBookingSlice.actions;
export default newBookingSlice.reducer;