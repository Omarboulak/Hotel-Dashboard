import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import hotel from '../assets/hotel.svg'
import puzzle from '../assets/puzzle.svg'
import calendar from '../assets/calendar.svg'
import user from '../assets/user.svg'
import key from '../assets/key.svg'


function Menu() {
    return (
        <MenuContainer>
            <Logo>
                <img src={hotel} alt="" />
                <Name>
                    <p>Trav</p>
                    <p>Hotel Admin Dashboard</p>
                </Name>
            </Logo>


            <StyledMenu>
                <li>
                    <Link to="/">
                        <img src="" alt="Dashboard icon" />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/room">
                        <img src={key} alt="Room icon" />
                        Room
                    </Link>
                </li>
                <li>
                    <Link to="/bookings">
                        <img src={calendar} alt="Bookings icon" />
                        Bookings
                    </Link>
                </li>
                <li>
                    <Link to="/Users">
                        <img src={user} alt="Guest icon" />
                        Users
                    </Link>
                </li>
                <li>
                    <Link to="/Contact">
                        <img src={puzzle} alt="Concierge icon" />
                        Contact
                    </Link>
                </li>
                <li>
                    <Link to="/HotelRoom">
                        <img src={puzzle} alt="Concierge icon" />
                        RoomInfo
                    </Link>
                </li>


                <User>
                    <img src={calendar} alt="" />
                    <UserName>Omar Boulakchour</UserName>
                    <UserGmail>omarboulakchour@gmail.com</UserGmail>
                    <button>Contact Us</button>
                </User>

                <Trav>Travl Hotel Admin Dashboard</Trav>
                <Copy>© 2020 All Rights Reserved</Copy>

                <Made>Made with ♥ by Peterdraw</Made>

            </StyledMenu>
        </MenuContainer>
    );
}

export default Menu;

const MenuContainer = styled.div`
    width: 20%;
    background-color: #FFFFFF;
    box-shadow: 13px 3px 40px #00000005;
`;

const StyledMenu = styled.ul`
    list-style-type: none;
    padding: 0;

    li {
        display: flex;
        align-items: center;
        margin: 10px 0;
        font-size: 18px;
        font-family: Poppins;
        color: #799283;
        padding: 1rem 0 1rem 2rem;

        a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: inherit;
        }

        img {
            margin-right: 10px;
            width: 28px;
            height: 28px;
            /* El atributo fill no se aplica directamente en un <img>, 
               si necesitas cambiar el color del SVG, importa el SVG como componente o usa otra técnica */
        }
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center; 
    gap: 10px; 
    padding: 2rem;
`;

const Name = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p:first-child {
        font-size: 20px;
        font-weight: bold;
        color: #000;
    }

    p:last-child {
        font: normal normal 300 12px Poppins;
        color: #5D5449;
    }
`;

const Trav = styled.p`
    margin: 2rem 0 0.5rem;
    font: normal normal 600 16px Poppins;
    color: #212121;
    padding-left: 2rem;
`;

const Copy = styled.p`
    font: normal normal 300 14px Poppins;
    color: #799283;
    padding-left: 2rem;
`;

const Made = styled.p`
    font: normal normal 300 14px Poppins;
    color: #799283;
    margin-top: 3rem;
    padding-left: 2rem;
`;

const User = styled.div`
    text-align: center;
    margin: 2rem auto 3rem;
    padding: 0.5rem;
    width: 70%;
    box-shadow: 0px 20px 30px #00000014;
    border-radius: 18px;

    img {
        height: 70px;
        width: 70px;
    }

    button {
        font: normal normal 600 14px/21px Poppins;
        color: #135846;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        background-color: #EBF1EF;
        margin-top: 1rem;
        border: 0;
    }
`;

const UserName = styled.p`
    font: normal normal medium 16px Poppins;
    color: #393939;
    margin: 0.5rem 0;
`;

const UserGmail = styled.p`
    font: normal normal 300 12px Poppins;
    color: #B2B2B2;
`;