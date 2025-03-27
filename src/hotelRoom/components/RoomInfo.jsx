import React from "react";
import { RoomInfoContainer } from "./hotelRoom";
import { UserData } from "./UserData";
import { RoomData } from "./RoomData";

export const RoomInfo = () => {
    return (
        <RoomInfoContainer>
           <UserData></UserData>
           <RoomData></RoomData>
        </RoomInfoContainer>
    )
}