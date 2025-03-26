import styled from 'styled-components';

export const TableContainer = styled.div`
    table{
        width: 95%;
        background: #FFFFFF;
        box-shadow: 0px 4px 4px #00000005;
        border-radius: 20px;
        margin: 4rem auto;
        padding: 1rem;

        td{
            padding: 1.5rem;
        }
        
        thead{
            padding:1rem;
            border-bottom: 1px solid black;        
        }
    }

    .swiper {
        .swiper-button-next {
            padding: 1.5rem;
            bottom: 1rem;
            top: inherit;
            right: .6rem !important;
           
        }

        .swiper-button-prev {
            bottom: 1rem;
            top: inherit;
            right: 5.6rem ;
            left: inherit;
        }
            
        .swiper-button-prev, .swiper-button-next{
            border: 1px solid #135846;
            padding: 0.5rem 1rem;
            
            border-radius: 12px;
        }

        .swiper-button-prev::after, .swiper-button-next::after {
            font: normal normal normal 16px Poppins;
            color: #135846;
            content: '';
        }
    }
`;


