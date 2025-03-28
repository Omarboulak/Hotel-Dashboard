import styled from 'styled-components';

export const BookingUser = styled.div`
    span{
        padding-right: .3rem;
    }
`

export const RoomId = styled.p`
    display: block;
    color: #799283;
    font-size: 12px;
`

export const Dialog = styled.dialog`
    padding:3rem 1rem 2rem; 
    position: relative;
    width: 40%;

    button{
        border:.7px solid #135846;
        padding: .5rem 1rem;
        background-color: #EEF9F2;
        position: absolute;
        top: .5rem;
        right: .5rem;
    }
`

export const ButtonModal = styled.button`
    background-color: #EEF9F2;
    padding: 0.5rem 1rem;
    font: normal normal medium 16px/25px Poppins;
    color: #212121;
    border-radius: 14px;
    border: 0.5px solid;
`   

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000080;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    text-align: left;
`

export const StatusBooking = styled.p`
  background-color: ${(props) => props.status === 'Check In' ? '#E8FFEE' : props.status === 'Check Out' ? '#FFEDEC' : '#f8f9bb'};
  color: ${(props) => props.status === 'Check In' ? '#5AD07A' : props.status === 'Check Out' ? '#E23428' : '#615b06'};
  padding: .5rem 1rem;
  border-radius: 12px;
  text-align: center;
`

export const Menu = styled.div`
    display: flex;
    width: auto;
    margin: 4rem 0 0 2rem;

    button{
        border: 0;
        background-color: transparent;
        font: normal normal medium 16pxPoppins;
        color: #6E6E6E; 
        border-bottom: .2px solid #6E6E6E;
        padding: 0 1.5rem .5rem;
        color: ${props => (props.active ? '#135846' : '#6E6E6E')};
        border-bottom: ${props => (props.active ? '2px solid #135846' : '.2px solid #6E6E6E')};
    }
` 
