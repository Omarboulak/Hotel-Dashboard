import styled from 'styled-components';

export const RoomContainer = styled.div`
    display: flex;
    width: 90%;
    margin: 4rem auto;
    background-color: #FFFFFF
`

export const Images = styled.div`
    background-color: #C5C5C5;
    width: 50%;
`

export const RoomInfoContainer = styled.div`
    padding: 1rem;
    width: 50%;
`

export const InfoUser = styled.div`
    display: flex;
    margin-bottom: 1.5rem;
`

export const Name = styled.p`
    font-size: 30px;
    font-weight: 600;
    color: #212121;
`

export const ID = styled.p`
    font-size: 14px;
    color: #799283;
    margin: 1rem;
`

export const Call = styled.button`
    padding: 1rem;
    margin-right: 1rem;
    border: 1px solid #E8F2EF;
    border-radius: 12px;
    background-color: transparent;
`

export const Message = styled.button`
    background-color: #135846;
    color: #FFFFFF;
    padding: 0.5rem 1rem;
    border-radius: 12px;

    img{
        margin-right: 1rem;
    }
`

export const ImgUser = styled.div`
    background-color: #C5C5C5;
    width: 9rem;
    margin-right: 1rem
`

export const Check = styled.div`
    display:flex;
`

export const InfoCheck = styled.div`
    width: 50%;
    
    p:first-of-type{
        font-size: 14px;
        color: #6E6E6E;
        margin-bottom: 1rem;
    }
    
    p:last-of-type{
        font-size: 16px;
        color: #212121;
    }
`
export const Linea = styled.hr`
    border: none;
    border-top: 1px solid #6E6E6E;
    margin: 2rem 0;
`


