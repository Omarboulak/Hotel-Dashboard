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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error de autenticación");
      }

      localStorage.setItem("jwtToken", data.token);
      
      dispatch({ type: "login", payload: data.email });
      
      onLogin?.();
      navigate("/Room");

    } catch (err: any) {
      setError(err.message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setError(null); 
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setError(null); 
  };

  return (
    <Container>
      <Headline>Login Hotel</Headline>
      <Box>
        <p>Email</p>
        <GradientBackground>
          <Input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={handleEmailChange}
            disabled={loading}
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
            disabled={loading}
            data-cy="password"
            data-testid="inputPassword"
          />
        </GradientBackground>
      </Box>

      <LoginButton 
        onClick={handleLogin} 
        disabled={loading}
        data-cy="sign-in" 
        data-testid="buttonLogin"
      >
        {loading ? "Cargando..." : "Login"}
      </LoginButton>
    </Container>
  );
};