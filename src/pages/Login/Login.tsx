import { Box, Typography, Button, TextField } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../context/Auth";
import { useContext } from "react";
import axios from "axios";

import { Form, Field, Formik, ErrorMessage } from "formik";
import { useLogin } from "./useLogin";

const API_URL = import.meta.env.VITE_API_URL;

export const Login = () => {
  const { login, is_authenticated } = useContext(AuthContext);

  const { validationSchema, initial_login_values } = useLogin();

  const navigate = useNavigate();

  if (is_authenticated) {
    return <Navigate to="/miernik-excel" replace />;
  }

  const fetchUser = async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/login`,
        { username, password },
        {
          withCredentials: true
        }
      );

      if (response.status === 200) {
        const token: string = response.data.token;
        login(token, username);
        navigate("/miernik-excel", { replace: true });
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box padding={4} display="flex" flexDirection="column" maxWidth="400px" marginX="auto" gap={4}>
      <Typography textAlign="center" fontWeight="bold">
        Witaj 😃
      </Typography>

      <Box>
        <Typography textAlign="center">Test user: login: admin - password: admin</Typography>
      </Box>
      <Formik initialValues={initial_login_values} validationSchema={validationSchema} onSubmit={(values) => fetchUser(values)}>
        {({ touched, errors }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
              <Field
                as={TextField}
                id="username"
                name="username"
                label="Nazwa użytkownika"
                variant="outlined"
                sx={{ minWidth: "100%" }}
                error={touched.username && Boolean(errors.username)}
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                type="password"
                id="password"
                name="password"
                label="Hasło"
                variant="outlined"
                sx={{ minWidth: "100%" }}
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
              />
              <Button variant="contained" sx={{ paddingY: 1 }} color="primary" type="submit">
                Zaloguj się
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
