import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import Button from "./Button";
import { Form, Navigate } from "react-router-dom";
import { AuthContext } from "../services/Auth";
import { useContext } from "react";

export const Login = () => {
  const auth = useContext(AuthContext);

  if (auth.user) return <Navigate to="/miernik-excel" replace />;

  const handleUserLogin = () => {
    auth.setUser({ user: true });
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
            <Input type="text" id="username" />
          </Box>
          <Box>
            <FormLabel htmlFor="password">Hasło</FormLabel>
            <Input type="password" id="password" />
          </Box>
        </Box>
      </Form>
      <Button label={`Zaloguj się`} onClick={() => handleUserLogin()} />
    </Box>
  );
};
