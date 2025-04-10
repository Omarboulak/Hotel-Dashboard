import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth  } from './login/context/loginContext'; 
import { Container, MainContent } from './components/global';
import Menu from './components/Menu';
import { Header } from './components/header/Header';
import GlobalStyle from './components/global';
import { Room } from './Room/Room';
import Contact from './Contact/Contact';
import { ContactArchive } from './Contact/Compnents/ContactArchive';
import { Bookings } from './booking/Bookings';
import { Users } from './users/Users';
import { HotelRoom } from './hotelRoom/HotelRoom';
import { NewBooking } from './booking/components/NewBooking';
import { EditBooking } from './booking/components/EditBooking';
import { NewUsers } from './users/components/NewUsers';
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
              <Route path="/HotelRoom" element={<HotelRoom />} />
              <Route path="/Bookings" element={<Bookings />} />
              <Route path="/Bookings/NewBooking" element={<NewBooking />} />
              <Route path="/Bookings/EditBooking/:bookingId" element={<EditBooking />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Contact/archive" element={<ContactArchive />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Users/NewUsers" element={<NewUsers />} />
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