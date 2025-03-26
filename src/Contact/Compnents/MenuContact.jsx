import React from "react";
import { Link } from "react-router-dom";
import { MenuContainer } from "./menuContactStyled";

export const MenuContact = () =>{
    return(
        <MenuContainer>
            <Link to='/Contact'>All Contact</Link>            
            <Link to='/Contact/Archive'>Archivados</Link>            
        </MenuContainer>
    )
}