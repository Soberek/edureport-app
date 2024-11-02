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
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "miernik-excel",
            element: <ExcelUploader />
          },
          {
            path: "miernik-app",
            element: <MiernikApp />
          },
          {
            path: "izrz-generator",
            element: <IzrzGenerator />
          },
          {
            // Catch-all route for 404
            path: "*",
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
import IzrzGenerator from "./components/pages/IzrzGenerator.tsx";

export const themeOptions: ThemeOptions = {
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled",
        fullWidth: true,
        size: "small",
        margin: "none"
      },
      styleOverrides: {
        root: {
          padding: 0,
          fontSize: 10
        }
      }
    }
  },
  palette: {
    mode: "light",
    primary: {
      main: "#124E66",
      "100": "#E6EEF2", // Lightest shade
      "200": "#C2D5DE",
      "300": "#9EBDCA",
      "400": "#7AA4B7",
      "500": "#568BA3",
      "600": "#124E66", // Base color
      "700": "#0E3E52",
      "800": "#0B2F3D",
      "900": "#071F29" // Darkest shade
    },
    secondary: {
      main: "#2E3944" // Secondary color
    },
    text: {
      primary: "#124E66", // Primary text color
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
