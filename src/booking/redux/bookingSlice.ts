import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addBookingFetch, updateBookingFetch, deleteBookingFetch } from "./bookinThunk";
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
};


export const newBookingSlice = createSlice({
    name: "newBooking",
    initialState,

    reducers:{
        addBooking: (state, action: PayloadAction<BookingInterface>) => {
            state.value.push(action.payload);
        }
    },

    extraReducers: builder => {
        builder
            .addCase(addBookingFetch.pending, state => {
                state.status = PromiseStatus.PENDING
                state.error = null;
            })
            .addCase(addBookingFetch.fulfilled, (state, action: PayloadAction<BookingInterface[]>) => {
                state.status = PromiseStatus.FULFILLED
                state.value = action.payload
                state.loading = false;
            })
            .addCase(addBookingFetch.rejected, state => {
                state.status = PromiseStatus.REJECTED
                state.error = null;
            })

            .addCase(updateBookingFetch.pending, state => {
                state.status = PromiseStatus.PENDING
                state.error = null;
            })
            .addCase(updateBookingFetch.fulfilled, (state, action: PayloadAction<{id: number, editRow: Partial<BookingInterface>}>) => {
                const { id, editRow } = action.payload;
                state.value = state.value.map((row) =>
                    row.ID === id ? { ...row, ...editRow } : row
                );
                state.loading = false;
            })
            .addCase(updateBookingFetch.rejected, state => {
                state.status = PromiseStatus.REJECTED
                state.error = null;
            })
            .addCase(deleteBookingFetch.pending, state => {
                state.status = PromiseStatus.PENDING
                state.error = null;
            })
            .addCase(deleteBookingFetch.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = PromiseStatus.FULFILLED
                state.value = state.value.filter(cell => cell.ID !== action.payload)
                state.loading = false;
            })
            .addCase(deleteBookingFetch.rejected, state => {
                state.status = PromiseStatus.REJECTED
                state.error = null;
            })
    },
})

export const {addBooking} = newBookingSlice.actions;
export default newBookingSlice.reducer;