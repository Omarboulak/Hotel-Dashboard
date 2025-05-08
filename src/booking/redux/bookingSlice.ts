import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { allBookingFetch, createBookingFetch, updateBookingFetch, deleteBookingFetch } from "./bookinThunk";
import { PromiseStatus } from "../../interfaces/promiseStatus";
import { BookingInterface } from '../../interfaces/BookingInterface'


export interface NewBookingState {
    value: BookingInterface[];
    status: PromiseStatus;
    error: string | null;
    loading: boolean;
}

const initialState: NewBookingState = {
    value: [],
    status: PromiseStatus.IDLE,
    error: null,
    loading: true
};


export const newBookingSlice = createSlice({
    name: "newBooking",
    initialState,

    reducers: {
        addBooking: (state: NewBookingState, action: PayloadAction<BookingInterface>) => {
            state.value.push(action.payload);
        }
    },

    extraReducers: builder => {
        builder

            .addCase(allBookingFetch.pending, (state) => {
                state.status = PromiseStatus.PENDING;
            })
            .addCase(allBookingFetch.fulfilled, (state, action: PayloadAction<BookingInterface[]>) => {
                state.status = PromiseStatus.FULFILLED;
                state.value = action.payload;
            })
            .addCase(allBookingFetch.rejected, (state, action) => {
                state.status = PromiseStatus.REJECTED;
            })

            .addCase(createBookingFetch.pending, (state: NewBookingState) => {
                state.status = PromiseStatus.PENDING
                
            })
            .addCase(createBookingFetch.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED
                state.value.push(action.payload);
            })
            .addCase(createBookingFetch.rejected, (state, action) => {
                state.status = PromiseStatus.REJECTED;
            })

            .addCase(updateBookingFetch.pending, state => {
                state.status = PromiseStatus.PENDING
                state.error = null;
            })
            .addCase(updateBookingFetch.fulfilled, (state, action) => {
                const idx = state.value.findIndex(c => c.id === action.payload.id);
                if (idx >= 0) state.value[idx] = action.payload;
            })
            .addCase(updateBookingFetch.rejected, state => {
                state.status = PromiseStatus.REJECTED
                state.error = null;
            })
            .addCase(deleteBookingFetch.pending, state => {
                state.status = PromiseStatus.PENDING
                state.error = null;
            })
            .addCase(deleteBookingFetch.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED
                state.value = state.value.filter(c => c.id !== action.payload);
            })
            .addCase(deleteBookingFetch.rejected, state => {
                state.status = PromiseStatus.REJECTED
                state.error = null;
            })
    },
})

export default newBookingSlice.reducer;