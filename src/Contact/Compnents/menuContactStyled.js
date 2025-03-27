import styled from 'styled-components';


export const MenuContainer = styled.nav`
    display: flex;
    width: auto;
    margin: 4rem 0 0 2rem;

    a{
        text-decoration: none;
        font: normal normal medium 16pxPoppins;
        color: #6E6E6E; 
        border-bottom: .8px solid #6E6E6E;
        padding: 0 .5rem;
    }

    a:active{
        border-bottom: 1px solid #135846;
    }
`;
