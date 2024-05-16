import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { $secondaryColour } from "../Config";

const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar sx={{ background: $secondaryColour }}>
        <Toolbar>
          <VaccinesIcon sx={{ transform: "scale(1.5)" }} />
            <>
              <Link to="/Login" >
                <Button sx={{ marginLeft: "1600px",borderRadius : 90 }} variant="contained">
                  Login
                </Button>
              </Link>
              <Link to="/Register" >
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