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
// import { Login } from './login/Login';
import { NewBooking } from './booking/components/NewBooking';
import { EditBooking } from './booking/components/EditBooking';
import { NewUsers } from './users/components/NewUsers';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogOut = () => {
    setIsLoggedIn(false); 
  };

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Container>
          <Menu />
          <MainContent>
            <Header  isLogOut={handleLogOut}/>
            <Routes>
            
              {/* <Route
                path="/login"
                element={<Login isLogin={() => setIsLoggedIn(true)} />}
              /> */}
             
             
                <>
                  <Route path="/Room" element={<Room />} />
                  <Route path="/HotelRoom" element={<HotelRoom />} />
                  <Route path="/Bookings" element={<Bookings />} />
                  <Route path="/Bookings/NewBooking" element={<NewBooking />} />
                  <Route path="/Bookings/EditBooking" element={<NewBooking />} />
                  <Route path="/Contact" element={<Contact />} />
                  <Route path="/Contact/archive" element={<ContactArchive />} />
                  <Route path="/Users" element={<Users />} />
                  <Route path="/Users/NewUsers" element={<NewUsers />} />
                  
                  <Route path="*" element={<Navigate to="/Room" />} />
                </>
          
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
