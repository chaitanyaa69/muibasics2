import React from 'react';
import { Button } from '@mui/material';
import { $tertiaryColour } from '../../Config';

const ReusableButton = ({ label, type = 'submit', variant = 'contained', size = 'large', fullWidth = true, disabled = false, hoverColor, ...props }) => {
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      disabled={disabled}
      sx={{
        mt: '10px',
        mr: '20px',
        borderRadius: 28,
        color: '#ffffff',
        minWidth: '170px',
        backgroundColor: $tertiaryColour,
        ...(disabled ? { cursor: 'not-allowed', opacity: 0.5 } : {}),
        ...(hoverColor && { '&:hover': { backgroundColor: hoverColor } }),
        ...props, 
      }}
    >
      {label}
    </Button>
  );
};

export default ReusableButton;
