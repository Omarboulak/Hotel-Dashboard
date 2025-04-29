import React from "react";
import { ImgHotelRoom } from "./components/ImgRooms";
import { RoomInfo } from "./components/RoomInfo";
import { RoomContainer } from "./components/hotelRoom";

export const HotelRoom = () =>{
    return(
        <RoomContainer>
            <RoomInfo></RoomInfo>
            <ImgHotelRoom></ImgHotelRoom>
        </RoomContainer>
    )
}