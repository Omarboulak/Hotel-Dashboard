import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './components/Menu';
import Header from './components/header';
import GlobalStyle from './components/global';
import { Room } from './Room/Room';
import Contact from './Contact/Contact';
import { ContactArchive } from './Contact/Compnents/ContactArchive';
import { Bookings } from './booking/Bookings';
import { Users } from './users/Users';
import { HotelRoom } from './hotelRoom/HotelRoom';
import { Login } from './login/Login';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Container>
          {/* Solo muestra Menu y Header si el usuario está logueado */}
          {isLoggedIn && <Menu />}
          <MainContent>
            {isLoggedIn && <Header />}
            <Routes>
              {/* Ruta de Login */}
              <Route
                path="/login"
                element={<Login onLogin={() => setIsLoggedIn(true)} />}
              />
              {/* Rutas protegidas */}
              {isLoggedIn ? (
                <>
                  <Route path="/Room" element={<Room />} />
                  <Route path="/HotelRoom" element={<HotelRoom />} />
                  <Route path="/Bookings" element={<Bookings />} />
                  <Route path="/Contact" element={<Contact />} />
                  <Route path="/Contact/archive" element={<ContactArchive />} />
                  <Route path="/Users" element={<Users />} />
                  {/* Redirige a Room por defecto si está logueado */}
                  <Route path="*" element={<Navigate to="/Room" />} />
                </>
              ) : (
                // Si no está logueado, redirige a login
                <Route path="*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </MainContent>
        </Container>
      </BrowserRouter>
    </>
  );
}


const Container = styled.div`
  display: flex;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
