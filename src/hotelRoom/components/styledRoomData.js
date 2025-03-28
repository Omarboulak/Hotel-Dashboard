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
    margin: 2rem 0 2rem;
`
export const Facilities = styled.p`
    font-size: 14px;
    color: #6E6E6E;
    margin-bottom: 1rem;
`

export const Icons = styled.div`
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom:1rem;

    p{
        background-color: #EBF1EF;
        color: #135846;
        border-radius: 8px;
        padding: 0.5rem 1rem;
    
        img{
            width: 20px;
            height:20px
        }
    }
`
