import {
  Toolbar,
  IconButton,
  Typography,
  styled,
  Badge,
  Avatar,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Button,
  ListItemButton,
  Paper,
  InputBase,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MuiAppBar from "@mui/material/AppBar";
import { ReactNode, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import postData from "../../utils/AxioPost";
import { useToken } from "../../contexts/TokenContext";
import { useSnackbar } from "../../contexts/SnackbarAlertContext";
import { useAuthentication } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { TuneOutlined } from "@mui/icons-material";
import { useTheme as useCustomTheme } from "../../contexts/ThemeContext";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';

interface HeaderProps {
  open: boolean;
  drawerWidth: number;
  handleDrawerOpen: () => void;
  handleDrawerClose?: () => void;
  children?: ReactNode;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<{ open: boolean; drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.05)",
  zIndex: theme.zIndex.drawer + 1,
  [theme.breakpoints.up("md")]: {
    width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
    marginLeft: open ? `${drawerWidth}px` : 0,
  },
}));

export const Header = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
  drawerWidth,
}: HeaderProps) => {
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const { user, setUser } = useUser();
  const muiTheme = useTheme();
  const { theme, toggleTheme } = useCustomTheme();

  // Mock notifications for now since we don't have NotificationContext
  const notifications = [];
  const unreadCount = 0;

  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setNotifAnchorEl(null);
    setProfileAnchorEl(null);
  };

  const notifOpen = Boolean(notifAnchorEl);
  const profileOpen = Boolean(profileAnchorEl);
  const { token, setToken, setBearerToken } = useToken();
  const { showSnackbar } = useSnackbar();
  const { setAuthenticated } = useAuthentication();

  const handleLogout = async () => {
    try {
      const response = await postData(
        `${window.location.protocol}//api.kanban.beytech.co.tz/api/logout`,
        {},
        token,
        null,
        undefined,
        setToken,
        setBearerToken
      );
      if (!response.status) {
        return showSnackbar("Something went wrong, try again", "warning");
      }
      setAuthenticated(false);
      setUser(null);
      setBearerToken("");
    } catch (error) {
      showSnackbar("Logout failed", "error");
    }
  };

  return (
    <AppBar position="sticky" open={open} drawerWidth={drawerWidth}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <IconButton
            color="inherit"
            aria-label={open ? "close drawer" : "open drawer"}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
            }}
          >
            {!open ? <ChevronRightIcon /> : <MenuIcon />}
          </IconButton>

          {/* Search Area */}
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: "auto" },
              maxWidth: 500,
              ml: { xs: 0, sm: 2 },
              borderRadius: "25px",
              boxShadow: "none",
              overflow: "hidden",
              bgcolor: theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 30, 30, 0.9)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 4px 8px ${theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.3)"}`,
              },
            }}
          >
            <InputBase
              sx={{
                ml: 2,
                flex: 1,
                color: muiTheme.palette.text.primary,
                "& .MuiInputBase-input": {
                  "&::placeholder": {
                    color: muiTheme.palette.text.secondary,
                    opacity: 1,
                  },
                },
              }}
              placeholder="Search projects, transactions, or categories..."
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              type="submit"
              sx={{
                p: "10px",
                color: muiTheme.palette.text.secondary,
                "&:hover": {
                  background: theme === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)",
                },
              }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider
              sx={{ height: 28, m: 0.5, bgcolor: theme === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)" }}
              orientation="vertical"
            />
            <IconButton
              sx={{
                p: "10px",
                color: muiTheme.palette.text.secondary,
                "&:hover": {
                  background: theme === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)",
                },
              }}
              aria-label="advanced search"
            >
              <TuneOutlined />
            </IconButton>
          </Paper>
        </Box>

        {/* Right side - Icons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme === "light" ? (
              <DarkModeOutlinedIcon sx={{ fontSize: { xs: 20, sm: 24 }, color: muiTheme.palette.text.secondary }} />
            ) : (
              <LightModeIcon sx={{ fontSize: { xs: 20, sm: 24 }, color: muiTheme.palette.text.secondary }} />
            )}
          </IconButton>
          <IconButton color="inherit" onClick={handleNotifClick}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon
                sx={{
                  color: muiTheme.palette.text.secondary,
                  fontSize: { xs: 20, sm: 24 },
                }}
              />
            </Badge>
          </IconButton>

          <IconButton color="inherit" component={Link} to="/settings">
            <SettingsIcon
              sx={{ color: muiTheme.palette.text.secondary, fontSize: { xs: 20, sm: 24 } }}
            />
          </IconButton>

          <IconButton color="inherit" component={Link} to="/help">
            <HelpIcon
              sx={{ color: muiTheme.palette.text.secondary, fontSize: { xs: 20, sm: 24 } }}
            />
          </IconButton>

          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircleIcon
              sx={{
                color: muiTheme.palette.primary.main,
                fontSize: { xs: 20, sm: 24 },
              }}
            />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Notifications Popover */}
      <Popover
        open={notifOpen}
        anchorEl={notifAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2, width: 360 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Notifications
          </Typography>
          <Divider />
          <List>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <NotificationsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.title || "Notification"}
                    secondary={notification.message || "No message"}
                  />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ mt: 2, textAlign: "center" }}>
                No notifications
              </Typography>
            )}
          </List>

          <Button
            fullWidth
            sx={{ mt: 1, textTransform: "unset" }}
            component={Link}
            to="/notifications"
            onClick={handleClose}
          >
            View All Notifications
          </Button>
        </Box>
      </Popover>

      {/* Profile Popover */}
      <Popover
        open={profileOpen}
        anchorEl={profileAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
          },
        }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Avatar sx={{ width: 56, height: 56, mx: "auto", mb: 1, bgcolor: muiTheme.palette.primary.main }}>
              {user?.username?.[0]?.toUpperCase() || <AccountCircleIcon fontSize="large" />}
            </Avatar>
            <Typography variant="subtitle1">{user?.username || "User"}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || "user@example.com"}
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItemButton
              component={Link}
              to="/profile"
              onClick={handleClose}
            >
              <ListItemText primary="My Profile" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/settings"
              onClick={handleClose}
            >
              <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Popover>
    </AppBar>
  );
};
