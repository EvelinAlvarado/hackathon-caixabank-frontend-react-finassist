import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SearchIcon from "@mui/icons-material/Search";
import { POLICIES } from "../constants/navigation";
import { Link } from "react-router-dom";
import bgImage from "../assets/bgmaps.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px",
        gap: "24px",
      }}
    >
      {/* Search bar */}
      <Box sx={{ width: { xs: "300px", sm: "500px" } }}>
        <Paper component="form" sx={{ width: "100%", display: "flex" }}>
          <IconButton aria-label="search">
            {/* Add the search icon here */}
            <SearchIcon />
          </IconButton>
          <InputBase placeholder="Find your branch..." sx={{ flexGrow: 1 }} />
          <Button type="submit" sx={{ fontWeight: "700" }}>
            Search
          </Button>
        </Paper>
      </Box>

      <Typography sx={{ color: "#777777" }}>
        © {new Date().getFullYear()} Personal Finance Assistant
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", color: "#777777" }}>
        <IconButton
          component="a"
          href="https://facebook.com"
          target="_blank"
          color="inherit"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://twitter.com"
          target="_blank"
          color="inherit"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://instagram.com"
          target="_blank"
          color="inherit"
        >
          <InstagramIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", color: "#777777" }}>
        <Typography
          variant="body2"
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "underline",
            color: "#777777",
          }}
        >
          {POLICIES.map((policy, index) => (
            <span key={index} style={{ display: "flex", alignItems: "center" }}>
              <Link href={policy.url}>{policy.label}</Link>
              {index < POLICIES.length - 1 && (
                <Typography sx={{ mx: 1 }}>|</Typography>
              )}
            </span>
          ))}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
