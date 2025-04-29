import React, {FC} from "react";
import { Link } from 'react-router-dom';
import { MenuContainer, Logo, Name, StyledMenu, User, UserName, UserGmail, Trav, Copy, Made } from './menuStyled'
import hotel from '../../assets/hotel.svg'
import puzzle from '../../assets/puzzle.svg'
import calendar from '../../assets/calendar.svg'
import user from '../../assets/user.svg'
import key from '../../assets/key.svg'


export const Menu: FC = () =>{
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


