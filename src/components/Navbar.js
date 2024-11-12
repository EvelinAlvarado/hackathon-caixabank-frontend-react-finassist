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
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import CaixaBankIconBlue from "../assets/caixabank-icon-blue.png";
import CaixaBankIcon from "../assets/caixabank-icon.png";
import { AUTH_LINKS, MENU_ITEMS } from "../constants/navigation";
import { authStore, logout } from "../stores/authStore";
import { useStore } from "@nanostores/react";
import { budgetAlertStore, resetBudgetAlert } from "../stores/budgetAlertStore";
import NotificationPopup from "./NotificationPopup";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useStore(authStore);
  const budgetAlert = useStore(budgetAlertStore);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(budgetAlert.isVisible);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    resetBudgetAlert();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const avatarLetter =
    isAuthenticated && currentUser?.email
      ? currentUser.email[0].toUpperCase()
      : "";

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {isAuthenticated ? (
        <List>
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton component={Link} to={item.url}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem key="Logout" disablePadding>
            <ListItemButton
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          {AUTH_LINKS.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton component={Link} to={item.url}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "background.default" }}>
        <Toolbar>
          <Box
            sx={{
              display: {
                xs: "flex",
                ...(isAuthenticated ? { lg: "none" } : { md: "none" }),
              },
            }}
          >
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
            className="App-logo"
            alt="CaixaBank icon"
            src={isDarkMode ? CaixaBankIcon : CaixaBankIconBlue}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          {/* Navigation links */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontStyle: "italic",
              ml: 2,
              color: "text.primary",
            }}
          >
            CaixaBankNow
          </Typography>

          {isAuthenticated ? (
            /* Menu links for desktop screen */
            <Box sx={{ display: { xs: "none", lg: "flex" }, mr: 2 }}>
              {MENU_ITEMS.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  to={link.url}
                  sx={{
                    my: 2,
                    display: "block",
                    color: "text.primary",
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Divider orientation="vertical" variant="middle" flexItem />
              <Button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                sx={{
                  my: 2,
                  display: "block",
                  color: "text.primary",
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
              {AUTH_LINKS.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  to={link.url}
                  sx={{
                    display: "block",
                    color: "text.primary",
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex" }}>
            {isAuthenticated && (
              <IconButton
                sx={{ paddingRight: { md: 2 } }}
                onClick={handleClick}
              >
                <Badge
                  color="error"
                  variant="dot"
                  invisible={budgetAlert.notificationCount === 0}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}
            {/* Dark/light Mode   */}
            <IconButton
              aria-label="Toggle Theme"
              onClick={toggleTheme}
              sx={{ paddingRight: { md: 2 } }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            {isAuthenticated && (
              <IconButton>
                <Avatar alt={currentUser.email}>{avatarLetter}</Avatar>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {budgetAlert.isVisible && (
        <NotificationPopup
          open={open}
          message={budgetAlert.message}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default Navbar;
