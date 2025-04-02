import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../login/slice/loginSlice'; 
import newBookingReducer from '../booking/redux/bookingSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    newBooking: newBookingReducer ,
  },
});

