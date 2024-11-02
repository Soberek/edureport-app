import { ThemeOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

// Define your theme options
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

// Create the theme instance
export const theme = createTheme(themeOptions);
