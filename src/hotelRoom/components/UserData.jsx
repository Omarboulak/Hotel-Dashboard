import React from "react";
import {InfoUser, Name, ID, Call, Message, ImgUser, Check, InfoCheck, Linea } from "./hotelRoom";
import phone from '../../assets/phone.svg';
import message from '../../assets/message.svg'

export const UserData = () => {

    return (
        <>
            <InfoUser>
                <ImgUser></ImgUser>
                <div>
                    <Name>Roberto Mansini</Name>
                    <ID>ID 1234124512551</ID>
                    <Call><img src={phone} alt="icono de un telefono" /></Call>
                    <Message> <img src={message} alt="icono de un mensaje" /> Send Message</Message>
                </div>
            </InfoUser>

            <Check>
                <InfoCheck>
                    <p>Check in</p>
                    <p>October 30th, 2020 | 08:30</p>
                </InfoCheck>
                <InfoCheck>
                    <p>Check out</p>
                    <p>November 2th, 2020</p>
                </InfoCheck>
            </Check>

            <Linea/>
        </>
    )
}