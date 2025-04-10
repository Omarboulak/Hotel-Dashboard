import { configureStore } from '@reduxjs/toolkit';
import newBookingReducer from '../booking/redux/bookingSlice';
import newUserReducer from '../users/redux/userSlice'

export const store = configureStore({
  reducer: {
    newBooking: newBookingReducer,
    users: newUserReducer,
  },
});

