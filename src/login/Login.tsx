import React, { useState, ChangeEvent, FC } from "react";
import { Container, Headline, Box, Input, LoginButton, Text, GradientBackground } from "./loginStyled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/loginContext";

interface LoginProps {
  onLogin?: () => void;
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (): void => {
    if (email === "123" && password === "123") {
      dispatch({ type: "login", payload: email });
      onLogin?.();
      navigate("/Room");
    } else {
      alert("El usuario no existe");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <Headline>Login Hotel</Headline>
      <Box>
        <p>Email</p>
        <GradientBackground>
          <Input
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={handleEmailChange}
            data-cy="email"
            data-testid="inputEmail"
          />
        </GradientBackground>
      </Box>
      <Box>
        <p>Password</p>
        <GradientBackground>
          <Input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={handlePasswordChange}
            data-cy="password"
            data-testid="inputPassword"
          />
        </GradientBackground>
      </Box>
      <LoginButton onClick={handleLogin} data-cy="sign-in" data-testid="buttonLogin">
        Login
      </LoginButton>
      <Text>
        Don't have an account?<a href="#"> Sign up</a>
      </Text>
    </Container>
  );
};
