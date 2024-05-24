import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { $tertiaryColour } from '../../Config';

const ReusableButton = ({
  label,
  type = 'submit',
  variant = 'contained',
  size = 'large',
  fullWidth = true,
  disabled = false,
  hoverColor,
  loading = false,
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      disabled={disabled || loading}
      sx={{
        mt: '10px',
        mr: '20px',
        borderRadius: 28,
        color: '#ffffff',
        minWidth: '170px',
        backgroundColor: $tertiaryColour,
        ...(disabled || loading ? { cursor: 'not-allowed', opacity: 0.5 } : {}),
        ...(hoverColor && { '&:hover': { backgroundColor: hoverColor } }),
        ...props,
      }}
    >
      {loading ? <CircularProgress size={25} color="info"/> : label}
    </Button>
  );
};

export default ReusableButton;
