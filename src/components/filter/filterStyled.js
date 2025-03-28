import styled from 'styled-components';

export const Menu = styled.div`
    display: flex;
    width: auto;
    margin: 4rem 0 0 2rem;   
`

export const MenuButton = styled.button`
    border: 0;
    background-color: transparent;
    font: normal normal medium 16pxPoppins;
    color: ${(props) => (props.active ? "#135846" : "#6E6E6E")};
    border-bottom: ${(props) => props.active ? "2px solid #135846" : "0.2px solid #6E6E6E"};
    padding: 0 1.5rem 0.5rem;
    padding: 0 1.5rem .5rem;
`
