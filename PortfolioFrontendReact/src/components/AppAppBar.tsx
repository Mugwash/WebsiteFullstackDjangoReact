import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Logo from "../images/logo.png";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(10px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.6),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: "transparent", backgroundImage: "none" }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          {/* Logo */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img src={Logo} alt="Logo" style={{ height: 40 }} />
          </Box>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button color="primary" variant="text" href="mailto:jackgrimework@gmail.com">
              Email
            </Button>
            <Button color="primary" variant="text" href="https://github.com/Mugwash" target="_blank" rel="noopener noreferrer">
              GitHub
            </Button>
            <Button color="primary" variant="text" href="https://www.linkedin.com/in/jackgrime/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Button>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
        {/* Logo */}
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", bgcolor: "transparent" }}>
            <img src={Logo} alt="Logo" style={{ height: 40 }} />
          </Box>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Ensures the content is centered horizontally
          justifyContent: "flex-start", // Aligns content to the top vertically
          bgcolor: "background.default",
          paddingTop: 16, // Optional: Add padding at the top for better spacing
        }}
      >
        
          {/* Close Button */}
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: "absolute", top: 16, right: 16 }}
          >
            <CloseRoundedIcon />
          </IconButton>

          {/* Menu Items */}
          <List sx={{ width: "100%", textAlign: "center" }}>
          <ListItem>
          <Button
            color="primary"
            variant="text"
            size="small"
            sx={{ color: 'primary.main' }} // Force color consistency
            href="mailto:jackgrimework@gmail.com"
          >
            Email
          </Button>
          </ListItem>
          <ListItem>
          <Button
            color="primary"
            variant="text"
            size="small"
            sx={{ color: 'primary.main' }}
            href="https://github.com/Mugwash"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
          </ListItem>
          <ListItem>
          <Button
            color="primary"
            variant="text"
            size="small"
            sx={{ color: 'primary.main' }}
            href="https://www.linkedin.com/in/jackgrime/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Button>
          </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

