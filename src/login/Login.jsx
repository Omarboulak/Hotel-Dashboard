import React from "react";
import { Container, Headline, Box, Input, LoginButton, Text, GradientBackground } from "./loginStyled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = ({isLogin}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "123" && password === "123") {
      isLogin();
      navigate("/Room");
    } else {
      alert("El usuario no existe");
    }
  }

  return (
    <Container>
      <Headline>Login</Headline>
      <Box>
        <p>Email</p>
        <GradientBackground>
          <Input  
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
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
          />
        </GradientBackground>
      </Box>
      <LoginButton onClick={handleLogin}>Login</LoginButton>
      <Text>
        Don't have an account?<a href="#"> Sign in</a>
      </Text>
    </Container>
  )
} 