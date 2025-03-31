import React from "react";
import { Container, Headline, Box, Input, LoginButton, Text, GradientBackground } from "./loginStyled";

export const Login = () => {
    return (
        <Container>
        <Headline>Login</Headline>
        <Box>
          <p>Email</p>
          <GradientBackground>
            <Input type="text" placeholder="Enter your Email" />
          </GradientBackground>
        </Box>
        <Box>
          <p>Password</p>
          <GradientBackground>
            <Input type="password" placeholder="Enter your Password" />
          </GradientBackground>
        </Box>
        <LoginButton>Login</LoginButton>
        <Text>
          Don't have an account?<a href="#"> Sign in</a>
        </Text>
      </Container>
    )
} 