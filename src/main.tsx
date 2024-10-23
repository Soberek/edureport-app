import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./App.tsx";
import ErrorPage from "./components/pages/ErrorPage.tsx";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import ExcelUploader from "./components/pages/ExcelUploader.tsx";
import Home from "./components/pages/Home.tsx";

import Button from "./components/atoms/Button.tsx";
import { Login } from "./components/pages/Login.tsx";
import { ProtectedRoutesHOC } from "./components/ProtectedRoutesHOC.tsx";
import { AuthProvider } from "./context/Auth.tsx";
import MiernikApp from "./components/pages/MiernikApp.tsx";
import { Box, createTheme, TextField, ThemeProvider } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "*",
    element: (
      <Box p={4}>
        <TextField sx={{ marginBottm: 2 }}>Nie ma takiej strony 😿</TextField>
        <Link to="..">
          <Button label={"Wróć"} />
        </Link>
      </Box>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "",
    element: <ProtectedRoutesHOC />,
    children: [
      {
        path: "/", // Main route
        element: <AppLayout />,
        children: [
          {
            path: "miernik-excel", // Specific route
            element: <ExcelUploader />
          },
          {
            path: "miernik-app",
            element: <MiernikApp />
          },
          {
            path: "*", // Catch-all route for 404
            element: (
              <Box p={4}>
                <TextField sx={{ marginBottom: 2 }}>Nie ma takiej strony 😿</TextField>
                <Link to="..">
                  <Button label={"Wróć"} />
                </Link>
              </Box>
            )
          }
        ]
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]);

/*
#212A31
#2E3944
#124E66
#748D92
#D3D9D4
*/

import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#124E66" // Primary color
    },
    secondary: {
      main: "#2E3944" // Secondary color
    },
    background: {
      default: "#212A31", // Background color
      paper: "#2E3944" // Paper color (like card backgrounds)
    },
    text: {
      primary: "#D3D9D4", // Primary text color
      secondary: "#748D92" // Secondary text color
    }
  }
};

const theme = createTheme(themeOptions);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
