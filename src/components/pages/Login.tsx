import { Box, FormLabel, Input, Typography, Button, Alert } from "@mui/material";
import { Form, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { useContext, useState } from "react";
import axios from "axios";

export const Login = () => {
  const { user, setUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/miernik-excel" replace />;
  }

  const fetchUser = async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axios.post(
        "https://i-hate-my-job-backend-1.onrender.com/api/login",
        { username, password },
        {
          withCredentials: true
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user", response.data.userId);
        setUser({ user: true });
        navigate("/miernik-excel", { replace: true });
      } else {
        setError("Niewłaściwa nazwa użytkownika lub hasło 😢");
      }
    } catch (err) {
      console.log(err);
      setError("Niewłaściwa nazwa użytkownika lub hasło 😢");
    }
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleUserLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUser({ username, password });
  };

  return (
    <Box padding={4} display="flex" flexDirection="column" maxWidth="400px" marginX="auto" gap={4}>
      <Typography textAlign="center" fontWeight="bold">
        Witaj 😃
      </Typography>
      <Form onSubmit={handleUserLogin}>
        <Box display="flex" flexDirection="column" gap={2} marginBottom={4}>
          <Box>
            <FormLabel htmlFor="username">Nazwa użytkownika</FormLabel>
            <Input value={username} onChange={handleUsername} type="text" id="username" />
          </Box>
          <Box>
            <FormLabel htmlFor="password">Hasło</FormLabel>
            <Input value={password} onChange={handlePassword} type="password" id="password" />
          </Box>
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Zaloguj się
        </Button>
      </Form>

      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};
