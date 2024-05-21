import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { $onHoverColour, bgimg } from "../Config";
import { loginImg } from "../Config";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState} from "react";
import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import ReusableTextField from "./Atoms/TextField";
import ReusableButton from "./Atoms/Button";
import { signinValidation } from "./Validations/SigninValidations";
import { Formik } from "formik";
import { Form } from "formik";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';




const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderTopLeftRadius: 30, 
  borderTopRightRadius: 30, 
  borderBottomLeftRadius: 30, 
  borderBottomRightRadius: 30, 
};

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
};

const initialValues = {
  email: "",
  password :""
}



export default function Login() {


  const [remember, setRemember] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    const { email, password } = values;

    console.log({ email, password }); // Optional for debugging
  
    axios.post('https://reqres.in/api/login', {
    email,
    password
  })
    .then(response => {
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        navigate('/success')
        // Handle successful login (e.g., redirect, display success message)
        // actions.resetForm(); // Uncomment to reset the form after success
      } else {
        setOpenSnackbar(true); // Open snackbar on login failure
        console.error("Login failed:", response.data || response.statusText);
      }
    })
    .catch(error => {
      setOpenSnackbar(true); // Open snackbar on network errors or other non-200 responses
      console.error("Login error:", error.response?.data || error.message);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway"){
      return;
    }
    setOpenSnackbar(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }
  
 

  return (
    <>
    <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Auto-close after 6 seconds
        onClose={() => setOpenSnackbar(false)}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        action={
          <IconButton
           size="small"
           aria-label="close"
           color="white" // Change to "primary" or your desired color
           onClick={() => setOpenSnackbar(false)}
         >
           <ErrorOutlineIcon fontSize="medium" />
         </IconButton>

       }
        
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%',color : "white",  borderRadius : 15, backgroundColor : "#DB1212"}}>
          Login failed! Please check your credentials.
        </Alert>
      </Snackbar>

      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${loginImg})`,
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#4F6278",
                  borderTopRightRadius: 30, 
                  borderBottomRightRadius: 30, 
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={42} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ height: 80, width : 80, ml: "36px", mb: "25px", bgcolor: "#ffffff", fontSize : "6rem" }}
                      >
                    <LockOutlinedIcon style={{ fontSize: '40px' }} />
                      </Avatar>
                      <Typography component="h1" variant="h3" textAlign={{center}}>
                        Sign In
                      </Typography>
                    </Box>
                    <Box height={15} />
                    <Formik
                      initialValues={initialValues}
                      validationSchema={signinValidation}
                      onSubmit={onSubmit}
                      >
                        {({errors,touched,handleBlur,handleChange})=>(
                    <Form
                      noValidate
                      //onSubmit={handleSubmit}
                      sx={{ mt: 2 }}
                      >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "6em", mr: "6em" }}>
                        <ReusableTextField
                        error={errors.email && touched.email} 
                        label="Email" 
                        name="email" 
                        autoComplete="email" 
                        onChange={handleChange}
                        onBlur={handleBlur} 
                         // Pass touched state from formik
                        helperText ={errors.email} />
                        </Grid>
                        <Box height={17} />
                        <Grid item xs={12} sx={{ ml: "6em", mr: "6em" }}>
                        <ReusableTextField
                          error={errors.password && touched.password}
                          label="Password" 
                          name="password" 
                          autoComplete="password" 
                          onChange={handleChange}
                          onBlur={handleBlur} 
                          helperText ={errors.password} 
                        />
                        </Grid>
                        <Box height={17} />
                        <Grid item xs={12} sx={{ ml: "6em", mr: "6em" }}>
                          <Stack direction="row" spacing={2}>
                            <FormControlLabel
                              sx={{ width: "60%" }}
                              onClick={() => setRemember(!remember)}
                              control={<Checkbox checked={remember} />}
                              label="Accept terms & conditions"
                            />
                            <Typography
                              variant="body1"
                              component="span"
                              onClick={() => {
                                navigate("/forgotpassword");
                              }}
                              style={{ marginTop: "10px", cursor: "pointer" ,marginLeft: "50px"}}
                            >
                              Forgot password?
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={18} sx={{ ml: "6em", mr: "6em" }}>
                        <ReusableButton label="Sign In" hoverColor={$onHoverColour}/>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "6em", mr: "6em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Don't have an account?{" "}
                              <span
                                style={{ color: "#beb4fb", cursor: "pointer" }}
                                onClick={() => {
                                  navigate("/register");
                                }}
                              >
                                Create an Account
                              </span>
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Form>
                   )}
                    </Formik>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
