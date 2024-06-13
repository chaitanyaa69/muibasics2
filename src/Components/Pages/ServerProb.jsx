import { Box, Typography, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const ServerProb = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRetry = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: '#ff5722', mb: 2 }} />
      <Typography variant="h3" sx={{ fontSize: '40px', mb: 1 }}>
        Server Error
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '20px', mb: 3, maxWidth: 600 }}>
        We're sorry, but something went wrong on our end. Please try again later or contact support if the problem persists.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleRetry}
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? 'Retrying...' : 'Retry'}
      </Button>
    </Box>
  );
};

export default ServerProb;
