// Layout.tsx
import { Outlet } from "react-router-dom";
import SideNavbar from "./components/organism/SideNavbar";
import { Box, Container } from "@mui/material";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function AppLayout() {
  return (
    <Container sx={{ margin: 0, maxWidth: `100vw`, color: "primary.main", minHeight: "100vh", padding: 0 }} className="site-background">
      <Box display="flex">
        <SideNavbar />
        <Box sx={{ marginLeft: { xs: 0, md: "185px" }, flex: 1, overflow: "hidden" }}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
}
