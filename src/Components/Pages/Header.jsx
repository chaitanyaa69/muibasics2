import React, { useState } from "react";
import { AppBar, Button, Toolbar, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { $secondaryColour } from "../../Config";
import { tokens } from "../../theme";


const Header = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  // If the user is logged in, do not render the AppBar
  if (user?.user) {
    return null;
  }

  return (
    <React.Fragment>
      <AppBar sx={{ background: $secondaryColour }}>
        <Toolbar>
          <VaccinesIcon sx={{ transform: "scale(1.5)" }} />
          {!user?.user ? (
            <>
              <Button sx={{ ml: "auto", borderRadius: 90 }} variant="contained" color="secondary" onClick={() => navigate('/')}>
                Login
              </Button>
              <Button sx={{ ml: "10px", borderRadius: 90 }} variant="contained" color="secondary" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          ) : (
            <>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
