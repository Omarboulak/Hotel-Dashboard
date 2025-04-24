import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth  } from './login/context/loginContext'; 
import { Container, MainContent } from './components/global';
import Menu from './components/Menu';
import { Header } from './components/header/Header';
import GlobalStyle from './components/global';
import { Room } from './Room/Room';
import { NewRoom } from './Room/componets/NewRoom';
import { EditRoom } from './Room/componets/EditRoom';
import {Contact} from './Contact/Contact'
import {NewContact} from './Contact/Compnents/NewContact';
import {EditContact} from './Contact/Compnents/EditContact';
import { Bookings } from './booking/Bookings';
import { NewBooking } from './booking/components/NewBooking';
import { EditBooking } from './booking/components/EditBooking';
import { Users } from './users/Users';
import { HotelRoom } from './hotelRoom/HotelRoom';
import { NewUsers } from './users/components/NewUsers';
import { EditUser } from './users/components/EditUser';
import { Login } from './login/Login';

export const App = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Container>
          <AuthRoutes />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
};

const AuthRoutes = () => {
  const { state, dispatch } = useAuth();

  const handleLogOut = () => {
    dispatch({ type: "logout" });
  };

  return (
    <>
      {state.isLoggedIn && <Menu />}
      <MainContent>
        {state.isLoggedIn && <Header isLogOut={handleLogOut} />}
        <Routes>
          {state.isLoggedIn ? (
            <>
              <Route path="/Room" element={<Room />} />
              <Route path="/Room/NewRoom" element={<NewRoom />} />
              <Route path="/Room/NewRoom/:roomId" element={<EditRoom />} />
              <Route path="/HotelRoom" element={<HotelRoom />} />
              <Route path="/Bookings" element={<Bookings />} />
              <Route path="/Bookings/NewBooking" element={<NewBooking />} />
              <Route path="/Bookings/EditBooking/:bookingId" element={<EditBooking />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Contact/NewContact" element={<NewContact />} />
              <Route path="/Contact/NewContact/:contactId" element={<EditContact />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Users/NewUsers" element={<NewUsers />} />
              <Route path="/Users/EditUser/:userId" element={<EditUser />} />
              <Route path="*" element={<Navigate to="/Room" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </MainContent>
    </>
  );
};