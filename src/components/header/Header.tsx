import React, { FC } from "react";
import logOut from '../../assets/log-out.svg'
import { Container } from "./headerStyled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../login/context/loginContext";

export const Header: FC = () => {
    const navigate = useNavigate();
    const {dispatch} = useAuth();
    const handleLogOut = () => {
        dispatch({ type: 'logout' });
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


