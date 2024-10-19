import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./App.tsx";
import ErrorPage from "./components/pages/ErrorPage.tsx";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import ExcelUploader from "./components/pages/miernik_excel/ExcelUploader.tsx";
import Home from "./components/pages/Home.tsx";
import { Box, ChakraProvider, extendTheme, Text } from "@chakra-ui/react";
import Button from "./components/Button.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/miernik-excel",
        element: <ExcelUploader />
      },
      {
        path: "*",
        element: (
          <Box p={4}>
            <Text mb={2}>Nie ma takiej strony 😿</Text>
            <Link to="..">
              <Button label={`Wróć`} />
            </Link>
          </Box>
        )
      }
    ],
    errorElement: <ErrorPage />
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
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
