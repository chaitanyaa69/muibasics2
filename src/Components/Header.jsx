import React from "react";
import {
  AppBar,
  Button,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { $secondaryColour } from "../Config";

const Header = () => {
  return (
    <React.Fragment>
      <AppBar sx={{ background: $secondaryColour }}>
        <Toolbar>
          <VaccinesIcon sx={{ transform: "scale(1.5)" }} />
            <>
              <Link to="/" >
                <Button sx={{ marginLeft: "1600px",borderRadius : 90 }} variant="contained">
                  Login
                </Button>
              </Link>
              <Link to="/register" >
              <Button sx={{ marginLeft: "15px", borderRadius : 90 }} variant="contained">
                Register
              </Button>
              </Link>
            </>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;