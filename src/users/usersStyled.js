import styled from 'styled-components';

export const FullName = styled.p`
    color: #212121;
    font-family: Poppins;
    font-weigth: medium;
`

export const ID = styled.p`
    color: #393939;
    margin: .5rem 0;
    font-size: 14px;
` 
export const UserJoin = styled.p`
    color: #393939;
    font-size: 14px;
`

export const Status = styled.p`
    color: ${(props) => props.status === 'ACTIVE' ? '#5AD07A' : '#E23428'};
    font-size: 14px;
`
export const Contact = styled.div`
    span{
        margin-left: .5rem;
        font-size: 14px;
    }
`