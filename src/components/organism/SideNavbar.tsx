import { Box, Button, List, ListItem, ListItemText, useTheme } from "@mui/material";
import { Link as ReactRouterLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

export default function SideNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const theme = useTheme();

  const links: { path: string; name: string }[] = [
    { path: "/", name: "Strona główna" },
    { path: "/miernik-excel", name: "Miernik budżetowy (excel)" },
    { path: "/miernik-app", name: "Miernik budżetowy" }
  ];

  const handleLogout = async () => {
    localStorage.removeItem("user");
    setUser({ user: false });
    navigate("/login", { replace: true });
  };

  return (
    <Box
      component="nav"
      display={{ xs: "none", md: "block" }}
      position="fixed"
      minHeight="100vh"
      width={{ xs: "0", md: "185px" }}
      borderRight={2}
      borderColor="gray.300"
      p={2}
      boxShadow={theme.shadows[1]}
    >
      <List>
        {links.map((link, idx) => (
          <StyledLink key={idx} path={link.path} pathname={pathname} name={link.name} />
        ))}
      </List>
      <Button variant="contained" color="primary" fullWidth onClick={handleLogout}>
        Wyloguj
      </Button>
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
        textDecoration: isActive ? "underline" : "none",
        fontWeight: isActive ? "bold" : "normal",
        color: isActive ? "primary.main" : "text.secondary",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.08)", // Light hover effect
          color: "primary.main"
        }
      }}
    >
      <ListItemText primary={name} />
    </ListItem>
  );
};
