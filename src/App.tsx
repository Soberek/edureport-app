// Layout.tsx
import { Outlet } from "react-router-dom";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import { Box } from "@mui/material";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Topbar } from "./components/Topbar/Topbar";

export default function AppLayout() {
  return (
    <Box sx={{ margin: 0, padding: 0, color: "primary.main", minHeight: "100vh", paddingLeft: 0 }} className="site-background">
      <Topbar />
      <Box display="flex">
        <SideNavbar />
        <Box sx={{ marginLeft: { xs: 0, md: "215px" }, marginTop: "50px", flex: 1, overflow: "hidden" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
