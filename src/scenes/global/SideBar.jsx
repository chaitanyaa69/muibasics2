import { useState,useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useSelector,useDispatch } from "react-redux";
import { selectUser,logout } from "../../Features/UserSlice";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from "@mui/material/Snackbar";
import defaultPfp from '../../Assets/img/userpfp.png'

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate  = useNavigate();
  const [selected, setSelected] = useState("Dashboard");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userPfp, setUserPfp] = useState(localStorage.getItem('userPfp') || defaultPfp);
  const [pfploading, setpfpLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const storedPfp = localStorage.getItem('userPfp');
    if (storedPfp) {
      setUserPfp(storedPfp);
    }
  }, []);

  const handlePfpChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setpfpLoading(true);
      const reader = new FileReader();
      reader.onload = () => {
        const newPfp = reader.result;
        
        // Simulate a delay of 2 seconds
        setTimeout(() => {
          setUserPfp(newPfp);
          localStorage.setItem('userPfp', newPfp);
          setpfpLoading(false);
          setShowSnackbar(true);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('userPfp');
      dispatch(logout());
      navigate('/');
      setLoading(false);
    }, 2000);
  };

 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
        }
      }, [user, navigate]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
               
                <Typography variant="h3" color={colors.grey[100]}>
                  Trustr
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center" position="relative">
                  {pfploading ? (
                    <CircularProgress sx={{
                      position: "absolute",
                      width: "100px",
                      height: "100px",
                    }} />
                  ) : (
                    <img
                        alt="profile-user"
                        src={userPfp}
                        style={{ 
                          width: "100px", 
                          height: "100px", 
                          borderRadius: "50%",
                          objectFit: "cover"
                      }}
                    />
                  )}
                  
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 90,
                      backgroundColor: colors.blueAccent[600],
                      borderRadius: "50%",
                      padding: "5px",
                      '&:hover': {
                        backgroundColor: colors.primary[300],
                      }
                    }}
                    component="label"
                    disabled={pfploading}
                  >
                    <EditIcon sx={{ color: colors.grey[100], fontSize:15 }} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePfpChange}
                      style={{ display: "none" }}
                    />
                  </IconButton>
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {user?.user?.name}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {email}
                  </Typography>
                </Box>
                  <Snackbar
                      open={showSnackbar}
                      autoHideDuration={2000}
                      onClose={() => setShowSnackbar(false)}
                      message="Profile picture updated"
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      sx={{
                        "& .MuiSnackbarContent-root": {
                          backgroundColor: colors.primary[400],
                          color: colors.greenAccent[500],
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: '20px'
                        }
                      }}
                      action={
                        <EditIcon sx={{ color: colors.greenAccent[500], mr: 1 }} />
                      }
                    />
              </Box>
    )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 23px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Account"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Appointments"
              to="/appointments"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected} 
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Typography
              variant="h6"
              sx={{ m: "15px 15px 5px 7px" }}
              textAlign='center'
              onClick={handleLogout}
            >
              {loading ? (
                <CircularProgress size={18} sx={{ color: colors.redAccent[400] }} />
              ) : (
                <Button sx={{ color: colors.redAccent[400], fontWeight: "bold" }}>Logout</Button>
              )}
            </Typography>
            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;