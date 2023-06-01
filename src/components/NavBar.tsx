import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

interface NavLink {
  name: string;
  path: string;
}

const NavBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = async () => {
    await signOut();
  };

  const navLinksConnected: NavLink[] = [
    { name: "Build CV", path: "/build-cv" },
    { name: "History", path: "/history" },
  ];

  const navLinksDissconnected: NavLink[] = [
    {name: 'Login', path: "/login"},
   { name: 'Signup', path: '/signup'}
  ];

  const navLinks = session ? navLinksConnected : navLinksDissconnected;

  const renderNavLinks = (color: "inherit", logoutButton = false) =>
    navLinks
      .map((link: NavLink) => (
        <ListItem key={link.name}>
          <Link href={link.path} passHref>
            <Button
              color={color}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "#404040",
                whiteSpace: "nowrap",
              }}
            >
              {link.name}
            </Button>
          </Link>
        </ListItem>
      ))
      .concat(
        logoutButton && session ? (
          <ListItem key="logout">
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "red",
                bgcolor: "transparent",
                border: "none",
                "&:hover": { bgcolor: "transparent" },
                whiteSpace: "nowrap",
              }}
              onClick={logout}
            >
              Logout
            </Button>
          </ListItem>
        ) : (
          []
        )
      );

  const drawer = (
    <div>
      <List>{renderNavLinks("inherit", true)}</List>
    </div>
  );

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Link href="/" passHref>
          <Button>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "#404040" }}>
              CV Builder App
            </Typography>
          </Button>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {renderNavLinks("inherit")}
            {session && <Button
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "red",
                bgcolor: "transparent",
                border: "none",
                "&:hover": { bgcolor: "transparent" },
                whiteSpace: "nowrap",
              }}
              onClick={logout}
            >
              Logout
            </Button>
            }
          </Box>
        )}
        {isMobile && (
          <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}
        <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
