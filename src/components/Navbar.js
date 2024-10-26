import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Button,
  Badge,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import CaixaBankIcon from "../assets/caixabank-icon-blue.png";
import { AUTH_LINKS, MENU_ITEMS } from "../constants/navigation";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {MENU_ITEMS.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.url}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className="md:hidden"
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </Box>
          <Avatar
            alt="CaixaBank icon"
            src={CaixaBankIcon}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          {/* Navigation links */}
          {/* Instructions:
                        - Implement navigation links for authenticated and unauthenticated users.
                        - If the user is authenticated, show links like "Dashboard", "Settings", and a "Logout" button.
                        - If the user is not authenticated, show "Login" and "Register" links. 
                        - Use the `Link` component from `react-router-dom`. */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontStyle: "italic", ml: 2 }}
          >
            CaixaBankNow
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
            {AUTH_LINKS.map((link) => (
              <Button
                key={link.label}
                /* onClick={handleCloseNavMenu} */
                component={Link}
                to={link.url}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
          <Box>
            <IconButton>
              <Badge color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* User avatar */}
            {/* Instructions:
                            - Display the user's avatar if they are logged in.
                            - Use an Avatar component and display the user's email as a tooltip or alt text. */}
          </Box>
        </Toolbar>
      </AppBar>

      {/* <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box> */}
      {/* Drawer navigation links */}
      {/* Instructions:
                        - Display navigation links inside the drawer.
                        - Links should be based on the user's authentication status.
                        - For example, show links like "Dashboard", "Transactions", "Settings" if authenticated.
                        - Use the `Link` component from `react-router-dom`. */}
      {/* </Box>
      </Drawer> */}
    </>
  );
};

export default Navbar;
