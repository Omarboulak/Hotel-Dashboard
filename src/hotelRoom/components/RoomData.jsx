import React from "react";
import { Room, InfoRoom, Description } from "./styledRoomData";

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
        </>
    )
}
