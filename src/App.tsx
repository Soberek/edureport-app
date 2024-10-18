// Layout.tsx
import { Outlet } from "react-router-dom";
import SideNavbar from "./components/pages/SideNavbar";
import { Box, Container } from "@chakra-ui/react";

export default function AppLayout() {
  return (
    <Container maxWidth="100vw" textColor={`primary.100`} minHeight={`100vh`} bg="fifth.100" margin={0} padding={0}>
      <Box display="flex">
        <SideNavbar />
        <Box marginLeft={{ base: "0", md: "185px" }} flex={1} overflow={`hidden`}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
}
