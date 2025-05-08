import { configureStore } from '@reduxjs/toolkit';
import newBookingReducer from '../booking/redux/bookingSlice';
import newUserReducer from '../users/redux/userSlice'
import roomsReducer from '../room/redux/roomSlice';
import contactsReducer from '../Contact/redux/contactSlice'; 

export const store = configureStore({
  reducer: {
    booking: newBookingReducer,
    users: newUserReducer,
    rooms: roomsReducer,
    contacts: contactsReducer,      
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
