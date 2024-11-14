import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useLocation } from "react-router-dom";

export default function SideBarDrawer({
  open,
  toggleDrawer
}: {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}) {
  const links = [
    { path: "/miernik-excel", name: "Miernik budżetowy (excel)" },
    { path: "/miernik-app", name: "Miernik budżetowy" },
    { path: "/izrz-generator", name: "Generator IZRZ" },
    { path: "/topics-generator", name: "Generator tematów" },
    { path: "/image-generator", name: "Generator twitter" },
    { path: "/actions", name: "Akcje" }
  ];

  const { pathname } = useLocation();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
      <List>
        {links.map((link, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={link.path} selected={pathname === link.path}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Profil", "Ustawienia", "Wyloguj się"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={() => toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
