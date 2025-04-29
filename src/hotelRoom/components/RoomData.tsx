import React from "react";
import { Room, InfoRoom, Description, Icons, Facilities } from "./styledRoomData";
import bed from '../../assets/bed.svg'
import wifi from '../../assets/wifi.svg'
import shield from '../../assets/shield.svg'

export const RoomData = () => {
    return (
        <>
            <Room>
                <InfoRoom>
                    <p>Room Info</p>
                    <p>Deluxe Z - 002424</p>
                </InfoRoom>
                <InfoRoom>
                    <p>Price</p>
                    <p>$145 <span>/night</span></p>
                </InfoRoom>
            </Room>

            <Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </Description>

            <div>
                <Facilities>Facilities</Facilities>
                <Icons>
                    <p> <img src={bed} alt="icono de una cama" /> 3 bed Space</p>
                    <p> <img src={shield} alt="icono un escudo" /> 24 Hours guard</p>
                    <p> <img src={wifi} alt="icono de wifi" /> Free wifi</p>
                </Icons>

                <Icons>
                    <p> 3 bed Space</p>
                    <p> 24 Hours guard</p>
                    <p> Free wifi</p>
                </Icons>
            </div>
        </>
    )
}
