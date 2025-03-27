import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './components/Menu';
import Header from './components/header';
import GlobalStyle from './components/global';
import { Room } from './Room/Room';
import Contact from './Contact/Contact';
import { ContactArchive } from './Contact/Compnents/ContactArchive';


function App() {

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Container>
          <Menu />
          <MainContent>
            <Header />
            <Routes>
              <Route path="/Room" element={<Room />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/contact/archive" element={<ContactArchive />} />
            </Routes>
          </MainContent>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App



const Container = styled.div`
  display: flex;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;