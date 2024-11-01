import { Box, List, ListItem, ListItemText, useTheme } from "@mui/material";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

export default function SideNavbar() {
  const { pathname } = useLocation();

  const theme = useTheme();

  const links: { path: string; name: string }[] = [
    { path: "/miernik-excel", name: "Miernik budżetowy (excel)" },
    { path: "/miernik-app", name: "Miernik budżetowy" },
    { path: "/izrz-generator", name: "Generator IZRZ" }
  ];

  return (
    <Box
      component="nav"
      display={{ xs: "none", md: "block" }}
      position="fixed"
      minHeight="100vh"
      width={{ xs: "0", md: "185px" }}
      borderRight={2}
      borderColor="gray.300"
      marginTop="50px"
      p={2}
      boxShadow={theme.shadows[1]}
    >
      <List>
        {links.map((link, idx) => (
          <StyledLink key={idx} path={link.path} pathname={pathname} name={link.name} />
        ))}
      </List>
    </Box>
  );
}

const StyledLink = ({ path, pathname, name }: { path: string; pathname: string; name: string }) => {
  const isActive = pathname === path;

  return (
    <ListItem
      component={ReactRouterLink}
      to={path}
      sx={{
        p: 0,
        textDecoration: isActive ? "underline" : "none",
        color: isActive ? "primary.900" : "primary.600",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.08)", // Light hover effect
          color: "primary.main",
          fontWeight: "bold"
        }
      }}
    >
      <ListItemText primary={name} />
    </ListItem>
  );
};
