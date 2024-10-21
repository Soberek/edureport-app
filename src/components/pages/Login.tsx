import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import Button from "../atoms/Button";
import { Form, Navigate } from "react-router-dom";
import { AuthContext } from "../../services/Auth";
import { useContext, useState } from "react";

export const Login = () => {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  if (auth.user) return <Navigate to="/miernik-excel" replace />;

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setUsername(value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPassword(value);
  };

  const handleUserLogin = () => {
    if (username === "12345" && password === "12345") {
      auth.setUser({ user: true });
    }

    setError("Nazwa użytkownika lub hasło jest błędne. 😿");
  };

  return (
    <Box p={4} display={`flex`} flexDirection={`column`} maxW={`400px`} mx={`auto`} gap={4}>
      <Text textAlign={`center`} fontWeight={`bold`}>
        Witaj 😃
      </Text>
      <Form>
        <Box display={`flex`} flexDir={`column`} gap={4}>
          <Box>
            <FormLabel htmlFor="username">Nazwa użytkownika</FormLabel>
            <Input value={username} onChange={handleUsername} type="text" id="username" />
          </Box>
          <Box>
            <FormLabel htmlFor="password">Hasło</FormLabel>
            <Input value={password} onChange={handlePassword} type="password" id="password" />
          </Box>
        </Box>
      </Form>
      <Button label={`Zaloguj się`} onClick={() => handleUserLogin()} />

      {error && (
        <Box p={4} bgColor={`red.200`}>
          {error}
        </Box>
      )}
    </Box>
  );
};
