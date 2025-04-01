import React from "react";
import styled from 'styled-components';
import logOut from '../assets/log-out.svg'
import { useNavigate } from "react-router-dom";

function Header({ onLogOut }) {
    const navigate = useNavigate();

    const handleLogOut = () => {
        onLogOut();
        navigate("/login");
    }

    return (
        <Container>
            <h1>ROOM LIST</h1>
            <button onClick={handleLogOut}>
                <img src={logOut} alt="icono cerrar sesion" />
            </button>
        </Container>
    )
}

export default Header;

const Container = styled.div`
    padding: 1rem;
    background-color: #FFFFFF;
    width: 100%;
    display: flex;
    justify-content: space-around;

    h1{
        font: normal normal 600 28px/42px Poppins;
        color: #262626;
    }

    button{
        background-color: transparent;
        border: none;
        
        img{
            heigth: 30px;
            width: 30px;
        }
    }
`
