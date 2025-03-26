import React from "react";
import styled from 'styled-components';


function Header(){
    return(

        <Container>
        <h1>ROOM LIST</h1>
        </Container>
    )
}

export default Header;

const Container = styled.div`
    padding: 1rem;
    background-color: #FFFFFF;
    width: 100%;
    h1{
        font: normal normal 600 28px/42px Poppins;
        color: #262626;

    }
`
