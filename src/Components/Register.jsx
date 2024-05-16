import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { $onHoverColour, $primaryColour, registerImg } from "../Config";
import { bgimg } from "../Config";
import ReusableButton from "./Atoms/Button";
import ReusableTextField from "./Atoms/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import {Form, Formik, useFormik} from "formik"
import * as Yup from "yup"
import { registerValidation } from "./Validations/RegisterValidation";

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
  left: "25%",
};
const initialValues = {
  email: "",
  password :"",
  confirmpassword :""
}

export default function Register() {

  

  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const onSubmit =(values,actions) => {
    console.log('Submitted values:', values);
    actions.resetForm()
  }

  const handleSubmit = async (event) => {
    setOpen(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway"){
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
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
                  backgroundImage: `url(${registerImg})`,
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
                  backgroundColor: $primaryColour,
                  borderTopRightRadius: 30, 
                  borderBottomRightRadius: 30
                }}>
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={42}/>
                    <Box sx={center}>
                      <Avatar
                        sx={{ height :80, width : 80, ml: "114px", mb: "25px", bgcolor: "#ffffff",justifyContent : "center" }}
                      >
                        <LockOutlinedIcon style={{fontSize : '40px'}}/>
                      </Avatar>
                      <Typography component="h1" variant="h3">
                        Create Account
                      </Typography>
                    </Box>
                    <Box height={15} />
                    <Formik
                      initialValues={initialValues}
                      validationSchema={registerValidation}
                      onSubmit={onSubmit}
                      >
                        {({errors,touched,handleBlur,handleChange})=>(
                    <Form
                      noValidate
                      //onSubmit={formik.handleSubmit}
                      sx={{ mt: 2 }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "6em", mr: "6em" }}>
                            <ReusableTextField
                             label="Username" 
                             name="email" 
                             autoComplete="email" 
                             error={errors.email && touched.email} 
                             helperText ={errors.email} 
                             onChange={handleChange}
                             onBlur={handleBlur} />
                        </Grid>
                        <Box height={10} />
                        <Grid item xs={12} sx={{ ml: "6em", mr: "6em" }}>
                            <ReusableTextField
                             error={errors.password && touched.password} 
                             label="Password" 
                             name="password" 
                             type="password" 
                             autoComplete="new-password" 
                             helperText ={errors.password} 
                             onChange={handleChange}
                             onBlur={handleBlur}/>
                        </Grid>
                        <Box height={10} />
                        <Grid item xs={12} sx={{ ml: "6em", mr: "6em" }}>
                            <ReusableTextField 
                             error={errors.confirmpassword && touched.confirmpassword}
                             label="Confirm Password" 
                             name="confirmpassword" 
                             type="password" 
                             autoComplete="new-password"
                             helperText={errors.confirmpassword} 
                             onChange={handleChange}
                             onBlur={handleBlur}/>
                        </Grid>
                        <Box height={10} />
                        <Grid item xs={12} sx={{ ml: "6em", mr: "6em" }}>
                            <ReusableButton label="Register" hoverColor={$onHoverColour}/>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "6em", mr: "6em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Already have an Account?{" "}
                              <span
                                style={{ color: "#beb4fb", cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/");
                                  }}
                              >
                                Sign In
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
