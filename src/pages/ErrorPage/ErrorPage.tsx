import { useRouteError } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

interface RouteError {
  status?: number; // Optional status code
  statusText?: string; // Optional status text
  message: string; // The error message
}

export default function ErrorPage() {
  const error: RouteError = useRouteError() as RouteError;
  console.error(error);

  return (
    <Box id="error-page" display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" p={2} sx={{ textAlign: "center" }}>
      <Typography variant="h4" component="h1">
        Oops!
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
        {error.statusText || error.message}
      </Typography>
      {/* Optional: Add a button to navigate back or refresh */}
      <Button variant="contained" color="primary" onClick={() => window.location.reload()} sx={{ mt: 3 }}>
        Refresh
      </Button>
    </Box>
  );
}
