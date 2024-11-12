import { Box, Typography } from "@mui/material";
// import { LuLogOut } from "react-icons/lu";

import AccountMenu from "./AccountMenu";

import { Link } from "react-router-dom";
import SideBarDrawer from "../SideBarDrawer/SideBarDrawer";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";

export const Topbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Box
      bgcolor={"primary.main"}
      sx={{
        display: "flex",
        minWidth: "100vw",
        alignItems: "center",
        position: "fixed",
        zIndex: 100,
        justifyItems: ``,
        minHeight: "40px",
        px: 2
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          onClick={() => {
            toggleDrawer(true);
          }}
          sx={{ color: "white", cursor: "pointer" }}
        >
          <CiMenuBurger size={25} />
        </Box>
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
      </Box>

      <AccountMenu />

      <SideBarDrawer open={open} toggleDrawer={toggleDrawer} />
    </Box>
  );
};
