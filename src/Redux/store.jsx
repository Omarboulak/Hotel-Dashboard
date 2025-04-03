import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../login/slice/loginSlice'; 
import newBookingReducer from '../booking/redux/bookingSlice';
import newUserReducer from '../users/redux/userSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    newBooking: newBookingReducer,
    users: newUserReducer,
  },
});

