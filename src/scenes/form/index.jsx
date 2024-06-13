import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../Components/dashboardPages/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Features/UserSlice';
import ReactLoading from 'react-loading';
import {tokens} from '../../theme';
import { CheckCircleOutline } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import EditIcon from '@mui/icons-material/Edit';
import { LifeLine } from 'react-loading-indicators';

const Form = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const colors=tokens(theme.palette.mode);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const user = useSelector(selectUser);
  const [loadingMessage, setLoadingMessage] = useState('Establishing secure connection...');

  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMessage('Establishing secure connection...');
        await new Promise(resolve => setTimeout(resolve, 1500)); // Wait 1 second

        setLoadingMessage('Verifying account information...');
        await new Promise(resolve => setTimeout(resolve, 1500)); // Wait 1 second

        setLoadingMessage('Retrieving your profile settings...');
        await new Promise(resolve => setTimeout(resolve, 1500)); // Wait 1 second

        const response = await axios.get('https://664af189a300e8795d43864b.mockapi.io/crud-op/1');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="85vh"
      >
        <LifeLine color={colors.greenAccent[500]} speedPlus="-4" size="medium" text="" textColor=""   />        
        <Typography variant="h3" color={colors.grey[100]} sx={{ fontWeight: "bold",mt:'30px' }}>Fetching user profile</Typography>
        <Typography variant="h4" color={colors.grey[100]} sx={{ fontWeight: "bold",mt:'6px' }}>{loadingMessage}</Typography>
      </Box>
    );
  }

  const handleFormSubmit = async (values, actions) => {
    try {
      //console.log('Submitting data:', values); // Log the data being submitted
      const response = await axios.put(`https://664af189a300e8795d43864b.mockapi.io/crud-op/1`, values);
      console.log(response.data);
      setData(response.data);
      setEditing(false);
      actions.setSubmitting(false);
      // Show Snackbar after 2 seconds
      setTimeout(() => {
        setShowSnackbar(true);
      }, 1000);
    } catch (error) {
      console.error('Error updating data:', error.response ? error.response.data : error.message);
      actions.setSubmitting(false);
    }
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required('Firstname is required'),
    lastName: yup.string().required('Lastname is required'),
    email: yup.string().email('Invalid e-mail address').required('Email is required'),
    dateOfBirth: yup.string().required('Date of Birth is required'),
    weight: yup.string().required('Weight is required'),
    height: yup.string().required('Height is required'),
    education: yup.string().required('Education is required'),
    nationality: yup.string().required('Nationality is required'),
    ethinicity: yup.string().required('Ethnicity is required'),
    gender: yup.string().required('Gender is required'),
  });

  const initialValues = {
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    dateOfBirth: data.dateOfBirth || '',
    weight: data.weight || '',
    height: data.height || '',
    education: data.education || '',
    nationality: data.nationality || '',
    ethinicity: data.ethinicity || '',
    gender: data.gender || '',
  };

  const handleEditClick = () => {
      setEditing(true);
  };

  return (
    <Box m="20px">
      <Header title="Profile" subtitle="Change your Profile" />

      <Formik
        enableReinitialize
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          submitForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
                InputProps={{
                  readOnly: !editing,
                  sx: {
                    color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    '& .MuiFilledInput-input': {
                      color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: 'span 2' }}
                InputProps={{
                  readOnly: !editing,
                  sx: {
                    color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    '& .MuiFilledInput-input': {
                      color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
                InputProps={{
                  readOnly: !editing,
                  sx: {
                    color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    '& .MuiFilledInput-input': {
                      color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfBirth}
                name="dateOfBirth"
                error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                sx={{ gridColumn: 'span 2' }}
                InputProps={{
                  readOnly: !editing,
                  sx: {
                    color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    '& .MuiFilledInput-input': {
                      color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: 'span 2' }}
                InputProps={{
                  readOnly: !editing,
                  sx: {
                    color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    '& .MuiFilledInput-input': {
                      color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Weight"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.weight}
                name="weight"
                error={!!touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
                sx={{ gridColumn: 'span 2' }}
                InputProps={{
                  readOnly: !editing,
                  sx: {
                    color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    '& .MuiFilledInput-input': {
                      color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Height"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.height}
                name="height"
                error={!!touched.height && !!errors.height}
                helperText={touched.height && errors.height}
                sx={{ gridColumn: 'span 2' }}
                InputProps={{
                  readOnly: !editing,
                  sx: {
                    color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    '& .MuiFilledInput-input': {
                      color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Education"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.education}
                name="education"
                error={!!touched.education && !!errors.education}
                helperText={touched.education && errors.education}
                sx={{ gridColumn: 'span 4' }}
                InputProps={{
                  readOnly: !editing,
                  sx: {
                    color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    '& .MuiFilledInput-input': {
                      color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nationality"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nationality}
                name="nationality"
                error={!!touched.nationality && !!errors.nationality}
                helperText={touched.nationality && errors.nationality}
                sx={{ gridColumn: 'span 2' }}
                InputProps={{
                  readOnly: !editing,
                  sx: {
                    color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    '& .MuiFilledInput-input': {
                      color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ethnicity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ethinicity}
                name="ethinicity"
                error={!!touched.ethinicity && !!errors.ethinicity}
                helperText={touched.ethinicity && errors.ethinicity}
                sx={{ gridColumn: 'span 2' }}
                InputProps={{
                  readOnly: !editing,
                  sx: {
                    color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    '& .MuiFilledInput-input': {
                      color: !editing ? 'grey.500' : 'inherit', // Set the text color to grey when read-only
                    },
                  },
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              {editing ? (
                <Button 
                    type="button"
                    color="secondary" 
                    variant="contained" 
                    disabled={isSubmitting} 
                    onClick={() => {
                      submitForm();
                      setTimeout(() => setEditing(false), 3000);
                      }
                    }>
                  {isSubmitting ? <CircularProgress size={20} /> : 'Save'}
                </Button>
              ) : (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleEditClick} // Using handleEditClick for initiating edit and circular progress
                  type="button"
                >
                  {editing ? <CircularProgress size={24} /> : 'Edit'}
                </Button>
              )}
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar
            action={
              <EditIcon sx={{ color: colors.greenAccent[500], mr: 1 }} />
            }
            open={showSnackbar}
            autoHideDuration={2000}
            onClose={() => setShowSnackbar(false)}
            message="Changes Saved"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
              "& .MuiSnackbarContent-root": {
                backgroundColor: colors.primary[400],
                color: colors.greenAccent[500],
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center'
              }
            }}
            
          />
    </Box>
  );
};
export default Form;