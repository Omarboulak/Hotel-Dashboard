import React, { useState } from "react";
import { Container, Headline, Box, Input, LoginButton, Text, GradientBackground } from "./loginStyled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/loginContext";  

export const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "123" && password === "123") {
      dispatch({ type: "login", payload: { email } });
      onLogin?.();
      navigate("/Room");
    } else {
      alert("El usuario no existe");
    }
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
            onChange={(e) => setEmail(e.target.value)} 
            data-cy='email'
            data-testid="inputEmail"/>
        </GradientBackground>
      </Box>
      <Box>
        <p>Password</p>
        <GradientBackground>
          <Input  
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-cy='password'
            data-testid="inputPassword"
          />
        </GradientBackground>
      </Box>
      <LoginButton 
        onClick={handleLogin} 
        data-cy='sign-in' 
        data-testid="buttonLogin">Login</LoginButton>
      <Text>
        Don't have an account?<a href="#">Sig in</a>
      </Text>
    </Container>
  );
};
