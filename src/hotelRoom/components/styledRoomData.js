import styled from 'styled-components';


export const Room = styled.div`
    display:flex;
`

export const InfoRoom = styled.div`
    width: 50%;
    
    p:first-of-type{
        font-size: 14px;
        color: #6E6E6E;
        margin-bottom: 1rem;
    }
    
    p:last-of-type{
        font-size: 24px;
        color: #212121;

        span{
            font-size: 14px;
            color: #799283;
            margin-right: .5rem;
        }
    }
`

export const Description = styled.p`
    color: #363636;
    font-size: 14px;
    margin-top: 2rem;
`