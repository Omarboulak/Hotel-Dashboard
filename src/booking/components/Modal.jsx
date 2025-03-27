import React from "react";
import { Dialog, ModalContainer } from "../bookingStyled";

export const Modal = ({ closeModal, request }) => {
    return (
        <ModalContainer>
            <Dialog open>
                <p>{request}</p>
                <button onClick={closeModal}>Close</button>
            </Dialog>
        </ModalContainer>
    )
}