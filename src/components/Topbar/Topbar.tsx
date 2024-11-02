import { Box, Typography } from "@mui/material";
// import { LuLogOut } from "react-icons/lu";

import AccountMenu from "./AccountMenu";

import { Link } from "react-router-dom";

export const Topbar = () => {
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

      <AccountMenu />
    </Box>
  );
};
