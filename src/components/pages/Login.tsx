import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import Button from "../atoms/Button";
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
        "http://localhost:3000/api/login",
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

  const handleUserLogin = () => {
    fetchUser({ username, password });
  };

  return (
    <Box p={4} display={`flex`} flexDirection={`column`} maxW={`400px`} mx={`auto`} gap={4}>
      <Text textAlign={`center`} fontWeight={`bold`}>
        Witaj 😃
      </Text>
      <Form onSubmit={handleUserLogin}>
        <Box display={`flex`} flexDir={`column`} gap={4} mb={4}>
          <Box>
            <FormLabel htmlFor="username">Nazwa użytkownika</FormLabel>
            <Input value={username} onChange={handleUsername} type="text" id="username" />
          </Box>
          <Box>
            <FormLabel htmlFor="password">Hasło</FormLabel>
            <Input value={password} onChange={handlePassword} type="password" id="password" />
          </Box>
        </Box>
        <Button label={`Zaloguj się`} type="submit" />
      </Form>

      {error && (
        <Box p={4} bgColor={`red.200`}>
          {error}
        </Box>
      )}
    </Box>
  );
};
