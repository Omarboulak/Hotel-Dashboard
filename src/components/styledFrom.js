import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 1rem;
  font-size: 14px;
  color: #333;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Textarea = styled.textarea`
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

export const SubmitButton = styled.button`
  padding: 0.8rem;
  background: #135846;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background: #0f3c32;
  }
`;
