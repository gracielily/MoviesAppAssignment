import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {AuthContext} from "../../contexts/authContext";

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { token, onLogout } = useContext(AuthContext);

  let menuOptions = [
    { label: "Home", path: "/", type: "public" },
    { label: "Upcoming Movies", path: "/movies/upcoming", type: "public" },
    { label: "Top Rated Movies", path: "/movies/top", type: "public" },
    { label: "Trending Actors", path: "/trending-actors",type: "public" },
    { label: "TV Shows", path: "/tvshows", type: "public" },
    { label: "Watchlist", path: "/movies/watchlist", type: "private" },
    { label: "Favorite Movies", path: "/movies/favourites", type: "private" },
    { label: "Favorite TV Shows", path: "/tvshows/favourites", type: "private" },
    { label: "Favorite Actors", path: "/actors/favourites", type: "private" },
    { label: "Fantasy Movies", path: "/fantasy-movies", type: "private" },
    { label: "Search", path: "/search", type: "private" },
    { label: "Playlists", path: "/playlists", type: "private" },
    { label: token ? "Logout" : "Login", path: token ? "/logout" : "/login", type: "public" },
  ];

  if(!token) {
    menuOptions = menuOptions.filter((m) => m.type !== "private")
  }

  const handleMenuSelect = (pageURL) => {
    if(pageURL.includes("logout")){
      onLogout();
    } else {
    navigate(pageURL);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
          
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
