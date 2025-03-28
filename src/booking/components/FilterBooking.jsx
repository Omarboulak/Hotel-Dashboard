import React from "react";
import { Menu } from "../bookingStyled";

export const FilterBooking = ({filter}) =>{
    return(
        <Menu>
            <button onClick={() => filter('All')}>All</button>
            <button onClick={() => filter('Check In')}>Check in</button>
            <button onClick={() => filter('Check Out')}>Check out</button>
            <button onClick={() => filter('In Progress')}>Pending</button>
        </Menu>
    )
}