import { Box, Typography, Button, Alert, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
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
      <Box component={Form} onSubmit={handleUserLogin} sx={{ display: "flex", flexDirection: "column", rowGap: 2, alignItems: "center" }}>
        <TextField id="username" label="Nazwa użytkownika" variant="outlined" onChange={handleUsername} value={username} sx={{ minWidth: "100%" }} />
        <TextField type="password" id="password" label="Hasło" variant="outlined" onChange={handlePassword} value={password} sx={{ minWidth: "100%" }} />
        <Button variant="contained" sx={{ paddingY: 1 }} color="primary" type="submit">
          Zaloguj się
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginTop: 2, backgroundColor: red[100] }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};
