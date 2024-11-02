import AppLayout from "./../App.tsx";
import ErrorPage from "./../pages/ErrorPage/ErrorPage.tsx";
import { createBrowserRouter, Link } from "react-router-dom";
import ExcelUploader from "./../pages/ExcelUploader/ExcelUploader.tsx";
import Home from "./../pages/Home/Home.tsx";

import Button from "./../components/Button/Button.tsx";
import { Login } from "./../pages/Login/Login.tsx";
import { ProtectedRoutesHOC } from "./../HOC/ProtectedRoutesHOC.tsx";
import MiernikApp from "./../pages/MiernikApp/MiernikApp.tsx";
import { Box, TextField } from "@mui/material";
import TopicsGenerator from "./../pages/TopicsGenerator/TopicsGenerator.tsx";

import IzrzGenerator from "./../pages/IzrzGenerator/IzrzGenerator.tsx";

export const router = createBrowserRouter([
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
            path: "topics-generator",
            element: <TopicsGenerator />
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
