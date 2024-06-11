import { Box, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Popover, Typography, useTheme } from "@mui/material";
import { useContext, useState,useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { selectUser } from "../../Features/UserSlice";
import { AccountCircleOutlined, ExitToAppOutlined } from "@mui/icons-material";
import {useDispatch} from "react-redux";
import { logout } from "../../Features/UserSlice";
import { useNavigate } from "react-router-dom";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
        }
      }, [user, navigate]);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleAvatarClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
      <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        sx: {
          
          width: '200px', // Adjust width to make the popover more square-shaped
          padding: '10px', // Adjust padding for better spacing
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {user?.user?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {email ? email : "Unable to fetch"}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <List>
          <ListItemButton sx={{ px: 2 }}>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton sx={{ px: 2 }}>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton sx={{ px: 2 }} onClick={handleClose}>
            <ListItemIcon>
              <ExitToAppOutlined />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </List>
      </Box>
    </Popover>
    </Box>
  );
};

export default Topbar;
