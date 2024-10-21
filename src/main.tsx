import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./App.tsx";
import ErrorPage from "./components/pages/ErrorPage.tsx";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import ExcelUploader from "./components/pages/ExcelUploader.tsx";
import Home from "./components/pages/Home.tsx";
import { Box, ChakraProvider, extendTheme, Text } from "@chakra-ui/react";
import Button from "./components/atoms/Button.tsx";
import { Login } from "./components/pages/Login.tsx";
import { ProtectedRoutesHOC } from "./components/ProtectedRoutesHOC.tsx";
import { AuthProvider } from "./context/Auth.tsx";
import MiernikApp from "./components/pages/MiernikApp.tsx";

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
        <Text mb={2}>Nie ma takiej strony 😿</Text>
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
                <Text mb={2}>Nie ma takiej strony 😿</Text>
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

const theme = extendTheme({
  colors: {
    primary: {
      100: "#212A31"
    },
    secondary: {
      100: `#2E3944`
    },
    ternary: {
      100: `#124E66`
    },
    fourth: {
      100: `#748D92`
    },
    fifth: {
      100: `#D3D9D4`
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
