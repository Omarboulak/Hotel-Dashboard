import styled from 'styled-components';

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ID = styled.span`
  font-family: 'Poppins';
  font-size: 14px;
  color: #799283;
  font-weight: 300;
`;

export const RoomNumber = styled.span`
  font-family: 'Poppins';
  font-size: 16px;
  color: #212121;
  font-weight: 500;
`;

export const Status = styled.p`
  color: #FFFFFF;
  background-color: ${(props) => props.status === 'Available' ? '#5AD07A' : '#E23428'};
  padding: .5rem 1rem;
  border-radius: 12px;
  text-align: center;
`;
