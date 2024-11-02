import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { theme } from "./styles/theme.ts";
import { AuthProvider } from "./context/Auth.tsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { router } from "./routes/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
