import React from 'react';
import { TextField } from '@mui/material';
import { Field } from 'formik';

const ReusableTextField = ({ label, name, autoComplete, fullWidth = true, ...props }) => {
  return (
    <Field
      name={name}
    >
      {({ field, form, meta }) => (
        <TextField
          {...field} // Spread Formik field props (value, error, etc.)
          label={label}
          fullWidth={fullWidth}
          autoComplete={autoComplete}
          {...props} // Spread any additional props passed to the component
          error={meta.touched && !!meta.error} // Set error prop using boolean check
        />
      )}
    </Field>
  );
};

export default ReusableTextField;
;





/*import React from 'react';
import { TextField } from '@mui/material';

const ReusableTextField = ({ label, name, autoComplete,fullWidth=true, ...props }) => {
  return (
    <TextField
      required
      fullWidth = {fullWidth}
      id={name}
      label={label}
      name={name}
      autoComplete={autoComplete}
      {...props} // Spread any additional props passed to the component
    />
  );
};
export default ReusableTextField;*/
