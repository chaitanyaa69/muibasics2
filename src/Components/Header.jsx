import React from "react";
import {
  AppBar,
  Button,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser,logout, loggedinValid } from "../Features/UserSice";
import { useNavigate } from "react-router-dom";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { $secondaryColour } from "../Config";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector(loggedinValid); // Assuming a selector to get user data
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: $secondaryColour }}>
        <Toolbar>
          <VaccinesIcon sx={{ transform: "scale(1.5)" }} />
          {user ? ( // Conditionally render buttons based on user state
            <Button sx={{ marginLeft: "auto", borderRadius: 90 }} variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button sx={{ marginLeft: "auto", borderRadius: 90 }} variant="contained" onClick={() => navigate('/')}>
                Login
              </Button>
              <Button sx={{ marginLeft: "10px", borderRadius: 90 }} variant="contained" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
