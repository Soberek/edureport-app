import { Box, Button, Typography } from "@mui/material";
// import { LuLogOut } from "react-icons/lu";
import { useContext } from "react";
import AuthContext from "../../context/Auth";

import { Link, useNavigate } from "react-router-dom";

export const Topbar = () => {
  const navigate = useNavigate();
  const { logout, username } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Box
      bgcolor={"primary.main"}
      sx={{ display: "flex", minWidth: "100vw", alignItems: "center", position: "fixed", zIndex: 100, justifyItems: ``, minHeight: "40px", px: 2 }}
    >
      <Typography
        sx={{
          color: "primary.100",
          fontSize: 17,
          ":hover": {
            fontWeight: "bold"
          }
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          EduReport
        </Link>
      </Typography>

      <Typography
        sx={{
          ml: "auto",
          mr: 2,
          color: "primary.100",
          fontSize: 13,
          ":hover": {
            fontWeight: "bold"
          }
        }}
      >
        Zalogowany jako: {username}
      </Typography>

      <Button
        variant="outlined"
        sx={{
          color: "primary.100",
          backgroundColor: "primary.700",
          mr: 6,
          // ml: 2,
          px: 1,
          fontSize: 12,
          ":hover": {
            transform: `scale(1.1)`
          }
        }}
        onClick={handleLogout}
      >
        Wyloguj
      </Button>
    </Box>
  );
};
