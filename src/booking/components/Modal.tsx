import React from "react";
import { FC } from "react";
import { Dialog, ModalContainer } from "../bookingStyled";

interface ModalProp{
    closeModal: () => void,
    request: string
}

export const Modal: FC<ModalProp> = ({ closeModal, request }) => {
    return (
        <ModalContainer>
            <Dialog open>
                <p>{request}</p>
                <button onClick={closeModal}>Close</button>
            </Dialog>
        </ModalContainer>
    )
}