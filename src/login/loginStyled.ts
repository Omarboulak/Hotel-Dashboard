import styled from "styled-components";

export const Container = styled.div`
    width: 25rem;
    background: #0f0f0f;
    color: #FFFFFF;
    padding: 2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px;
    margin: 5rem auto
`;

export const Headline = styled.p`
    margin-bottom: 0.5em;
    font-size: 2rem;
    font-family: 'Poppins';
`;

export const Box = styled.div`
    margin: 0.2em 0;

    p {
        color: rgba(255, 255, 255, 0.781);
        font-family: 'Poppins';
    }
`;

export const GradientBackground = styled.div`
    width: 100%;
    height: 40px;
    position: relative;
    margin: 0.5em 0;

    ::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 102%;
        height: 105%;
        border-radius: 10px;
        background: linear-gradient(to right, #ff416c, #ff4b2b);
        z-index: 0;
    }
`;

export const Input = styled.input`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(19, 19, 19);
    border: none;
    outline: none;
    padding-left: 0.8em;
    color: #fff;
    border-radius: 10px;
    transition: all 0.4s;
    z-index: 1;

    ::placeholder {
        color: rgba(255, 255, 255, 0.6);
    }

    &:focus::placeholder {
        color: #ffffff;
    }
`;

export const LoginButton = styled.button`
    width: 105%;
    height: 40px;
    border: none;
    margin: 0.5em 0;
    border-radius: 10px;
    transform: translate(-1%);
    background: linear-gradient(to right, #ff416c, #ff4b2b);
    color: #fff;
    cursor: pointer;
    transition: all 0.4s;
    font-family: 'Poppins';

    &:hover {
        box-shadow: 0 0 10px #ff415d56;
        transform: translate(-1%, 5%);
    }
`;

export const Text = styled.p`
    font-size: 0.8em;
    margin-top: 0.8em;
    text-align: center;
    color: rgba(255, 255, 255, 0.623);

    a {
        color: rgba(255, 255, 255, 0.911);
        text-decoration: none;
        position: relative;
        left: 3px;
    }
`;
